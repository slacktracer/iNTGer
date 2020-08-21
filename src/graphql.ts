import apolloServerExpress from "apollo-server-express";

import {
  resolvers as emsAgenciesResolvers,
  typeDefs as emsAgenciesTypeDefs,
} from "./graphql/emsAgencies.gql.js";

import {
  resolvers as hospitalsResolvers,
  typeDefs as hospitalsTypeDefs,
} from "./graphql/hospitals.gql.js";

import {
  resolvers as usersResolvers,
  typeDefs as usersTypeDefs,
} from "./graphql/users.gql.js";

import {
  resolvers as trucksResolvers,
  typeDefs as trucksTypeDefs,
} from "./graphql/trucks.gql.js";

const { ApolloServer, gql } = apolloServerExpress;

export const startGraphQL = async ({ application }) => {
  try {
    const baseTypeDefs = gql`
      type Query {
        _empty: String
      }

      schema {
        query: Query
      }
    `;

    const server = new ApolloServer({
      typeDefs: [
        baseTypeDefs,
        emsAgenciesTypeDefs,
        hospitalsTypeDefs,
        trucksTypeDefs,
        usersTypeDefs,
      ],
      resolvers: {
        Query: {
          ...emsAgenciesResolvers.Query,
          ...hospitalsResolvers.Query,
          ...trucksResolvers.Query,
          ...usersResolvers.Query,
        },
        EMSAgency: emsAgenciesResolvers.EMSAgency,
        Hospital: hospitalsResolvers.Hospital,
        Truck: trucksResolvers.Truck,
        User: usersResolvers.User,
      },
    });

    server.applyMiddleware({ app: application });

    console.log(`GraphQLi available at /graphql`);
  } catch (error) {
    console.error(error);
  }
};
