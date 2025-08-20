export type Sell = {
  tanggal: Date;
  jenis: 'Jasa' | 'Barang';
  customer: string;
  keterangan: string;
  qty: number;
  hargaSatuan: number;
  total: number;
  ref: string;
  lunas: 'Ya' | 'Belum';
};

export const sellData: Sell[] = [
  {
    tanggal: new Date("2024-09-04T15:25:50"),
    jenis: "Jasa",
    customer: "PT. Nichias Rockwool Indonesia",
    keterangan: "Jasa pemasangan insulasi",
    qty: 1,
    hargaSatuan: 1500000,
    total: 1500000,
    ref: "4102",
    lunas: "Belum"
  },
  {
    tanggal: new Date("2024-09-04T15:26:17"),
    jenis: "Barang",
    customer: "PT. Shuangfei Electric Systems Manufacturing",
    keterangan: "Penjualan panel listrik",
    qty: 1,
    hargaSatuan: 4000000,
    total: 4000000,
    ref: "4101",
    lunas: "Ya"
  },
  {
    tanggal: new Date("2024-09-06T10:15:30"),
    jenis: "Jasa",
    customer: "PT. Denso Indonesia",
    keterangan: "Instalasi sistem kontrol",
    qty: 2,
    hargaSatuan: 2000000,
    total: 4000000,
    ref: "4102",
    lunas: "Belum"
  },
  {
    tanggal: new Date("2024-09-07T13:05:00"),
    jenis: "Barang",
    customer: "PT. Astra Otoparts",
    keterangan: "Penjualan modul sensor",
    qty: 5,
    hargaSatuan: 750000,
    total: 3750000,
    ref: "4101",
    lunas: "Ya"
  },
  {
    tanggal: new Date("2024-09-08T09:45:10"),
    jenis: "Jasa",
    customer: "PT. Panasonic Manufacturing Indonesia",
    keterangan: "Pemeliharaan jaringan listrik",
    qty: 1,
    hargaSatuan: 2500000,
    total: 2500000,
    ref: "4102",
    lunas: "Belum"
  }
];
