const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const test = require('node:test');

// Exercise the actual generated inline handler, without loading HubSpot,
// analytics, or creating a lead.
const html = fs.readFileSync('mkdocs_overrides/main.html', 'utf8');
const script = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script\s*>/gi)]
  .map(m => m[1]).find(s => s.includes('data-orkes-demo'));
assert.ok(script, 'demo modal handler was generated');

function fixture() {
  const handlers = {}, forms = [], signals = [], linkedIn = [];
  let focused;
  function element() {
    const children = new Map();
    return {
      style: {}, classList: { contains: () => false },
      setAttribute() {}, addEventListener() {}, remove() {},
      focus() { focused = this; },
      querySelector(s) { if (!children.has(s)) children.set(s, element()); return children.get(s); },
    };
  }
  const header = element();
  const doc = {
    querySelector: s => s === '[data-orkes-demo]' ? header : { appendChild() {} },
    createElement: element,
    body: { style: {}, appendChild() {} },
    addEventListener: (n, f) => { handlers[n] = f; },
  };
  const win = {
    location: { pathname: '/content/ai-cookbook/failure-semantics' },
    dataLayer: signals,
    hbspt: { forms: { create: opts => forms.push(opts) } },
    lintrk: (...args) => linkedIn.push(args),
  };
  vm.runInNewContext(script, { document: doc, window: win });
  const trigger = {
    getAttribute: name => name === 'data-docs-demo-placement' ? 'guide_end' : 'failure-recovery',
    focus() { focused = this; },
  };
  function open() { handlers.click({ target: { closest: () => trigger }, preventDefault() {} }); }
  return { forms, signals, linkedIn, handlers, open, trigger, focused: () => focused };
}

test('guide CTA opens the existing demo form without creating a conversion', () => {
  const f = fixture(); f.open();
  assert.equal(f.forms[0].portalId, '20882608');
  assert.equal(f.forms[0].formId, 'e0553b12-5fe4-4b27-86a8-3e619c4f6319');
  assert.equal(f.signals.length, 1);
  assert.equal(f.signals[0].event, 'docs_demo_cta_click');
  assert.equal(f.signals[0].docs_guide, 'failure-recovery');
  assert.equal(f.signals[0].docs_cta_placement, 'guide_end');
  assert.equal(f.linkedIn.length, 0);
  f.forms[0].onFormSubmit(null, [{ name: 'email', value: 'unit-test@example.invalid' }]);
  assert.equal(f.signals.length, 1, 'attempt alone is not a lead');
  assert.equal(f.linkedIn.length, 0);
  f.forms[0].onFormSubmitted(); f.forms[0].onFormSubmitted();
  assert.equal(f.signals.filter(x => x.event === 'formSubmitted').length, 1);
  assert.equal(f.linkedIn.length, 1);
  assert.equal(f.signals.some(x => x.event === 'form_submit_success'), false, 'existing GTM success listener owns this event');
});

test('reopening keeps independent submission callbacks and restores focus', () => {
  const f = fixture(); f.open();
  f.handlers.keydown({ key: 'Escape' });
  assert.equal(f.focused(), f.trigger);
  f.open();
  f.forms[0].onFormSubmitted();
  f.forms[1].onFormSubmitted();
  f.forms[1].onFormSubmitted();
  assert.equal(f.linkedIn.length, 2);
});
