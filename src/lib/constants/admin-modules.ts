import {
  BarChart3, Bell, Boxes, Building2, CircleDollarSign, ClipboardCheck,
  Coins, CreditCard, FileSearch, Gift, Globe2, HandCoins, Languages,
  LayoutDashboard, ListTree, MessageSquareWarning, PackageCheck, ReceiptText,
  RefreshCcw, Repeat2, Settings2, ShieldCheck, ShoppingBag, Star, Truck,
  Undo2, UserCog, UserRoundCheck, Users, WalletCards, Warehouse, Zap,
} from "lucide-react";
import type { AdminModule } from "@/lib/types/navigation";

export const adminModules: AdminModule[] = [
  { title: "Overview", description: "Marketplace health and activity", href: "/dashboard", icon: LayoutDashboard, group: "Workspace" },
  { title: "Users", description: "Customer accounts and access", href: "/users", icon: Users, group: "People & access" },
  { title: "Seller verification", description: "Business onboarding and KYB reviews", href: "/seller-verification", icon: Building2, group: "People & access" },
  { title: "Roles & permissions", description: "Admin users and authorization", href: "/roles-permissions", icon: UserCog, group: "People & access" },
  { title: "Products", description: "Listings and catalogue moderation", href: "/products", icon: ShoppingBag, group: "Commerce" },
  { title: "Categories", description: "Marketplace taxonomy", href: "/categories", icon: ListTree, group: "Commerce" },
  { title: "Orders", description: "Order lifecycle operations", href: "/orders", icon: PackageCheck, group: "Commerce" },
  { title: "Payments", description: "Payment transactions and status", href: "/payments", icon: CreditCard, group: "Finance" },
  { title: "Refunds", description: "Refund requests and processing", href: "/refunds", icon: RefreshCcw, group: "Finance" },
  { title: "Settlements", description: "Seller settlement cycles", href: "/settlements", icon: ReceiptText, group: "Finance" },
  { title: "Payouts", description: "Seller disbursements", href: "/payouts", icon: HandCoins, group: "Finance" },
  { title: "Payout accounts", description: "Review seller payout details", href: "/payout-accounts", icon: WalletCards, group: "Finance" },
  { title: "Delivery & logistics", description: "Shipments and fulfillment", href: "/logistics", icon: Truck, group: "Operations" },
  { title: "Direct RFQs", description: "Buyer-to-seller quotation requests", href: "/direct-rfqs", icon: FileSearch, group: "RFQ" },
  { title: "Market RFQs", description: "Open marketplace quotation requests", href: "/market-rfqs", icon: ClipboardCheck, group: "RFQ" },
  { title: "Disputes", description: "Cases requiring admin resolution", href: "/disputes", icon: ShieldCheck, group: "Trust & safety" },
  { title: "Returns & cancellations", description: "Post-order exceptions", href: "/returns-cancellations", icon: Undo2, group: "Trust & safety" },
  { title: "Subscription plans", description: "Plan catalogue and entitlements", href: "/subscription-plans", icon: Boxes, group: "Subscriptions" },
  { title: "User subscriptions", description: "Active subscriptions and billing", href: "/user-subscriptions", icon: Repeat2, group: "Subscriptions" },
  { title: "Review moderation", description: "Moderate product and seller reviews", href: "/reviews", icon: Star, group: "Trust & safety" },
  { title: "Communication oversight", description: "Only conversations requiring intervention", href: "/communications", icon: MessageSquareWarning, group: "Trust & safety" },
  { title: "Notifications", description: "Templates, campaigns, and delivery", href: "/notifications", icon: Bell, group: "Engagement" },
  { title: "Referrals", description: "Referral programs and attribution", href: "/referrals", icon: UserRoundCheck, group: "Engagement" },
  { title: "Rewards", description: "Reward rules and redemptions", href: "/rewards", icon: Gift, group: "Engagement" },
  { title: "Analytics & reporting", description: "Performance reports and exports", href: "/analytics", icon: BarChart3, group: "Insights" },
  { title: "Audit logs", description: "Administrative activity history", href: "/audit-logs", icon: ShieldCheck, group: "Insights" },
  { title: "Marketplace settings", description: "System-wide marketplace behavior", href: "/settings", icon: Settings2, group: "Configuration" },
  { title: "Countries", description: "Supported country configuration", href: "/countries", icon: Globe2, group: "Configuration" },
  { title: "Currencies", description: "Supported currencies and rates", href: "/currencies", icon: Coins, group: "Configuration" },
  { title: "Languages", description: "Locale and language availability", href: "/languages", icon: Languages, group: "Configuration" },
  { title: "Payment methods", description: "Payment rail configuration", href: "/payment-methods", icon: CircleDollarSign, group: "Configuration" },
  { title: "Logistics providers", description: "Carrier integrations and rules", href: "/logistics-providers", icon: Warehouse, group: "Configuration" },
  { title: "Settlement & payout", description: "Financial schedules, limits, and rules", href: "/settlement-payout-config", icon: Zap, group: "Configuration" },
];

export const moduleGroups = [...new Set(adminModules.map((item) => item.group))];

export function getAdminModule(pathname: string) {
  return adminModules.find((item) => item.href === pathname);
}
