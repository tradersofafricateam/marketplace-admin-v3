/** Transactional finance operations; configuration remains isolated. */
export const financeCapabilities = ["payments", "refunds", "settlements", "payouts", "payout-accounts"] as const;
