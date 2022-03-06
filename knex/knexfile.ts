import { DEFAULT as baseConfig } from '../src/config/objection';

module.exports = async () => {
  const config = baseConfig.objection();
  config.migrations = {
    directory: './migrations',
    extension: 'js',
  }
  config.seeds = {
    directory: './seeds',
    extension: 'js',
  };
  return config;
};