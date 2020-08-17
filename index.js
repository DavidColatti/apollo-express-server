const { ApolloServer, gql } = require("apollo-server-express");
const query = require("qs-middleware");
const mongoose = require("mongoose");
const connect = require("connect");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

require("dotenv").config();

const startServer = async () => {
  // Connecting to mongoDb
  const MONGODB_URI = process.env.MONGODB_URI;

  try {
    const res = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `Connected to Mongo! Database name: "${res.connections[0].name}"`
    );
  } catch (err) {
    console.error(`Error connecting to mongo ${err}`);
  }

  // Setting up Apollo Express Server to initialize gql path
  const server = new ApolloServer({ typeDefs, resolvers });

  const app = connect();
  const path = "/graphql";

  app.use(query());
  server.applyMiddleware({ app, path });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
