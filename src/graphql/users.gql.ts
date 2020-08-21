import apolloServerExpress from "apollo-server-express";
import mongodb from "mongodb";

import { getConnection } from "../database/connection.js";

const { gql } = apolloServerExpress;
const { ObjectId } = mongodb;

const connection = await getConnection();

const EMSAgencies = connection.collection("emsAgencies");
const Hospitals = connection.collection("hospitals");
const Users = connection.collection("users");

export const typeDefs = gql`
  extend type Query {
    user(_id: String): User
    users: [User]
  }

  type User {
    _id: String
    createdAt: String
    disabled: Boolean
    displayName: String
    displayNameReverse: String
    email: String
    firstName: String
    lastName: String
    emsAgencyMemberships: [EMSAgency]
    emsAgenciesAdministered: [EMSAgency]
    hospitalMemberships: [Hospital]
    hospitals: [Hospital]
    hospitalsAdministered: [Hospital]
    isAdmin: Boolean
    profileImageURL: String
    roles: [String]
    username: String
  }
`;

export const resolvers = {
  Query: {
    user: (root, { _id }) => Users.findOne(ObjectId(_id)),

    users: () => Users.find({}).toArray(),
  },

  User: {
    emsAgenciesAdministered: ({ emsAgenciesAdministered }) =>
      EMSAgencies.find({
        _id: { $in: emsAgenciesAdministered },
      }).toArray(),

    emsAgencyMemberships: ({ emsAgencyMemberships }) =>
      EMSAgencies.find({
        _id: { $in: emsAgencyMemberships },
      }).toArray(),

    hospitalsAdministered: ({ hospitalsAdministered }) =>
      Hospitals.find({
        _id: { $in: hospitalsAdministered },
      }).toArray(),

    hospitalMemberships: ({ hospitalMemberships }) =>
      Hospitals.find({
        _id: { $in: hospitalMemberships },
      }).toArray(),
  },
};
