const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const test = require('node:test');

const source = fs.readFileSync(require.resolve('../static/js/demo-cta.js'), 'utf8');
function destinations(search, loading) {
  const links = [{ href: 'https://orkes.io/demo' }, { href: 'https://orkes.io/demo' }];
  let ready;
  vm.runInNewContext(source, {
    URL, URLSearchParams,
    window: { location: { search } },
    document: {
      readyState: loading ? 'loading' : 'complete',
      querySelectorAll: () => links,
      addEventListener: (event, handler) => { assert.equal(event, 'DOMContentLoaded'); ready = handler; },
    },
  });
  if (ready) ready();
  return links.map(link => new URL(link.href));
}

for (const loading of [true, false]) {
  test(`preserves campaign attribution without forwarding arbitrary fields (loading=${loading})`, () => {
    const query = '?utm_source=linkedin&utm_campaign=ai%20cookbook&hsa_ad=1635735296&gclid=test-click&email=private%40example.com&redirect=https%3A%2F%2Fevil.example';
    for (const url of destinations(query, loading)) {
      assert.equal(url.origin + url.pathname, 'https://orkes.io/demo');
      assert.equal(url.searchParams.get('utm_source'), 'linkedin');
      assert.equal(url.searchParams.get('utm_campaign'), 'ai cookbook');
      assert.equal(url.searchParams.get('hsa_ad'), '1635735296');
      assert.equal(url.searchParams.get('gclid'), 'test-click');
      assert.equal(url.searchParams.has('email'), false);
      assert.equal(url.searchParams.has('redirect'), false);
    }
  });
}
test('does not invent attribution for an untagged visit', () => {
  for (const url of destinations('', false)) assert.equal(url.href, 'https://orkes.io/demo');
});
