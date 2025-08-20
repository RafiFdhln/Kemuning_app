import {
  Icon3dRotate,
  IconBook2,
  IconBuildingBank,
  IconBuildingWarehouse,
  IconCashBanknote,
  IconScale,
  IconSettingsDollar,
  IconShoppingBagPlus,
  IconShoppingCartDollar,
  IconTrendingDown,
  IconUsers,
  IconVocabulary,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Data Perusahaan",
  },
  {
    id: uniqueId(),
    title: "Pemasok",
    icon: IconBuildingWarehouse,
    href: "/supplier/SupplierPage",
  },
  {
    id: uniqueId(),
    title: "Pelanggan",
    icon: IconUsers,
    href: "/customer/CustomerPage",
  },
  {
    id: uniqueId(),
    title: "Produk",
    icon: Icon3dRotate,
    href: "/profil",
    children: [
      {
        id: uniqueId(),
        title: "Barang",
        href: "profile/CompanyProfile", // Replace with your route
      },
      {
        id: uniqueId(),
        title: "Jasa",
        href: "/profile/company-settings", // Replace with your route
      },
    ],
  },

  {
    navlabel: true,
    subheader: "Transaksi",
  },
  {
    id: uniqueId(),
    title: "Inquiry",
    icon: IconCashBanknote,
    href: "/transaction/inquiry/InquiryPage",
  },
  // {
  //   id: uniqueId(),
  //   title: "Penjualan",
  //   icon: IconShoppingCartDollar,
  //   href: "/transaction/sell/SellPage",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Pembelian",
  //   icon: IconShoppingBagPlus,
  //   href: "/profil",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Bank",
  //   icon: IconBuildingBank,
  //   href: "/profil",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Penyesuaian",
  //   icon: IconSettingsDollar,
  //   href: "/profil",
  // },

  // {
  //   navlabel: true,
  //   subheader: "Laporan",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Buku Besar",
  //   icon: IconBook2,
  //   href: "/profil",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Laba Rugi",
  //   icon: IconTrendingDown,
  //   href: "/profil",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Neraca",
  //   icon: IconScale,
  //   href: "/profil",
  // },

  // {
  //   navlabel: true,
  //   subheader: "Home",
  // },

  // {
  //   id: uniqueId(),
  //   title: "Dashboard",
  //   icon: IconLayoutDashboard,
  //   href: "/euy",
  // },
  // {
  //   navlabel: true,
  //   subheader: "Utilities",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Typography",
  //   icon: IconTypography,
  //   href: "/utilities/typography",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Shadow",
  //   icon: IconCopy,
  //   href: "/utilities/shadow",
  // },
  // {
  //   navlabel: true,
  //   subheader: "Auth",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Login",
  //   icon: IconLogin,
  //   href: "/authentication/login",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Register",
  //   icon: IconUserPlus,
  //   href: "/authentication/register",
  // },
  // {
  //   navlabel: true,
  //   subheader: "Extra",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Icons",
  //   icon: IconMoodHappy,
  //   href: "/icons",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Sample Page",
  //   icon: IconAperture,
  //   href: "/sample-page",
  // },
];

export default Menuitems;
