import prisma from "../../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const quotations = await prisma.quotation.findMany({
        include: {
          customer: true,
          inquiry: true,
          items: true,
        },
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json({ success: true, data: quotations, message: "All quotations fetched successfully." });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
  if (req.method === "POST") {
    try {
      const { inquiryId, remarks, items } = req.body;
      if (!inquiryId) {
        return res.status(400).json({ success: false, message: "inquiryId is required" });
      }
      const inquiry = await prisma.inquiry.findUnique({
        where: { id: inquiryId },
        include: { items: true, customer: true },
      });
      if (!inquiry) {
        return res.status(404).json({ success: false, message: "Inquiry not found" });
      }
      const now = new Date();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const yy = String(now.getFullYear() % 100).padStart(2, '0');
      const prefix = `QUO-${mm}${yy}`;
      const last = await prisma.quotation.findMany({
        where: { quotationNumber: { startsWith: prefix } },
        select: { quotationNumber: true },
        orderBy: { quotationNumber: 'desc' },
        take: 1,
      });
      const lastSeq = last.length && last[0].quotationNumber ? parseInt(String(last[0].quotationNumber).slice(-3), 10) : 0;
      const nextSeq = String((isNaN(lastSeq) ? 0 : lastSeq) + 1).padStart(3, '0');
      const quotationNumber = `${prefix}${nextSeq}`;
      const useItems = Array.isArray(items) && items.length > 0
        ? items.map((it: any) => ({
            inquiryItemId: it.inquiryItemId || null,
            name: it.name,
            qty: Number(it.qty) || 0,
            price: Number(it.price) || 0,
            totalPrice: Number(it.totalPrice) || 0,
            remarks: it.remarks || null,
          }))
        : inquiry.items.map(item => ({
            inquiryItemId: item.id,
            name: item.name,
            qty: item.qty,
            price: item.sellingPrice || 0,
            totalPrice: item.totalPrice || 0,
            remarks: item.notes || null,
          }));

      const quotation = await prisma.quotation.create({
        data: {
          quotationNumber,
          inquiryId: inquiry.id,
          customerId: inquiry.customerId,
          status: "DRAFT",
          remarks: remarks || inquiry.remarks,
          items: {
            create: useItems
          }
        },
        include: { items: true }
      });
      await prisma.inquiry.update({ where: { id: inquiry.id }, data: { status: "QUOTED" } });
      return res.status(201).json({ success: true, data: quotation, message: "Quotation created successfully" });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
