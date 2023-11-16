/**
 * @fileoverview Tests for the users route
 * @module users.test
 * @requires supertest
 * @requires app
 * @see https://jestjs.io/docs/en/api
 * @tag users
 */
const request = require("supertest");
const app = require("../src/app"); // Replace with the path to your Express app

const userId = "65552369c3fa7c6102aa6b78";
const invalidUserId = "507f1f77bcf86cd799439011";
/**
 * @function beforeAll
 * @description Run before all tests to authenticate and get a token.
 * @async
 * @returns {Promise} Resolves when the token is obtained.
 * @see {@link https://jestjs.io/docs/en/api#beforeallfn-timeout|Jest beforeAll()}
 */
beforeAll((done) => {
  request(app)
    .post("/api/auth/signin")
    .send({
      username: "AdminUserTest",
      password: "password123",
    })
    .end((err, response) => {
      if (err) {
        console.error("Erreur d'authentification:", err);
        done(err);
      } else {
        token = response.body.accessToken; // save the token!
        console.log("Token obtenu:", token);
        done();
      }
    });
});

/**
 * @description Tests for getting all users
 */
describe("GET /api/users/all", () => {
  // Test for successful retrieval of all users
  it("should fetch all users", async () => {
    const res = await request(app)
      .get("/api/users/all")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    res.body.forEach((user) => {
      expect(user).toHaveProperty("username");
      expect(user).toHaveProperty("roles");
      expect(user).not.toHaveProperty("password");
      expect(user).not.toHaveProperty("confirmationCode");
    });
  });
});

/**
 * @description Tests for getting a single user
 */
describe("GET /api/users/:id", () => {
  // Test for successfully retrieving a user
  it("should fetch a single user by ID", async () => {
    const res = await request(app)
      .get(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id", userId);
    expect(res.body).toHaveProperty("username");
    expect(res.body).toHaveProperty("roles");
    expect(res.body).not.toHaveProperty("password");
    expect(res.body).not.toHaveProperty("confirmationCode");
  });

  // Test for the case when a user is not found
  it("should return a 404 status if the user is not found", async () => {
    const res = await request(app)
      .get(`/api/users/${invalidUserId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message", "Utilisateur non trouvé.");
  });
});

/**
 * @description Tests for updating a user
 */
describe("POST /api/users/update-role/:id", () => {
  /**
   *@description Test for successfully updating a user's role
   */
  it("should update the role of an existing user", async () => {
    const roles = ["admin"];

    const res = await request(app)
      .post(`/api/users/update-role/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ roles });

    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual("Le Role a été mis à jour.");
  });
  /**
   *@description Test for the case when a user is not found
   */
  it("should return a 401 status if the user is not found", async () => {
    const res = await request(app)
      .post(`/api/users/update-role/${invalidUserId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ roles: ["admin"] });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("message", "Utilisateur non trouvé.");
  });
});
