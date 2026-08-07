import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const PAGE = new URL('../../../src/renderer/settings/usage-settings-page.tsx', import.meta.url);

test('Pricing renderer stays behind the Host-backed port and away from the legacy bridge', async () => {
  const source = await readFile(PAGE, 'utf8');

  assert.match(source, /DesktopPricingSettingsPort/);
  assert.match(source, /EffectivePricingEntry/);
  assert.doesNotMatch(source, /window\.maka\.settings\.pricing/);
  assert.doesNotMatch(source, /usage:pricing:(?:list|put|reset|changed)/);
});
