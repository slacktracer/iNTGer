import apolloServerExpress from "apollo-server-express";
import mongodb from "mongodb";

import { getConnection } from "../database/connection.js";

const { gql } = apolloServerExpress;
const { ObjectId } = mongodb;

const connection = await getConnection();

const EMSAgencies = connection.collection("emsAgencies");
const Trucks = connection.collection("trucks");
const Users = connection.collection("users");

export const typeDefs = gql`
  extend type Query {
    emsAgency(_id: String): EMSAgency
    emsAgencies: [EMSAgency]
  }

  type EMSAgency {
    _id: String
    administrators: [User]
    canViewCaseDetails: Boolean
    complaintSet: String
    createdAt: String
    hospitals: [Hospital]
    maxCaseLength: Int
    members: [User]
    name: String
    trucks: [Truck]
  }
`;

export const resolvers = {
  Query: {
    emsAgency: (root, { _id }) => EMSAgencies.findOne(ObjectId(_id)),

    emsAgencies: (root, { _id }) => EMSAgencies.find({}).toArray(),
  },

  EMSAgency: {
    administrators: ({ administrators }) =>
      Users.find({
        _id: { $in: administrators.map(ObjectId) },
      }).toArray(),

    members: ({ members }) =>
      Users.find({
        _id: { $in: members.map(ObjectId) },
      }).toArray(),

    trucks: ({ trucks }) =>
      Trucks.find({
        _id: { $in: trucks.map(ObjectId) },
      }).toArray(),
  },
};
