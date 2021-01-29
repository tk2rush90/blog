import {commonEnvironments} from './environment.common';

export const environment = {
  production: true,
  assetsPrefix: '/blog',
  localAssets: '/blog/assets',
  ...commonEnvironments,
};
