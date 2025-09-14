import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  try {
    const quotations = await prisma.quotation.findMany({
      include: {
        customer: true,
        inquiry: true,
        items: { include: { inquiryItem: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    // Flatten per item row to feed the table
    const rows = quotations.flatMap((q) =>
      (q.items || []).map((qi) => {
        const ii: any = qi.inquiryItem || {};
        return {
          quotationId: q.id,
          quotationNumber: q.quotationNumber,
          quotationDate: q.createdAt,
          status: q.status,

          category: q.inquiry?.category || null,
          customer: q.customer || null,

          itemName: qi.name || ii.name || null,
          unit: ii.unit || null,
          poQty: ii.qty ?? null,
          deliveredQty: null,

          poNumber: null,
          poDate: null,
          poReceivedDate: null,
          requestedDeliveryDate: ii.deliveryTime || null,

          customerDoNumber: null,
          tempDoNumber: null,
          namePlateKlt: null,

          hppPerUnit: ii.hpp ?? null,
          quotationPricePerUnit: ii.sellingPrice ?? null,
          poPricePerUnit: ii.poPrice ?? null,

          doDate: null,
          doNumber: null,
          invoiceDate: null,
          invoiceNumber: null,
          totalInvoice: null,
          dppPpn: null,
          poBalance: null,
          invoiceRemarks: null,
        };
      })
    );

    return res.status(200).json({ success: true, data: rows });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}


