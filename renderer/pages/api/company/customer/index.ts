// pages/api/companycustomer/index.ts

import prisma from '../../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Metode GET: Mengambil semua customer
  if (req.method === 'GET') {
    try {
      const customers = await prisma.customer.findMany();
      return res.status(200).json({ success: true, data: customers, message: 'All customers fetched successfully.' });
    } catch (error) {
      console.error('Error fetching all customers:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error. Failed to fetch customers.' });
    }
  }

  // Metode POST: Membuat customer baru
  else if (req.method === 'POST') {
    try {
      const { code, name, npwp, address, remarks } = req.body;

      // Validasi input
      if (!code || !name) {
        return res.status(400).json({ success: false, message: 'Code and name are required fields.' });
      }

      const newCustomer = await prisma.customer.create({
        data: { code, name, npwp, address, remarks },
      });
      return res.status(201).json({ success: true, data: newCustomer, message: 'Customer created successfully.' });

    } catch (error) {
      if (error.code === 'P2002') {
        return res.status(409).json({ success: false, message: `A customer with the provided ${error.meta.target.join(', ')} already exists.` });
      }
      console.error('Error creating customer:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error. Failed to create customer.' });
    }
  }

  // Metode tidak diizinkan
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
