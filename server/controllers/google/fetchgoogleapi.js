const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const { getValidTokens } = require('../../utills/google.js');

async function fetchGoogleAPI(tokens, url, reqheaders) {
  const newTokens = await getValidTokens(tokens);
  const access_token = newTokens.access_token ? newTokens.access_token : null;
  return await fetch(url, reqheaders);
}

module.exports = {
  fetchGoogleAPI,
};
