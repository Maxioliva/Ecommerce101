import { ApolloServer } from 'apollo-server-express';
import express from 'express';
// import resolvers from './utils/resolvers';
// import typeDefs from './utils/typeDefs'
// import { IResolvers } from 'graphql-tools';


const app = express();

const typeDefs = `
type Query {
  fede: String
}
type Query {
userId: String
}
`;

const resolvers = {
  Query: {
    fede: () => 'hace fumar culiaaa',
    //   userId: async (userId: string) => {
    //     const q = query(collection(firestore, 'Orders'), where('userId', '==', userId));
    //     const querySnapshot = await getDocs(q);
    //     if (querySnapshot.docs.length && querySnapshot.docs.some(o => !(o.data() as Order).isCompleted)) {
    //       const currentOrder = querySnapshot.docs.find(d => !(d.data() as Order).isCompleted);
    //       return currentOrder?.data() as Omit<Order, 'id' | 'userId' | 'isCompleted'>;
    //     }
    //     return { products: [] as Product[] };
    //   };
  },

 
};


const server =  new ApolloServer({ typeDefs, resolvers });
server.start().then(res => {
  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () =>
    console.log('nice')
  )
 })