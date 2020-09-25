const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
//const typeDefs = require('./typeDefs');
const {PORT = 4002} = process.env;
//const { ApolloServer } = require('apollo-server');

const server = new ApolloServer({ typeDefs, resolvers });

server
.listen(PORT)
.then(({url}) => console.log(`🚀 server running at ${url}`));
