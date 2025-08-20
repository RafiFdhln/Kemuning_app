// pages/api/company/item/[id].ts

import prisma from '../../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

// Enum untuk ItemType
enum ItemType {
  GOODS = 'GOODS',
  SERVICE = 'SERVICE',
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Pastikan ID tersedia
  if (!id) {
    return res.status(400).json({ success: false, message: 'Item ID is required.' });
  }

  const itemId = String(id);

  // Metode GET: Mendapatkan satu item
  if (req.method === 'GET') {
    try {
      const item = await prisma.item.findUnique({
        where: { id: itemId },
      });

      if (!item) {
        return res.status(404).json({ success: false, message: `Item with ID ${itemId} not found.` });
      }
      return res.status(200).json({ success: true, data: item, message: `Item with ID ${itemId} fetched successfully.` });

    } catch (error) {
      console.error('Error fetching item:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error. Failed to fetch item.' });
    }
  }

  // Metode PUT: Memperbarui item
  else if (req.method === 'PUT') {
    try {
      const { type, price, ...otherData } = req.body;

      if (type && !Object.values(ItemType).includes(type)) {
        return res.status(400).json({ success: false, message: 'Invalid item type. Must be GOODS or SERVICE.' });
      }

      const updateData: Record<string, any> = otherData;
      if (price) {
        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice)) {
          return res.status(400).json({ success: false, message: 'Price must be a valid number.' });
        }
        updateData.price = parsedPrice;
      }
      if (type) {
        updateData.type = type;
      }

      const updatedItem = await prisma.item.update({
        where: { id: itemId },
        data: updateData,
      });

      return res.status(200).json({ success: true, data: updatedItem, message: `Item with ID ${itemId} updated successfully.` });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ success: false, message: `Item with ID ${itemId} not found.` });
      }
      console.error('Error updating item:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error. Failed to update item.' });
    }
  }

  // Metode DELETE: Menghapus item
  else if (req.method === 'DELETE') {
    try {
      const deletedItem = await prisma.item.delete({
        where: { id: itemId },
      });

      return res.status(200).json({ success: true, data: deletedItem, message: `Item with ID ${itemId} deleted successfully.` });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ success: false, message: `Item with ID ${itemId} not found.` });
      }
      console.error('Error deleting item:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error. Failed to delete item.' });
    }
  }

  // Metode tidak diizinkan
  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
