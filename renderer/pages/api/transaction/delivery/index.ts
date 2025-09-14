import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { quotationId, quotationNumber, customerId, customerName, items, status = 'DRAFT' } = req.body;

      if (!quotationId || !quotationNumber || !customerId) {
        return res.status(400).json({ 
          success: false, 
          message: "quotationId, quotationNumber, and customerId are required" 
        });
      }

      // For now, we'll just log the delivery note creation
      // In a real implementation, you would create proper delivery note records in the database
      console.log('Creating delivery note:', {
        quotationId,
        quotationNumber,
        customerId,
        customerName,
        items,
        status,
        createdAt: new Date().toISOString()
      });

      // Simulate successful creation
      const deliveryData = {
        id: `delivery_${Date.now()}`,
        quotationId,
        quotationNumber,
        customerId,
        customerName,
        items: items || [],
        status,
        createdAt: new Date().toISOString()
      };

      return res.status(201).json({ 
        success: true, 
        data: deliveryData, 
        message: "Delivery note created successfully" 
      });

    } catch (error: any) {
      console.error('Error creating delivery note:', error);
      return res.status(500).json({ 
        success: false, 
        message: error.message || "Internal Server Error" 
      });
    }
  }

  res.setHeader("Allow", ["POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
