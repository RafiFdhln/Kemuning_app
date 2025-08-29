import prisma from "../../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ success: false, message: "Quotation ID is required." });
  }
  const quotationId = String(id);
  if (req.method === "GET") {
    try {
      const quotation = await prisma.quotation.findUnique({
        where: { id: quotationId },
        include: {
          customer: true,
          inquiry: true,
          items: true,
        },
      });
      if (!quotation) {
        return res.status(404).json({ success: false, message: `Quotation with ID ${quotationId} not found.` });
      }
      return res.status(200).json({ success: true, data: quotation, message: `Quotation with ID ${quotationId} fetched successfully.` });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Internal Server Error. Failed to fetch Quotation.' });
    }
  } else if (req.method === "PUT") {
    try {
      const updatedQuotation = await prisma.quotation.update({
        where: { id: quotationId },
        data: req.body,
      });
      return res.status(200).json({ success: true, data: updatedQuotation, message: `Quotation with ID ${quotationId} updated successfully.` });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ success: false, message: `Quotation with ID ${quotationId} not found.` });
      }
      return res.status(500).json({ success: false, message: 'Internal Server Error. Failed to update Quotation.' });
    }
  } else if (req.method === "DELETE") {
    try {
      const deletedQuotation = await prisma.quotation.delete({
        where: { id: quotationId },
      });
      return res.status(200).json({ success: true, data: deletedQuotation, message: `Quotation with ID ${quotationId} deleted successfully.` });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ success: false, message: `Quotation with ID ${quotationId} not found.` });
      }
      return res.status(500).json({ success: false, message: 'Internal Server Error. Failed to delete Quotation.' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
