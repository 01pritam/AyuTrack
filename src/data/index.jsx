// index.js in data folder
export const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  
  { label: "Track Orders", href: "/track-orders" },
  { label: "Billings", href: "/billings" },
  { label: "Inventory", href: "/inventory" },
  { label: "Profile", href: "/profile" },
];

export const inventoryData = [
  {
    recordId: 1,
    name: "Paracetamol",
    category: "Pain Reliever",
    batchNo: "A123",
    expiryDate: "2025-12-01",
    mrp: "50",
    stockStatus: "In Stock",
    demand: "Low",
  },
  {
    recordId: 2,
    name: "Amoxicillin",
    category: "Antibiotic",
    batchNo: "B456",
    expiryDate: "2024-08-15",
    mrp: "100",
    stockStatus: "Low Stock",
    demand: "High",
  },
];