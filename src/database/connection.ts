import mongodb from "mongodb";

import { url } from "./databaseURL.js";

const { MongoClient } = mongodb;

let connection;

const openDatabaseConnection = async () => {
  const client = MongoClient(url.toString(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection = (await client.connect()).db();

  return connection;
};

export const getConnection = async () =>
  connection || (await openDatabaseConnection());
