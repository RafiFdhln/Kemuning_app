import prisma from "../../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

// Function to calculate inquiry status based on item readiness
function calculateInquiryStatus(items: any[]): "PENDING" | "INCOMPLETE" | "READY" {
  if (!items || items.length === 0) {
    return "PENDING";
  }

  const readyItems = items.filter(item => item.status === "READY").length;
  const totalItems = items.length;

  if (readyItems === 0) {
    return "PENDING";
  } else if (readyItems < totalItems) {
    return "INCOMPLETE";
  } else {
    return "READY";
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const inquiries = await prisma.inquiry.findMany({
        include: {
          customer: true,
          items: { 
            include: { 
              supplier: true, 
              item: true 
            } 
          },
        },
      });
      
      console.log('API: Fetched inquiries with customer data:', inquiries.map(inq => ({
        id: inq.id,
        requestNumber: inq.requestNumber,
        customerId: inq.customerId,
        customer: inq.customer,
        customerName: inq.customer?.name
      })));
      
      return res.status(200).json({
        success: true,
        data: inquiries,
        message: "All inquiries fetched successfully.",
      });
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }

  if (req.method === "POST") {
    try {
      console.log('=== API: Creating new inquiry ===');
      console.log('Request body:', req.body);
      
      const { requestNumber, requestDate, customerId, status, remarks, noQuotation, items, category } = req.body;

      console.log('Extracted fields:', {
        requestNumber,
        requestDate,
        customerId,
        status,
        remarks,
        category,
        itemsCount: items ? items.length : 0
      });

      if (!customerId || !requestDate) {
        console.error('Validation failed: missing customerId or requestDate');
        return res.status(400).json({ success: false, message: "customerId and requestDate are required." });
      }

      // Generate request number if missing/empty
      let finalRequestNumber = requestNumber && String(requestNumber).trim() !== "" ? String(requestNumber).trim() : undefined;
      const jsDate = new Date(requestDate);
      
      console.log('Date processing:', {
        originalDate: requestDate,
        jsDate: jsDate,
        isValidDate: !isNaN(jsDate.getTime())
      });
      
      if (!finalRequestNumber) {
        const mm = String(jsDate.getMonth() + 1).padStart(2, '0');
        const yy = String(jsDate.getFullYear() % 100).padStart(2, '0');
        const prefix = `INQ-${mm}${yy}`;
        
        console.log('Generating request number with prefix:', prefix);
        
        const last = await prisma.inquiry.findMany({
          where: { requestNumber: { startsWith: prefix } },
          select: { requestNumber: true },
          orderBy: { requestNumber: 'desc' },
          take: 1,
        });
        
        const lastSeq = last.length && last[0].requestNumber
          ? parseInt(String(last[0].requestNumber).slice(-3), 10)
          : 0;
        const nextSeq = String((isNaN(lastSeq) ? 0 : lastSeq) + 1).padStart(3, '0');
        finalRequestNumber = `${prefix}${nextSeq}`;
        
        console.log('Generated request number:', finalRequestNumber);
      }

      const filteredItems = Array.isArray(items)
        ? items.filter((i: any) => i && typeof i.name === 'string' && i.name.trim() !== '' && (typeof i.qty === 'number' ? i.qty > 0 : true))
        : [];

      console.log('Filtered items:', filteredItems);
      console.log('Items with supplier data:', filteredItems.map(i => ({
        name: i.name,
        supplierId: i.supplierId,
        supplierName: i.supplierName
      })));

      // Calculate status based on item readiness
      const calculatedStatus = calculateInquiryStatus(filteredItems);

      console.log('Creating inquiry with data:', {
        requestNumber: finalRequestNumber,
        requestDate: jsDate,
        customerId,
        calculatedStatus,
        remarks,
        category: category || "BARANG",
        itemsCount: filteredItems.length
      });

      const newInquiry = await prisma.inquiry.create({
        data: {
          requestNumber: finalRequestNumber,
          requestDate: jsDate,
          customerId,
          status: calculatedStatus,
          remarks,
          category: category || "BARANG",
          items: filteredItems?.length
            ? {
                create: filteredItems.map((i: any) => ({
                  supplier: i.supplierId ? { connect: { id: i.supplierId } } : undefined,
                  item: i.itemId ? { connect: { id: i.itemId } } : undefined,
                  name: i.name,
                  detail: i.detail || null,
                  status: i.status,
                  qty: i.qty,
                  unit: i.unit,
                  hpp: i.hpp ? parseFloat(i.hpp) : 0,
                  totalHpp: i.totalHpp ? parseFloat(i.totalHpp) : (i.hpp && i.qty ? parseFloat(i.hpp) * i.qty : 0),
                  notes: i.status,
                  deliveryTime: i.deliveryTime ? new Date(i.deliveryTime) : null,
                })),
              }
            : undefined,
        },
        include: { customer: true, items: { include: { supplier: true, item: true } } },
      });

      console.log('Inquiry created successfully:', newInquiry);

      return res.status(201).json({ success: true, data: newInquiry, message: "Transaction created successfully." });
    } catch (error: any) {
      console.error('=== API ERROR ===');
      console.error('Error creating transaction:', error);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  if (req.method === "PUT") {
    try {
      const { inquiryId, items } = req.body;
      
      if (!inquiryId || !items) {
        return res.status(400).json({ success: false, message: "inquiryId and items are required" });
      }

      // Update inquiry items
      await prisma.inquiryItem.deleteMany({
        where: { inquiryId }
      });

      await prisma.inquiryItem.createMany({
        data: items.map((item: any) => ({
          inquiryId,
          supplierId: item.supplierId || null,
          itemId: item.itemId || null,
          name: item.name,
          detail: item.detail || null,
          status: item.status,
          qty: item.qty,
          unit: item.unit,
          hpp: item.hpp ? parseFloat(item.hpp) : 0,
          totalHpp: item.totalHpp ? parseFloat(item.totalHpp) : (item.hpp && item.qty ? parseFloat(item.hpp) * item.qty : 0),
          notes: item.status,
          deliveryTime: item.deliveryTime ? new Date(item.deliveryTime) : null,
        }))
      });

      // Get updated inquiry with items to calculate new status
      const updatedInquiry = await prisma.inquiry.findUnique({
        where: { id: inquiryId },
        include: { items: true }
      });

      if (!updatedInquiry) {
        return res.status(404).json({ success: false, message: "Inquiry not found" });
      }

      // Calculate new status based on updated items
      const newStatus = calculateInquiryStatus(updatedInquiry.items);

      // Update inquiry status
      const finalInquiry = await prisma.inquiry.update({
        where: { id: inquiryId },
        data: { status: newStatus },
        include: { customer: true, items: { include: { supplier: true, item: true } } }
      });

      return res.status(200).json({ 
        success: true, 
        data: finalInquiry, 
        message: "Inquiry updated successfully" 
      });

    } catch (error: any) {
      console.error('Error updating inquiry:', error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST", "PUT"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
