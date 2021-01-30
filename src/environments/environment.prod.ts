import {commonEnvironments} from './environment.common';

export const environment = {
  production: true,
  urlPrefix: '/blog',
  localAssets: '/blog/assets',
  ...commonEnvironments,
};
