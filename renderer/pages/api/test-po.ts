import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      console.log('Test PO API - Received data:', req.body);
      
      // Simple test response
      res.status(200).json({ 
        success: true, 
        message: 'Test PO endpoint working',
        receivedData: req.body
      });
    } catch (error: any) {
      console.error('Test PO API Error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Test PO endpoint error',
        error: error.message 
      });
    }
  } else {
    res.status(405).json({ 
      success: false, 
      message: `Method ${req.method} not allowed` 
    });
  }
}
