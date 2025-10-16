export const CLIENTS = [
  { id: 1, name: "Acme Corporation" },
  { id: 2, name: "TechStart Solutions" },
  { id: 3, name: "Global Enterprises" },
];

export const PO_TYPES = [
  { id: "group", name: "Group PO" },
  { id: "individual", name: "Individual PO" },
];

export const CURRENCIES = [
  "USD - Dollars ($)",
  "EUR - Euros (€)",
  "GBP - Pounds (£)",
  "INR - Rupees (₹)"
];

export const REQS_BY_CLIENT = {
  1: [
    {
      id: "OWNAI_234",
      name: "Application Development",
      talents: [
        { id: "T001", name: "Monika Goyal Test" },
        { id: "T002", name: "Shaili Khatri" },
        { id: "T003", name: "Mike Johnson" },
      ],
    },
    {
      id: "CLK_12880",
      name: "Business Administrator",
      talents: [
        { id: "T004", name: "Sarah Wilson" },
        { id: "T005", name: "Tom Brown" },
      ],
    },
  ],
  2: [
    {
      id: "REQ003",
      name: "Backend Engineer",
      talents: [
        { id: "T006", name: "Alice Cooper" },
        { id: "T007", name: "Bob Martin" },
      ],
    },
  ],
  3: [
    {
      id: "REQ004",
      name: "DevOps Engineer",
      talents: [{ id: "T008", name: "Charlie Davis" }],
    },
  ],
};
