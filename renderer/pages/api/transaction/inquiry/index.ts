import prisma from "../../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const inquiries = await prisma.inquiry.findMany({
        include: {
          customer: true,
          items: { include: { supplier: true, item: true } },
        },
      });
      return res.status(200).json({
        success: true,
        data: inquiries,
        message: "All inquiries fetched successfully.",
      });
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }

  if (req.method === "POST") {
    try {
      const { requestNumber, requestDate, customerId, status, remarks, noQuotation, items, category } = req.body;

      if (!customerId || !requestDate) {
        return res.status(400).json({ success: false, message: "customerId and requestDate are required." });
      }

      // Generate request number if missing/empty
      let finalRequestNumber = requestNumber && String(requestNumber).trim() !== "" ? String(requestNumber).trim() : undefined;
      const jsDate = new Date(requestDate);
      if (!finalRequestNumber) {
        const mm = String(jsDate.getMonth() + 1).padStart(2, '0');
        const yy = String(jsDate.getFullYear() % 100).padStart(2, '0');
        const prefix = `INQ-${mm}${yy}`;
        const last = await prisma.inquiry.findMany({
          where: { requestNumber: { startsWith: prefix } },
          select: { requestNumber: true },
          orderBy: { requestNumber: 'desc' },
          take: 1,
        });
        const lastSeq = last.length && last[0].requestNumber
          ? parseInt(String(last[0].requestNumber).slice(-3), 10)
          : 0;
        const nextSeq = String((isNaN(lastSeq) ? 0 : lastSeq) + 1).padStart(3, '0');
        finalRequestNumber = `${prefix}${nextSeq}`;
      }

      const filteredItems = Array.isArray(items)
        ? items.filter((i: any) => i && typeof i.name === 'string' && i.name.trim() !== '' && (typeof i.qty === 'number' ? i.qty > 0 : true))
        : [];

      const newInquiry = await prisma.inquiry.create({
        data: {
          requestNumber: finalRequestNumber,
          requestDate: jsDate,
          customerId,
          status: status || "PENDING",
          remarks,
          category: category || "BARANG",
          items: filteredItems?.length
            ? {
                create: filteredItems.map((i: any) => ({
                  supplierId: i.supplierId || null,
                  itemId: i.itemId || null,
                  name: i.name,
                  brand: i.brand,
                  status: i.status,
                  qty: i.qty,
                  unit: i.unit,
                  hpp: i.hpp ? parseFloat(i.hpp) : 0,
                  markupPercent: i.markupPercent ? parseFloat(i.markupPercent) : null,
                  priceAfterUp: i.priceAfterUp ? parseFloat(i.priceAfterUp) : null,
                  sellingPrice: i.sellingPrice ? parseFloat(i.sellingPrice) : null,
                  totalPrice: i.totalPrice ? parseFloat(i.totalPrice) : null,
                  poPrice: i.poPrice ? parseFloat(i.poPrice) : null,
                  notes: i.notes,
                  deliveryTime: i.deliveryTime ? new Date(i.deliveryTime) : null,
                })),
              }
            : undefined,
        },
        include: { customer: true, items: { include: { supplier: true, item: true } } },
      });

      return res.status(201).json({ success: true, data: newInquiry, message: "Transaction created successfully." });
    } catch (error: any) {
      console.error("Error creating transaction:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
