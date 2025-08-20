// pages/api/transaction/[id].ts

import prisma from '../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Pastikan ID tersedia
  if (!id) {
    return res.status(400).json({ success: false, message: 'Transaction ID is required.' });
  }

  const transactionId = String(id);

  // Metode GET: Mendapatkan satu transaksi
  if (req.method === 'GET') {
    try {
      const transaction = await prisma.transaction.findUnique({
        where: { id: transactionId },
      });

      if (!transaction) {
        return res.status(404).json({ success: false, message: `Transaction with ID ${transactionId} not found.` });
      }
      return res.status(200).json({ success: true, data: transaction, message: `Transaction with ID ${transactionId} fetched successfully.` });

    } catch (error) {
      console.error('Error fetching transaction:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error. Failed to fetch transaction.' });
    }
  }

  // Metode PUT: Memperbarui transaksi
  else if (req.method === 'PUT') {
    try {
      const updatedTransaction = await prisma.transaction.update({
        where: { id: transactionId },
        data: req.body,
      });
      return res.status(200).json({ success: true, data: updatedTransaction, message: `Transaction with ID ${transactionId} updated successfully.` });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ success: false, message: `Transaction with ID ${transactionId} not found.` });
      }
      if (error.code === 'P2002') {
         return res.status(409).json({ success: false, message: `A transaction with the provided ${error.meta.target.join(', ')} already exists.` });
      }
      console.error('Error updating transaction:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error. Failed to update transaction.' });
    }
  }

  // Metode DELETE: Menghapus transaksi
  else if (req.method === 'DELETE') {
    try {
      const deletedTransaction = await prisma.transaction.delete({
        where: { id: transactionId },
      });
      return res.status(200).json({ success: true, data: deletedTransaction, message: `Transaction with ID ${transactionId} deleted successfully.` });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ success: false, message: `Transaction with ID ${transactionId} not found.` });
      }
      console.error('Error deleting transaction:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error. Failed to delete transaction.' });
    }
  }

  else {
    // Metode tidak diizinkan
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
