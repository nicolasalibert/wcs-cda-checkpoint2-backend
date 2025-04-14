import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { dataSource } from "./db";
// import {  } from "./resolvers";

async function start() {
  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [],
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000, host: "0.0.0.0" },
  });

  console.log(`🚀  Server ready at: ${url}`);
}
start();
