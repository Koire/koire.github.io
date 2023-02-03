import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://koire.github.io',
    integrations: [
        NetlifyCMS({
          config: {
            backend: {
              name: 'git-gateway',
              branch: 'main',
            },
            collections: [
              // Content collections
            ],
          },
        }),
      ]
});
