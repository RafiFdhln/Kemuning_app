import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { quotationId, quotationNumber, poNumber, customerId, customerName, items, status } = req.body;

      console.log('PO API - Received data:', {
        quotationId,
        quotationNumber,
        poNumber,
        customerId,
        customerName,
        items,
        status
      });

      // Validate required fields
      if (!quotationId || !poNumber || !customerId || !items || items.length === 0) {
        console.log('PO API - Validation failed:', {
          quotationId: !!quotationId,
          poNumber: !!poNumber,
          customerId: !!customerId,
          items: items?.length
        });
        return res.status(400).json({ 
          success: false, 
          message: 'Missing required fields: quotationId, poNumber, customerId, and items are required' 
        });
      }

      // Check if PO number already exists
      const existingPo = await prisma.purchaseOrder.findUnique({
        where: { poNumber }
      });

      if (existingPo) {
        return res.status(400).json({ 
          success: false, 
          message: 'PO number already exists' 
        });
      }

      // Create Purchase Order
      const purchaseOrder = await prisma.purchaseOrder.create({
        data: {
          poNumber,
          quotationId,
          quotationNumber,
          customerId,
          customerName,
          status: status || 'DRAFT',
          items: {
            create: items.map((item: any) => ({
              name: item.name,
              qty: item.qty,
              unit: item.unit,
              poPrice: item.poPrice,
              totalPoPrice: item.totalPoPrice,
              remarks: item.remarks || ''
            }))
          }
        },
        include: {
          items: true,
          customer: true,
          quotation: true
        }
      });

      res.status(201).json({ 
        success: true, 
        data: purchaseOrder,
        message: 'Purchase Order created successfully' 
      });

    } catch (error: any) {
      console.error('Error creating PO:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to create Purchase Order',
        error: error.message 
      });
    }
  } else if (req.method === 'GET') {
    try {
      const purchaseOrders = await prisma.purchaseOrder.findMany({
        include: {
          items: true,
          customer: true,
          quotation: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      res.status(200).json({ 
        success: true, 
        data: purchaseOrders 
      });

    } catch (error: any) {
      console.error('Error fetching POs:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch Purchase Orders',
        error: error.message 
      });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ 
      success: false, 
      message: `Method ${req.method} not allowed` 
    });
  }
}