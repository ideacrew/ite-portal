import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

const cypressJsonConfig = {
  video: false,
};

export default defineConfig({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  e2e: { ...nxE2EPreset(__dirname), ...cypressJsonConfig },
});
