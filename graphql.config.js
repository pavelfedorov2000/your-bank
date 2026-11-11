// GraphQL Language Server config (autocomplete, validation, go-to-definition inside graphql`` tags).
// Gatsby regenerates the schema and fragments in .cache/typegen on every `gatsby develop`.
// https://www.gatsbyjs.com/docs/how-to/local-development/graphql-typegen/#graphql-intellisense
module.exports = require("./.cache/typegen/graphql.config.json");
