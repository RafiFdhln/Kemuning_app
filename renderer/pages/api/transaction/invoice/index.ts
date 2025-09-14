import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { quotationId, quotationNumber, customerId, customerName, totalAmount, status = 'DRAFT' } = req.body;

      if (!quotationId || !quotationNumber || !customerId) {
        return res.status(400).json({ 
          success: false, 
          message: "quotationId, quotationNumber, and customerId are required" 
        });
      }

      // For now, we'll just log the invoice creation
      // In a real implementation, you would create proper invoice records in the database
      console.log('Creating invoice:', {
        quotationId,
        quotationNumber,
        customerId,
        customerName,
        totalAmount,
        status,
        createdAt: new Date().toISOString()
      });

      // Simulate successful creation
      const invoiceData = {
        id: `invoice_${Date.now()}`,
        quotationId,
        quotationNumber,
        customerId,
        customerName,
        totalAmount: parseFloat(totalAmount) || 0,
        status,
        createdAt: new Date().toISOString()
      };

      return res.status(201).json({ 
        success: true, 
        data: invoiceData, 
        message: "Invoice created successfully" 
      });

    } catch (error: any) {
      console.error('Error creating invoice:', error);
      return res.status(500).json({ 
        success: false, 
        message: error.message || "Internal Server Error" 
      });
    }
  }

  res.setHeader("Allow", ["POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
