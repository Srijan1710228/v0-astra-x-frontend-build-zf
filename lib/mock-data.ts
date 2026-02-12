// Revenue forecast data
export const revenueForecastData = [
  { month: "Jan", actual: 42000, forecast: 44000 },
  { month: "Feb", actual: 48000, forecast: 47000 },
  { month: "Mar", actual: 51000, forecast: 52000 },
  { month: "Apr", actual: 55000, forecast: 56500 },
  { month: "May", actual: 59000, forecast: 61000 },
  { month: "Jun", actual: 63000, forecast: 65000 },
  { month: "Jul", actual: null, forecast: 69000 },
  { month: "Aug", actual: null, forecast: 73500 },
  { month: "Sep", actual: null, forecast: 78000 },
]

// India regions heatmap data
export const regionData = [
  { id: "MH", name: "Maharashtra", demand: 92, risk: 0.15, affinity: "Electronics" },
  { id: "DL", name: "Delhi NCR", demand: 88, risk: 0.18, affinity: "Fashion" },
  { id: "KA", name: "Karnataka", demand: 85, risk: 0.12, affinity: "Technology" },
  { id: "TN", name: "Tamil Nadu", demand: 78, risk: 0.2, affinity: "Automotive" },
  { id: "GJ", name: "Gujarat", demand: 74, risk: 0.14, affinity: "Textiles" },
  { id: "WB", name: "West Bengal", demand: 68, risk: 0.25, affinity: "FMCG" },
  { id: "RJ", name: "Rajasthan", demand: 62, risk: 0.22, affinity: "Handicrafts" },
  { id: "UP", name: "Uttar Pradesh", demand: 71, risk: 0.28, affinity: "Agriculture" },
  { id: "KL", name: "Kerala", demand: 65, risk: 0.16, affinity: "Healthcare" },
  { id: "TS", name: "Telangana", demand: 80, risk: 0.13, affinity: "Pharma" },
  { id: "AP", name: "Andhra Pradesh", demand: 60, risk: 0.21, affinity: "Agriculture" },
  { id: "MP", name: "Madhya Pradesh", demand: 55, risk: 0.26, affinity: "Mining" },
  { id: "PB", name: "Punjab", demand: 58, risk: 0.19, affinity: "Agriculture" },
  { id: "HR", name: "Haryana", demand: 66, risk: 0.17, affinity: "Manufacturing" },
  { id: "BR", name: "Bihar", demand: 45, risk: 0.32, affinity: "Agriculture" },
]

// Blockchain activity log
export const blockchainEvents = [
  {
    id: 1,
    type: "Data Upload Logged",
    timestamp: "2026-02-12T10:30:00Z",
    hash: "0x8f7e3b1c2d4a5e6f7890abcdef123456789012345678901234567890abcdef12",
    contract: "0x1234...5678",
    status: "Confirmed",
    metadata: { dataType: "sales_data", records: 15420, region: "Maharashtra" },
  },
  {
    id: 2,
    type: "Simulation Hash Stored",
    timestamp: "2026-02-12T09:15:00Z",
    hash: "0xa1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
    contract: "0x5678...9abc",
    status: "Confirmed",
    metadata: { simulationType: "price_optimization", confidence: 0.94 },
  },
  {
    id: 3,
    type: "Credit Score Updated",
    timestamp: "2026-02-11T16:45:00Z",
    hash: "0xdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab",
    contract: "0x9abc...def0",
    status: "Confirmed",
    metadata: { previousScore: 812, newScore: 847, delta: "+35" },
  },
  {
    id: 4,
    type: "Escrow Contract Created",
    timestamp: "2026-02-11T14:20:00Z",
    hash: "0x567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234",
    contract: "0xdef0...1234",
    status: "Confirmed",
    metadata: { amount: "2.5 MATIC", supplier: "0xabc...123", expiry: "2026-03-11" },
  },
  {
    id: 5,
    type: "Escrow Released",
    timestamp: "2026-02-10T11:00:00Z",
    hash: "0x890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456",
    contract: "0xdef0...1234",
    status: "Confirmed",
    metadata: { amount: "1.8 MATIC", recipient: "0xdef...789", fulfillmentRate: "98.5%" },
  },
  {
    id: 6,
    type: "Data Upload Logged",
    timestamp: "2026-02-10T08:30:00Z",
    hash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    contract: "0x1234...5678",
    status: "Pending",
    metadata: { dataType: "inventory_snapshot", records: 8920, region: "Karnataka" },
  },
]

// Credit score data
export const creditScoreData = {
  score: 847,
  maxScore: 1000,
  riskCategory: "Low Risk",
  fulfillmentReliability: 97.8,
  revenueGrowth: [
    { month: "Sep", growth: 8.2 },
    { month: "Oct", growth: 12.5 },
    { month: "Nov", growth: 15.1 },
    { month: "Dec", growth: 11.8 },
    { month: "Jan", growth: 18.3 },
    { month: "Feb", growth: 22.1 },
  ],
  onChainHash: "0x7f8e9d0c1b2a3456789012345678901234567890abcdef1234567890abcdef12",
}

// AI Insights / Suggestions
export const aiInsights = [
  {
    id: 1,
    category: "Pricing Optimization",
    insight: "Increase price by 3% in Bangalore",
    detail: "Demand elasticity analysis shows Bangalore consumers are price-inelastic for Electronics above 88th percentile. A 3% increase projects +4.8% margin with <0.5% volume loss.",
    impact: "+4.8% margin",
    confidence: 0.93,
    priority: "high" as const,
  },
  {
    id: 2,
    category: "Inventory Optimization",
    insight: "Shift 300 units to Pune",
    detail: "Pune regional demand cluster is showing 18% higher velocity vs. current allocation. Rebalancing from overstock in Rajasthan reduces holding cost and meets latent demand.",
    impact: "-12% holding cost",
    confidence: 0.89,
    priority: "high" as const,
  },
  {
    id: 3,
    category: "Marketing Allocation",
    insight: "Reduce ad spend in low ROI regions",
    detail: "Bihar and MP digital channels returning 0.4x ROAS vs. platform average of 2.1x. Recommend reallocating 65% of their budget to Karnataka and Maharashtra digital channels.",
    impact: "+22% ROAS",
    confidence: 0.91,
    priority: "medium" as const,
  },
  {
    id: 4,
    category: "Supplier Risk",
    insight: "Supplier B has 18% late delivery risk",
    detail: "Based on last 90 days of fulfillment data, Supplier B (Textile Raw Materials) shows increasing lead time variance. Risk of 3-day stockout in next 2 weeks is 18%.",
    impact: "Prevent stockout",
    confidence: 0.86,
    priority: "high" as const,
  },
  {
    id: 5,
    category: "Trend Alert",
    insight: "Cotton price rising in 2 weeks",
    detail: "Commodity futures and supplier sentiment data indicate cotton prices will increase 8-12% within 14 days. Recommend pre-purchasing 30-day supply buffer now.",
    impact: "Save 8-12%",
    confidence: 0.84,
    priority: "medium" as const,
  },
  {
    id: 6,
    category: "Pricing Optimization",
    insight: "Bundle SKU-1204 with SKU-3891 for 15% discount",
    detail: "Cross-purchase analysis reveals 72% of buyers purchasing SKU-1204 also buy SKU-3891 within 7 days. Bundling at 15% discount projects +28% conversion for the pair.",
    impact: "+28% conversion",
    confidence: 0.88,
    priority: "low" as const,
  },
]

// Autopilot suggestions
export const autopilotSuggestions = [
  {
    id: 1,
    action: "Reduce price by 4.2%",
    category: "Price Optimization",
    impact: "+12.8% projected demand",
    confidence: 0.91,
  },
  {
    id: 2,
    action: "Reallocate 18% budget to digital",
    category: "Budget Reallocation",
    impact: "+8.5% ROI improvement",
    confidence: 0.87,
  },
  {
    id: 3,
    action: "Increase supplier order by 2,400 units",
    category: "Supplier Order",
    impact: "Prevent 3-day stockout risk",
    confidence: 0.94,
  },
]
