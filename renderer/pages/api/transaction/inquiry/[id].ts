  // pages/api/Inquiry/[id].ts


  import prisma from '../../../../../lib/prisma';
  import { NextApiRequest, NextApiResponse } from 'next';

  export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    // Pastikan ID tersedia
    if (!id) {
      return res.status(400).json({ success: false, message: 'Inquiry ID is required.' });
    }

    const InquiryId = String(id);

    // Metode GET: Mendapatkan satu transaksi
    if (req.method === 'GET') {
      try {
        const inquiry = await prisma.inquiry.findUnique({
          where: { id: InquiryId },
        });

        if (!inquiry) {
          return res.status(404).json({ success: false, message: `Inquiry with ID ${InquiryId} not found.` });
        }
        return res.status(200).json({ success: true, data: inquiry, message: `Inquiry with ID ${InquiryId} fetched successfully.` });

      } catch (error) {
        console.error('Error fetching Inquiry:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error. Failed to fetch Inquiry.' });
      }
    }

    // Metode PUT: Memperbarui transaksi
    else if (req.method === 'PUT') {
      try {
        const updatedInquiry = await prisma.inquiry.update({
          where: { id: InquiryId },
          data: req.body,
        });
        return res.status(200).json({ success: true, data: updatedInquiry, message: `Inquiry with ID ${InquiryId} updated successfully.` });
      } catch (error) {
        if (error.code === 'P2025') {
          return res.status(404).json({ success: false, message: `Inquiry with ID ${InquiryId} not found.` });
        }
        if (error.code === 'P2002') {
          return res.status(409).json({ success: false, message: `A Inquiry with the provided ${error.meta.target.join(', ')} already exists.` });
        }
        console.error('Error updating Inquiry:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error. Failed to update Inquiry.' });
      }
    }

    // Metode DELETE: Menghapus transaksi
    else if (req.method === 'DELETE') {
      try {
        const deletedInquiry = await prisma.inquiry.delete({
          where: { id: InquiryId },
        });
        return res.status(200).json({ success: true, data: deletedInquiry, message: `Inquiry with ID ${InquiryId} deleted successfully.` });
      } catch (error) {
        if (error.code === 'P2025') {
          return res.status(404).json({ success: false, message: `Inquiry with ID ${InquiryId} not found.` });
        }
        console.error('Error deleting Inquiry:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error. Failed to delete Inquiry.' });
      }
    }

    else {
      // Metode tidak diizinkan
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
