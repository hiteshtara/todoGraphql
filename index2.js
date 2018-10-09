const { GraphQLServer } = require('graphql-yoga');

const typeDefs = `
type Query {
  book(id: ID!): Book
}

type Book {
  id: ID
  title: String
  author: String
  publishYear: Int
}
`;

const resolvers = {
  Query: {
    book(parent, args) {
      return [
        {
          id: '1234',
          author: 'George Orwell',
          title: '1984',
          publishYear: 1949,
        },
        {
          id: '5678',
          author: 'Ray Bradbury',
          title: 'Fahrenheit 451',
          publishYear: 1953,
        },
      ].find(book => book.id === args.id);
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log('Server is running on localhost:4000'));
