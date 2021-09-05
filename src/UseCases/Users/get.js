export default function makeGetUser({ UserDataAccess }) {
  return async function getUser({ ...query } = {}) {
    let usersDb = await UserDataAccess();

    return await usersDb.find({ ...query });
  };
}
