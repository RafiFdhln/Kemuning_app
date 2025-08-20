// pages/api/company/item/index.ts

import prisma from '../../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

// Enum untuk ItemType
enum ItemType {
  GOODS = 'GOODS',
  SERVICE = 'SERVICE',
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Metode GET: Mengambil semua item
  if (req.method === 'GET') {
    try {
      const items = await prisma.item.findMany();
      return res.status(200).json({ success: true, data: items, message: 'All items fetched successfully.' });
    } catch (error) {
      console.error('Error fetching all items:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error. Failed to fetch items.' });
    }
  }

  // Metode POST: Membuat item baru
  else if (req.method === 'POST') {
    try {
      const { name, type, price } = req.body;

      // Validasi input
      if (!name || !type || !price) {
        return res.status(400).json({ success: false, message: 'Name, type, and price are required fields.' });
      }

      // Validasi tipe item
      if (!Object.values(ItemType).includes(type)) {
        return res.status(400).json({ success: false, message: 'Invalid item type. Must be GOODS or SERVICE.' });
      }

      const parsedPrice = parseFloat(price);
      if (isNaN(parsedPrice)) {
        return res.status(400).json({ success: false, message: 'Price must be a valid number.' });
      }

      const newItem = await prisma.item.create({
        data: {
          name,
          type: type as ItemType,
          price: parsedPrice,
        },
      });
      return res.status(201).json({ success: true, data: newItem, message: 'Item created successfully.' });

    } catch (error) {
      console.error('Error creating item:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error. Failed to create item.' });
    }
  }

  // Metode tidak diizinkan
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
