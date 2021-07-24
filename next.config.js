module.exports = {
  env: {
    CMS_READ: process.env.GRAPHQL_READ_TOKEN,
    CMS_WRITE: process.env.GRAPHQL_WRITE_TOKEN,
    CMS_ENDPOINT: process.env.GRAPHQL_API_ENDPOINT,
    CURRENT_TOKEN: process.env.TOKEN,
  },
}