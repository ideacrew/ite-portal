/* eslint-disable unicorn/prefer-module */
import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';

const cypressJsonConfig = {
  video: false,
};

export default defineConfig({
  e2e: { ...nxE2EPreset(__dirname), ...cypressJsonConfig },
});
