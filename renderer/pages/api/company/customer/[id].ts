// pages/api/company/customer/[id].ts

import prisma from '../../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Pastikan ID tersedia
  if (!id) {
    return res.status(400).json({ success: false, message: 'Customer ID is required.' });
  }

  const customerId = String(id);

  // Metode GET: Mendapatkan satu customer
  if (req.method === 'GET') {
    try {
      const customer = await prisma.customer.findUnique({
        where: { id: customerId },
      });

      if (!customer) {
        return res.status(404).json({ success: false, message: `Customer with ID ${customerId} not found.` });
      }
      return res.status(200).json({ success: true, data: customer, message: `Customer with ID ${customerId} fetched successfully.` });

    } catch (error) {
      console.error('Error fetching customer:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error. Failed to fetch customer.' });
    }
  }

  // Metode PUT: Memperbarui customer
  else if (req.method === 'PUT') {
    try {
      const updatedCustomer = await prisma.customer.update({
        where: { id: customerId },
        data: req.body,
      });
      return res.status(200).json({ success: true, data: updatedCustomer, message: `Customer with ID ${customerId} updated successfully.` });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ success: false, message: `Customer with ID ${customerId} not found.` });
      }
      if (error.code === 'P2002') {
        return res.status(409).json({ success: false, message: `A customer with the provided ${error.meta.target.join(', ')} already exists.` });
      }
      console.error('Error updating customer:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error. Failed to update customer.' });
    }
  }

  // Metode DELETE: Menghapus customer
  else if (req.method === 'DELETE') {
    try {
      const deletedCustomer = await prisma.customer.delete({
        where: { id: customerId },
      });
      return res.status(200).json({ success: true, data: deletedCustomer, message: `Customer with ID ${customerId} deleted successfully.` });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ success: false, message: `Customer with ID ${customerId} not found.` });
      }
      console.error('Error deleting customer:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error. Failed to delete customer.' });
    }
  }

  else {
    // Metode tidak diizinkan
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
