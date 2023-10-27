import { ApolloServer } from 'apollo-server-micro';
import { schema } from './schemas';

// const resolvers = {
//   Query: {
//     posts: (_, { first }) => {
//       if (first) {
//         return posts.slice(0, first); // Limit the posts array based on the 'first' argument
//       }
//       return posts; // Return all posts if 'first' argument is not provided
//     },
//   },
// };

const apolloServer = new ApolloServer({
  schema,
  context: async () => {
    // if (!db) {
    //   try {
    //     const dbClient = new MongoClient(process.env.MONGO_DB_URI);
    //     await dbClient.connect();
    //     db = dbClient.db('myluminary_db');
    //   } catch (e) {
    //     console.log('--->error while connecting with graphql context (db)', e);
    //   }
    // }
    // return { db };
    return {context: "context"};
  },
});


export default apolloServer