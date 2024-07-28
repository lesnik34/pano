const DotEnv = require('dotenv');

const getEnvironments = () => {
  const ENV = process.env.ENV_MODE || 'dev';
  const result = DotEnv.config({ path: `./env/.env.${ENV}` });

  if (result.error) {
    throw result.error;
  }

  const env = DotEnv.config({ path: `./env/.env.${ENV}` }).parsed;

  const envKeys = Object.keys(env).reduce((prev, next) => {
    // .env.local variables have priority over other .env files
    prev[`process.env.${next.trim()}`] = JSON.stringify(env[next].trim());

    return prev;
  }, {});

  // check things out
  console.log('================================================')
  console.log(`Project starts with env: ${ENV}`);
  console.log('env list:');
  Object.entries(env).forEach(el => console.log(el[0], ' = ', el[1]))
  console.log('================================================')

  return envKeys
}


module.exports = getEnvironments();