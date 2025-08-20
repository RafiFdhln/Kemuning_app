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
      const { requestNumber, requestDate, customerId, status, remarks, noQuotation, items } = req.body;

      if (!customerId || !requestDate) {
        return res.status(400).json({ success: false, message: "customerId and requestDate are required." });
      }

      const newInquiry = await prisma.inquiry.create({
        data: {
          requestNumber,
          requestDate: new Date(requestDate),
          customerId,
          status: status || "PENDING",
          remarks,
          noQuotation: noQuotation || false,
          items: items?.length
            ? {
                create: items.map((i: any) => ({
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
        include: { customer: true, items: true },
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
