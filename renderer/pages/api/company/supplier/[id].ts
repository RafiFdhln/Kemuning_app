// pages/api/company/supplier/[id].ts

import prisma from '../../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Pastikan ID tersedia
  if (!id) {
    return res.status(400).json({ success: false, message: 'Supplier ID is required.' });
  }

  const supplierId = String(id);

  if (req.method === 'GET') {
    try {
      const supplier = await prisma.supplier.findUnique({
        where: { id: supplierId },
      });

      if (!supplier) {
        return res.status(404).json({ success: false, message: `Supplier with ID ${supplierId} not found.` });
      }
      return res.status(200).json({ success: true, data: supplier, message: `Supplier with ID ${supplierId} fetched successfully.` });

    } catch (error) {
      console.error('Error fetching supplier:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error. Failed to fetch supplier.' });
    }
  }

  else if (req.method === 'PUT') {
    try {
      const updatedSupplier = await prisma.supplier.update({
        where: { id: supplierId },
        data: req.body,
      });
      return res.status(200).json({ success: true, data: updatedSupplier, message: `Supplier with ID ${supplierId} updated successfully.` });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ success: false, message: `Supplier with ID ${supplierId} not found.` });
      }
      if (error.code === 'P2002') {
        return res.status(409).json({ success: false, message: `A supplier with the provided ${error.meta.target.join(', ')} already exists.` });
      }
      console.error('Error updating supplier:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error. Failed to update supplier.' });
    }
  }

  else if (req.method === 'DELETE') {
    try {
      const deletedSupplier = await prisma.supplier.delete({
        where: { id: supplierId },
      });
      return res.status(200).json({ success: true, data: deletedSupplier, message: `Supplier with ID ${supplierId} deleted successfully.` });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ success: false, message: `Supplier with ID ${supplierId} not found.` });
      }
      console.error('Error deleting supplier:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error. Failed to delete supplier.' });
    }
  }

  else {
    // Metode tidak diizinkan
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
