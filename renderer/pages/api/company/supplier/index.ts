// pages/api/company/supplier/index.ts

import prisma from '../../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Hanya tangani metode yang diizinkan
  if (req.method === 'POST') {
    try {
      const { code, name, npwp, address, remarks } = req.body;

      // Input Validation
      if (!code || !name) {
        return res.status(400).json({ success: false, message: 'Code and name are required fields.' });
      }

      const newSupplier = await prisma.supplier.create({
        data: { code, name, npwp, address, remarks },
      });
      return res.status(201).json({ success: true, data: newSupplier, message: 'Supplier created successfully.' });

    } catch (error) {
      if (error.code === 'P2002') {
        return res.status(409).json({ success: false, message: `A supplier with the provided ${error.meta.target.join(', ')} already exists.` });
      }
      console.error('Error creating supplier:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error. Failed to create supplier.' });
    }

  } else if (req.method === 'GET') {
    try {
      const suppliers = await prisma.supplier.findMany();
      return res.status(200).json({ success: true, data: suppliers, message: 'Suppliers fetched successfully.' });
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error. Failed to fetch suppliers.' });
    }
  }

  // Metode tidak diizinkan
  res.setHeader('Allow', ['POST', 'GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
