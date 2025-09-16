import prisma from "../../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const quotations = await prisma.quotation.findMany({
        include: {
          customer: true,
          inquiry: true,
          items: { include: { inquiryItem: true } },
          purchaseOrders: true,
        },
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json({ success: true, data: quotations, message: "All quotations fetched successfully." });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
  if (req.method === "POST") {
    try {
      const { inquiryId, remarks, items } = req.body;
      if (!inquiryId) {
        return res.status(400).json({ success: false, message: "inquiryId is required" });
      }
      const inquiry = await prisma.inquiry.findUnique({
        where: { id: inquiryId },
        include: { items: true, customer: true },
      });
      if (!inquiry) {
        return res.status(404).json({ success: false, message: "Inquiry not found" });
      }

      // Check if all items are ready
      const allItemsReady = inquiry.items.every(item => item.status === 'READY');
      if (!allItemsReady) {
        return res.status(400).json({ 
          success: false, 
          message: "Semua barang harus dalam status READY sebelum dapat dijadikan quotation" 
        });
      }
      const now = new Date();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const yy = String(now.getFullYear() % 100).padStart(2, '0');
      const prefix = `QUO-${mm}${yy}`;
      const last = await prisma.quotation.findMany({
        where: { quotationNumber: { startsWith: prefix } },
        select: { quotationNumber: true },
        orderBy: { quotationNumber: 'desc' },
        take: 1,
      });
      const lastSeq = last.length && last[0].quotationNumber ? parseInt(String(last[0].quotationNumber).slice(-3), 10) : 0;
      const nextSeq = String((isNaN(lastSeq) ? 0 : lastSeq) + 1).padStart(3, '0');
      const quotationNumber = `${prefix}${nextSeq}`;
      const useItems = Array.isArray(items) && items.length > 0
        ? items.map((it: any) => ({
            inquiryItemId: it.inquiryItemId || null,
            name: it.name,
            qty: Number(it.qty) || 0,
            price: Number(it.price) || 0,
            totalPrice: Number(it.totalPrice) || 0,
            remarks: it.remarks || null,
          }))
        : inquiry.items.map(item => ({
            inquiryItemId: item.id,
            name: item.name,
            qty: item.qty,
            price: item.sellingPrice || 0,
            totalPrice: item.totalPrice || 0,
            remarks: item.notes || null,
          }));

      // Update InquiryItem with markupPercent if provided
      if (Array.isArray(items) && items.length > 0) {
        console.log('Items received:', items); // Debug log
        for (const it of items) {
          console.log('Processing item:', { inquiryItemId: it.inquiryItemId, marginPct: it.marginPct }); // Debug log
          if (it.inquiryItemId && it.marginPct !== undefined) {
            const updatedItem = await prisma.inquiryItem.update({
              where: { id: it.inquiryItemId },
              data: { markupPercent: Number(it.marginPct) || 0 }
            });
            console.log('Updated InquiryItem:', updatedItem); // Debug log
          }
        }
      }

      const quotation = await prisma.quotation.create({
        data: {
          quotationNumber,
          inquiryId: inquiry.id,
          customerId: inquiry.customerId,
          status: "DRAFT",
          remarks: remarks || inquiry.remarks,
          items: {
            create: useItems
          }
        },
        include: { items: true }
      });
      await prisma.inquiry.update({ where: { id: inquiry.id }, data: { status: "QUOTED" } });
      return res.status(201).json({ success: true, data: quotation, message: "Quotation created successfully" });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
  if (req.method === "PUT") {
    try {
      const { quotationId, quotationNumber, customerId, createdAt, category, remarks, items } = req.body;
      
      if (!quotationId) {
        return res.status(400).json({ success: false, message: "quotationId is required" });
      }

      // Check if quotation exists
      const existingQuotation = await prisma.quotation.findUnique({
        where: { id: quotationId },
        include: { items: true }
      });

      if (!existingQuotation) {
        return res.status(404).json({ success: false, message: "Quotation not found" });
      }

      // Update quotation in a transaction
      const updatedQuotation = await prisma.$transaction(async (tx) => {
        // Delete existing quotation items
        await tx.quotationItem.deleteMany({
          where: { quotationId: quotationId }
        });

        // Update quotation basic info
        const quotation = await tx.quotation.update({
          where: { id: quotationId },
          data: {
            quotationNumber: quotationNumber || undefined,
            customerId: customerId,
            createdAt: createdAt ? new Date(createdAt) : undefined,
            remarks: remarks,
            updatedAt: new Date()
          }
        });

        // Optionally update Inquiry category if provided
        if (category) {
          try {
            await tx.inquiry.update({
              where: { id: quotation.inquiryId },
              data: { category }
            });
          } catch {}
        }

        // Create new quotation items
        if (items && Array.isArray(items)) {
          const quotationItems = items.map((item: any) => ({
            quotationId: quotationId,
            inquiryItemId: item.inquiryItemId || null,
            name: item.name,
            qty: Number(item.qty) || 0,
            price: Number(item.price) || 0,
            totalPrice: Number(item.totalPrice) || (Number(item.qty) * Number(item.price)),
            remarks: item.remarks || null,
          }));

          await tx.quotationItem.createMany({
            data: quotationItems
          });

          // Update related inquiry items if needed
          for (const item of items) {
            if (item.inquiryItemId) {
              const updateData: any = {};
              if (item.hpp !== undefined) updateData.hpp = Number(item.hpp);
              if (item.markupPercent !== undefined) updateData.markupPercent = Number(item.markupPercent);
              if (item.unit !== undefined) updateData.unit = item.unit;
              if (item.detail !== undefined) updateData.detail = item.detail;
              if (item.deliveryTime !== undefined && item.deliveryTime !== '-') {
                const deliveryDate = new Date(item.deliveryTime);
                // Interpret as free text: store as is in notes if invalid date
                if (!isNaN(deliveryDate.getTime())) {
                  updateData.deliveryTime = deliveryDate;
                } else {
                  updateData.notes = item.deliveryTime;
                }
              }
              if (item.via !== undefined) updateData.status = String(item.via);
              
              // Handle supplier update
              if (item.supplierName !== undefined) {
                const supplier = await tx.supplier.findFirst({
                  where: { name: item.supplierName }
                });
                if (supplier) {
                  updateData.supplierId = supplier.id;
                }
              }

              if (Object.keys(updateData).length > 0) {
                await tx.inquiryItem.update({
                  where: { id: item.inquiryItemId },
                  data: updateData
                });
              }
            }
          }
        }

        // Return updated quotation with items
        return await tx.quotation.findUnique({
          where: { id: quotationId },
          include: {
            customer: true,
            inquiry: true,
            items: { include: { inquiryItem: true } },
            purchaseOrders: true,
          }
        });
      });

      return res.status(200).json({ 
        success: true, 
        data: updatedQuotation, 
        message: "Quotation updated successfully" 
      });
    } catch (error: any) {
      console.error('Error updating quotation:', error);
      return res.status(500).json({ 
        success: false, 
        message: error.message || "Internal Server Error" 
      });
    }
  }
  
  res.setHeader("Allow", ["GET", "POST", "PUT"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
