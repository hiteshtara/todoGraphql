const { GraphQLServer } = require('graphql-yoga');
const axios = require('axios');

const transformResponse = details => ({
  author: details.authors.map(author => author.name),
  isbn: details['isbn_13'],
  title: details.title,
  publishDate: details.publish_date,
});

const typeDefs = `
  type Query {
    book(isbn: String!): Book
  }

  type Book {
    isbn: String
    title: String
    author: [String]
    publishDate: String
  }
`;

const resolvers = {
  Query: {
    book(parent, args) {
      return axios
        .get(
          `https://openlibrary.org/api/books?bibkeys=ISBN:${
            args.isbn
          }&jscmd=details&format=json`
        )
        .then(res => transformResponse(res.data[`ISBN:${args.isbn}`].details))
        .catch(err => console.log(err));
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log('Server is running on localhost:4000'));
