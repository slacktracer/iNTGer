import apolloServerExpress from "apollo-server-express";
import mongodb from "mongodb";

import { getConnection } from "../database/connection.js";

const { gql } = apolloServerExpress;
const { ObjectId } = mongodb;

const connection = await getConnection();

const Hospitals = connection.collection("hospitals");
const Users = connection.collection("users");

export const typeDefs = gql`
  extend type Query {
    hospital(_id: String): Hospital
    hospitals: [Hospital]
  }

  type Hospital {
    _id: String
    addressLine1: String
    addressLine2: String
    administrators: [User]
    city: String
    createdAt: String
    emsAgencies: [EMSAgency]
    latitude: Float
    longitude: Float
    members: [User]
    name: String
    postalCode: String
    state: String
  }
`;

export const resolvers = {
  Query: {
    hospital: (root, { _id }) => Hospitals.findOne(ObjectId(_id)),

    hospitals: (root, { _id }) => Hospitals.find({}).toArray(),
  },

  Hospital: {
    administrators: ({ administrators }) =>
      Users.find({
        _id: { $in: administrators.map(ObjectId) },
      }).toArray(),

    members: ({ members }) =>
      Users.find({
        _id: { $in: members.map(ObjectId) },
      }).toArray(),
  },
};
