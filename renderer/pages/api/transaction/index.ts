// pages/api/transaction/index.ts

import prisma from '../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Metode GET: Mengambil semua transaksi
  if (req.method === 'GET') {
    try {
      const transactions = await prisma.transaction.findMany();
      return res.status(200).json({ success: true, data: transactions, message: 'All transactions fetched successfully.' });
    } catch (error) {
      console.error('Error fetching all transactions:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error. Failed to fetch transactions.' });
    }
  }

  // Metode POST: Membuat transaksi baru
  else if (req.method === 'POST') {
    try {
      const { period_id, datetime, debit_account_id, debit_amount, credit_account_id, credit_amount, remarks, is_adjustment } = req.body;

      // Validasi input
      if (!period_id || !debit_account_id || !debit_amount || !credit_account_id || !credit_amount) {
        return res.status(400).json({ success: false, message: 'period_id, debit_account_id, debit_amount, credit_account_id, and credit_amount are required.' });
      }

      const newTransaction = await prisma.transaction.create({
        data: {
          period_id,
          datetime: datetime ? new Date(datetime) : new Date(),
          debit_account_id,
          debit_amount: parseFloat(debit_amount),
          credit_account_id,
          credit_amount: parseFloat(credit_amount),
          remarks,
          is_adjustment: is_adjustment || false,
        },
      });
      return res.status(201).json({ success: true, data: newTransaction, message: 'Transaction created successfully.' });

    } catch (error) {
      console.error('Error creating transaction:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error. Failed to create transaction.' });
    }
  }

  // Metode tidak diizinkan
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
