import User from "./User";
import Generics from "./Generics";
import mongodb from "mongodb";

const MongoClient = mongodb.MongoClient;
const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connectToDB = async () => {
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db(dbName);
};
const generics = async () => await Generics({ connectToDB });

const UserDataAccess = async () => {
  const dataAccess = await generics();
  return await User({ dataAccess });
};

export { UserDataAccess, connectToDB, generics };
