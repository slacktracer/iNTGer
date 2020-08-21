import apolloServerExpress from "apollo-server-express";
import mongodb from "mongodb";

import { getConnection } from "../database/connection.js";

const { gql } = apolloServerExpress;
const { ObjectId } = mongodb;

const connection = await getConnection();

const EMSAgencies = connection.collection("emsAgencies");
const Trucks = connection.collection("trucks");

export const typeDefs = gql`
  extend type Query {
    truck(_id: String): Truck
    trucks: [Truck]
  }

  type Truck {
    _id: String
    callbackNumber: String
    createdAt: String
    emsAgency: EMSAgency
    name: String
    isALS: Boolean
  }
`;

export const resolvers = {
  Query: {
    truck: (root, { _id }) => Trucks.findOne(ObjectId(_id)),

    trucks: () => Trucks.find({}).toArray(),
  },

  Truck: {
    emsAgency: ({ emsAgency }) => EMSAgencies.findOne(ObjectId(emsAgency)),
  },
};
