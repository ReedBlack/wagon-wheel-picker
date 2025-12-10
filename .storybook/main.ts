import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: process.env.NODE_ENV === 'production' ? undefined : ['../public'],
  viteFinal: async (config) => {
    return {
      ...config,
      base: process.env.NODE_ENV === 'production' ? '/wagon-wheel-picker/' : '/',
      esbuild: {
        ...config.esbuild,
        jsx: 'automatic',
      },
    };
  },
};

export default config;
