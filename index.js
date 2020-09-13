const { ApolloServer } = require ('apollo-server');
const { PORT = 4002 }= process.env;
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const { getDataLoaders } = require('./loaders');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
        loaders: getDataLoaders(),
    }),
    introspection: true,
    playground: true,
});


// server.listen(PORT).then(() => console.log('Server running'));
server.listen(PORT).then(({ url }) => console.log(`Server running at ${url}`));


// to run
// query {
//     patient(id: "5") {
//         id
//       name
//         doctors {
//           id
//         name
//         }
//       }
//   }
