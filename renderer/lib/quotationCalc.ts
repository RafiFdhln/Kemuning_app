export type QuotationItemCalculatorInput = {
  qty?: number;
  hpp?: number; // cost per unit
  markupPercent?: number; // percentage
  discountPercent?: number; // percentage, applied on (hpp + markup)
};

export type QuotationItemCalculatorOutput = {
  unitPrice: number; // after discount
  totalPrice: number; // qty * unitPrice
  baseUnitBeforeDiscount: number; // hpp + markup amount
};

const toNumber = (v: any, fallback = 0): number => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

export const calculateUnitPrice = (input: QuotationItemCalculatorInput): number => {
  const qty = toNumber(input.qty, 0);
  const hpp = toNumber(input.hpp, 0);
  const markupPercent = toNumber(input.markupPercent, 0);
  const discountPercent = Math.min(Math.max(toNumber(input.discountPercent, 0), 0), 100);

  const baseUnit = hpp + (hpp * markupPercent / 100);
  const discountedUnit = baseUnit * (1 - discountPercent / 100);

  // if no qty provided, still return per-unit price
  return Number.isFinite(discountedUnit) ? discountedUnit : 0;
};

export const calculateItemTotals = (input: QuotationItemCalculatorInput): QuotationItemCalculatorOutput => {
  const qty = toNumber(input.qty, 0);
  const hpp = toNumber(input.hpp, 0);
  const markupPercent = toNumber(input.markupPercent, 0);
  const discountPercent = Math.min(Math.max(toNumber(input.discountPercent, 0), 0), 100);

  const baseUnit = hpp + (hpp * markupPercent / 100);
  const unitPrice = baseUnit * (1 - discountPercent / 100);
  const totalPrice = qty * unitPrice;

  return {
    unitPrice: Number.isFinite(unitPrice) ? unitPrice : 0,
    totalPrice: Number.isFinite(totalPrice) ? totalPrice : 0,
    baseUnitBeforeDiscount: Number.isFinite(baseUnit) ? baseUnit : 0,
  };
};

export const currencyId = (v: any) => {
  const n = Number(v ?? 0);
  if (!isFinite(n)) return "-";
  return n.toLocaleString("id-ID");
};


