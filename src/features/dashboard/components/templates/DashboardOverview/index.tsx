"use client";

import { motion } from "framer-motion";
import { CircleDollarSign, PackageCheck, Store, Users } from "lucide-react";
import { MetricCard } from "@/components/molecules/MetricCard";
import { SectionTitle } from "@/components/atoms/SectionTitle";

const metrics = [
  { label: "Gross marketplace value", value: "$1.24m", trend: "+12.4%", icon: CircleDollarSign },
  { label: "Orders this month", value: "8,429", trend: "+8.2%", icon: PackageCheck },
  { label: "Active users", value: "24,810", trend: "+6.7%", icon: Users },
  { label: "Verified sellers", value: "1,284", trend: "+4.1%", icon: Store },
];

export function DashboardOverview() {
  return <div className="space-y-8"><SectionTitle eyebrow="Overview" title="Marketplace dashboard" description="A high-level view of marketplace performance and items requiring attention." /><motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{metrics.map((metric) => <motion.div key={metric.label} variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}><MetricCard {...metric} /></motion.div>)}</motion.div><div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]"><section className="min-h-80 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="font-bold text-navy-deep">Marketplace activity</h3><p className="mt-1 text-sm text-slate-500">Connect this panel to the analytics service.</p><div className="mt-8 flex h-48 items-end gap-3">{[35, 52, 46, 68, 58, 81, 72, 90, 74, 88, 95, 84].map((height, index) => <div key={index} className="flex-1 rounded-t-md bg-sky-100" style={{ height: `${height}%` }}><div className="h-1/2 rounded-t-md bg-navy" /></div>)}</div></section><section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="font-bold text-navy-deep">Requires attention</h3><div className="mt-5 space-y-3">{[["Seller verifications", "18"], ["Open disputes", "7"], ["Refund requests", "12"], ["Payout account reviews", "9"]].map(([label, count]) => <div key={label} className="flex items-center justify-between rounded-xl bg-slate-50 p-4"><span className="text-sm font-medium text-slate-700">{label}</span><strong className="text-orange-600">{count}</strong></div>)}</div></section></div></div>;
}
