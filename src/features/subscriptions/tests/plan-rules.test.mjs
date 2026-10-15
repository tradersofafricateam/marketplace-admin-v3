import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createRequire } from 'node:module';

const build = mkdtempSync(join(tmpdir(), 'tofa-plan-tests-'));
after(() => rmSync(build, { recursive: true, force: true }));
execFileSync(process.execPath, [
  'node_modules/typescript/bin/tsc', '--target', 'ES2022', '--module', 'commonjs',
  '--skipLibCheck', '--outDir', build,
  'src/features/subscriptions/helpers/entitlements.ts',
  'src/features/subscriptions/helpers/validation.ts',
  'src/features/subscriptions/helpers/plan-input.ts',
]);
const require = createRequire(import.meta.url);
const { parseEntitlements, entitlementRows } = require(join(build, 'helpers/entitlements.js'));
const { validatePlan } = require(join(build, 'helpers/validation.js'));
const { changedPlanFields, planInput } = require(join(build, 'helpers/plan-input.js'));
const validPlan = () => ({ name: 'Custom plan', description: '', audience: 'seller', isFree: false,
  isDefault: false, displayOrder: 0, prices: [{ currency: 'NGN', amount: 1000, billingPeriod: 'monthly' }],
  entitlements: { transaction_fee_percentage: 2.5, analytics_access: false, max_products: 0 } });

test('decimal transaction fees, zero limits and disabled benefits survive editing', () => {
  const rows = entitlementRows({ transaction_fee_percentage: 3, max_products: 0, analytics_access: false });
  assert.equal(rows[0].type, 'decimal');
  rows[0].value = '3.25';
  assert.deepEqual({ ...parseEntitlements(rows) }, { transaction_fee_percentage: 3.25, max_products: 0, analytics_access: false });
});
test('unknown benefit codes and null values are preserved', () => {
  const values = { future_feature: true, custom_level: 'enterprise', optional_limit: null };
  assert.deepEqual({ ...parseEntitlements(entitlementRows(values)) }, values);
});
test('duplicate codes and invalid numeric inputs are rejected', () => {
  assert.throws(() => parseEntitlements([{ code: 'max_products', type: 'integer', value: '' }]), /valid integer/);
  assert.throws(() => parseEntitlements([{ code: 'extra', type: 'integer', value: '1.5' }]), /valid integer/);
  assert.throws(() => parseEntitlements([{ code: 'extra', type: 'string', value: 'a' }, { code: 'extra', type: 'string', value: 'b' }]), /Duplicate/);
});
test('seller fees are required, allow decimals and stay within 0–100', () => {
  validatePlan(validPlan());
  for (const fee of [-1, 101, null, '3', undefined]) {
    const plan = validPlan(); plan.entitlements.transaction_fee_percentage = fee;
    assert.throws(() => validatePlan(plan));
  }
});
test('currency-period duplicates and nonzero free pricing are rejected', () => {
  const plan = validPlan();
  assert.throws(() => validatePlan({ ...plan, prices: [...plan.prices, ...plan.prices] }), /one price/);
  assert.throws(() => validatePlan({ ...plan, isFree: true }), /zero prices/);
  assert.throws(() => validatePlan({ ...plan, prices: [{ currency: 'USD', amount: '', billingPeriod: 'monthly' }] }), /valid non-negative/);
});
test('saving a changed name does not overwrite unrelated configuration', () => {
  const previous = planInput({ ...validPlan(), id: 'plan-1', status: 'active' });
  assert.deepEqual(changedPlanFields({ ...previous, name: 'Updated plan' }, previous), { name: 'Updated plan' });
  assert.deepEqual(changedPlanFields(previous, previous), {});
});
