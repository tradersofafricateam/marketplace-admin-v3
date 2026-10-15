import assert from 'node:assert/strict';
import test from 'node:test';
import { categoryName, changedFields, statusActions } from '../helpers/index.ts';

test('deleted categories have no lifecycle actions; archived categories can restore or delete', () => {
  assert.deepEqual(statusActions('deleted'), []);
  assert.deepEqual(statusActions('archived'), ['active', 'deleted']);
  assert.deepEqual(statusActions('active'), ['inactive', 'archived', 'deleted']);
  assert.deepEqual(statusActions('inactive'), ['active', 'archived', 'deleted']);
});

test('names use English with safe localized and missing-data fallbacks', () => {
  assert.equal(categoryName({ en: 'Agriculture', fr: 'Agriculture FR' }), 'Agriculture');
  assert.equal(categoryName({ fr: 'Construction' }), 'Construction');
  assert.equal(categoryName('Agriculture'), 'Agriculture');
  assert.equal(categoryName(null), '—');
});

test('editing a list record does not erase fields omitted from the response', () => {
  const category = { id: 'a', name: { en: 'Agriculture' }, parentId: null, sortOrder: 1, status: 'active', slug: 'agriculture' };
  const input = { name: 'Agriculture', description: '', parentId: null, sortOrder: 1, icon: null, image: null };
  assert.deepEqual(changedFields(input, category), {});
  assert.deepEqual(changedFields({ ...input, name: 'Farming' }, category), { name: 'Farming' });
});

test('explicit edits preserve zero sort order and clearing an existing parent', () => {
  const category = { name: { en: 'Nuts' }, parentId: 'agriculture', sortOrder: 3, description: { en: 'Old' } };
  assert.deepEqual(changedFields({ name: 'Nuts', parentId: null, sortOrder: 0, description: '' }, category), { parentId: null, sortOrder: 0, description: '' });
});
