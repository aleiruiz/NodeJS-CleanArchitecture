import axios from "axios";
import usersDb, { makeDb } from "../src/DataAccess";
import makeFakeUser from "./fixtures/entities/user";
import dotenv from "dotenv";
dotenv.config();

describe("User API", () => {
  beforeAll(() => {
    axios.defaults.baseURL = process.env.BASE_URL + process.env.API_ROOT;
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.validateStatus = function (status) {
      // Throw only if the status code is greater than or equal to 500
      return status < 500;
    };
  });
  afterAll(async () => {
    const db = await makeDb();
    return db.collection("users").drop();
  });

  describe("adding users", () => {
    // Content moderator API only allows 1 request per second.
    beforeEach((done) => setTimeout(() => done(), 1100));
    it("adds a user to the database", async () => {
      const response = await axios.post(
        "/users/",
        makeFakeUser({
          id: undefined,
          text: "Something safe and intelligible.",
        })
      );
      expect(response.status).toBe(201);
      const { posted } = response.data;
      const doc = await usersDb.findById(posted);
      expect(doc).toEqual(posted);
      expect(doc.published).toBe(true);
      return usersDb.remove(posted);
    });
    it("requires user to contain an author", async () => {
      const response = await axios.post(
        "/users",
        makeFakeUser({ id: undefined, author: undefined })
      );
      expect(response.status).toBe(400);
      expect(response.data.error).toBeDefined();
    });
    it("requires user to contain text", async () => {
      const response = await axios.post(
        "/users",
        makeFakeUser({ id: undefined, text: undefined })
      );
      expect(response.status).toBe(400);
      expect(response.data.error).toBeDefined();
    });
    it("requires user to contain a valid id", async () => {
      const response = await axios.post(
        "/users",
        makeFakeUser({ id: undefined })
      );
      expect(response.status).toBe(400);
      expect(response.data.error).toBeDefined();
    });
    it("scrubs malicious content", async () => {
      const response = await axios.post(
        "/users",
        makeFakeUser({
          id: undefined,
          text: "<script>attack!</script><p>hello!</p>",
        })
      );
      expect(response.status).toBe(201);
      expect(response.data.posted.text).toBe("<p>hello!</p>");
      return usersDb.remove(response.data.posted);
    });
  });
  describe("modfying users", () => {
    // Content moderator API only allows 1 request per second.
    beforeEach((done) => setTimeout(() => done(), 1100));
    it("modifies a user", async () => {
      const user = makeFakeUser({
        text: "<p>changed!</p>",
      });
      await usersDb.insert(user);
      const response = await axios.patch(`/users/${user.id}`, user);
      expect(response.status).toBe(200);
      expect(response.data.patched.text).toBe("<p>changed!</p>");
      return usersDb.remove(user);
    });
    it("scrubs malicious content", async () => {
      const user = makeFakeUser({
        text: "<script>attack!</script><p>hello!</p>",
      });
      await usersDb.insert(user);
      const response = await axios.patch(`/users/${user.id}`, user);
      expect(response.status).toBe(200);
      expect(response.data.patched.text).toBe("<p>hello!</p>");
      return usersDb.remove(user);
    });
  });
  describe("listing users", () => {
    it("lists users for a post", async () => {
      const user1 = makeFakeUser({ replyToId: null });
      const user2 = makeFakeUser({
        postId: user1.postId,
        replyToId: null,
      });
      const users = [user1, user2];
      const inserts = await Promise.all(users.map(usersDb.insert));
      const expected = [
        {
          ...user1,
          replies: [],
          createdOn: inserts[0].createdOn,
        },
        {
          ...user2,
          replies: [],
          createdOn: inserts[1].createdOn,
        },
      ];
      const response = await axios.get("/users/", {
        params: { postId: user1.postId },
      });
      expect(response.data).toContainEqual(expected[0]);
      expect(response.data).toContainEqual(expected[1]);
      return users.map(usersDb.remove);
    });
    it("threads users", async (done) => {
      const user1 = makeFakeUser({ replyToId: null });
      const reply1 = makeFakeUser({
        postId: user1.postId,
        replyToId: user1.id,
      });
      const reply2 = makeFakeUser({
        postId: user1.postId,
        replyToId: reply1.id,
      });
      const user2 = makeFakeUser({
        postId: user1.postId,
        replyToId: null,
      });
      const users = [user1, reply1, reply2, user2];
      const inserts = await Promise.all(users.map(usersDb.insert));
      const expected = [
        {
          ...user1,
          replies: [
            {
              ...reply1,
              createdOn: inserts[1].createdOn,
              replies: [
                {
                  ...reply2,
                  createdOn: inserts[2].createdOn,
                  replies: [],
                },
              ],
            },
          ],
          createdOn: inserts[0].createdOn,
        },
        {
          ...user2,
          replies: [],
          createdOn: inserts[3].createdOn,
        },
      ];
      const response = await axios.get("/users/", {
        params: { postId: user1.postId },
      });
      // FIXME: Fix flake. Why timeout? Mongo or promise?
      setTimeout(async () => {
        expect(response.data[0].replies.length).toBe(1);
        expect(response.data[0].replies[0].replies.length).toBe(1);
        expect(response.data).toContainEqual(expected[1]);
        expect(response.data).toContainEqual(expected[0]);
        done();
      }, 1100);
    });
  });
  describe("deleting users", () => {
    it("hard deletes", async () => {
      const user = makeFakeUser();
      await usersDb.insert(user);
      const result = await axios.delete(`/users/${user.id}`);
      expect(result.data.deleted.deletedCount).toBe(1);
      expect(result.data.deleted.softDelete).toBe(false);
    });
    it("soft deletes", async () => {
      const user = makeFakeUser();
      const reply = makeFakeUser({ replyToId: user.id });
      await usersDb.insert(user);
      await usersDb.insert(reply);
      const result = await axios.delete(`/users/${user.id}`);
      expect(result.data.deleted.deletedCount).toBe(1);
      expect(result.data.deleted.softDelete).toBe(true);
    });
  });
});
