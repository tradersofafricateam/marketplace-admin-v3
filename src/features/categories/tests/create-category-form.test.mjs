import assert from 'node:assert/strict';
import test from 'node:test';
import { createCategoryFormData } from '../helpers/create-category-form.ts';

test('name alone is valid and empty optional fields are omitted', () => {
  const data = createCategoryFormData({ name: ' Agriculture ', parentId: null, description: '' });
  assert.deepEqual([...data.entries()], [['name', 'Agriculture']]);
});
test('uploads preserve their binary contents and filenames', async () => {
  const icon = new File(['icon bytes'], 'icon.png', { type: 'image/png' });
  const image = new File(['cover bytes'], 'cover.webp', { type: 'image/webp' });
  const data = createCategoryFormData({ name: 'Agriculture', icon, image, sourceLanguage: 'en', sortOrder: 0, parentId: 'parent-uuid' });
  assert.equal(data.get('icon').name, 'icon.png');
  assert.equal(await data.get('image').text(), 'cover bytes');
  assert.equal(data.get('sortOrder'), '0');
  assert.equal(data.get('sourceLanguage'), 'en');
  assert.equal(data.get('parentId'), 'parent-uuid');
});
test('translation JSON is preserved as a multipart string', () => {
  const name = '{"en":"Agriculture"}';
  assert.equal(createCategoryFormData({ name }).get('name'), name);
});
test('invalid names, sort orders and unsupported files are rejected', () => {
  assert.throws(() => createCategoryFormData({ name: ' ' }), /required/);
  for (const sortOrder of [-1, 0.5, NaN]) assert.throws(() => createCategoryFormData({ name: 'A', sortOrder }), /integer/);
  assert.throws(() => createCategoryFormData({ name: 'A', image: new File(['x'], 'x.svg', { type: 'image/svg+xml' }) }), /JPEG/);
});
