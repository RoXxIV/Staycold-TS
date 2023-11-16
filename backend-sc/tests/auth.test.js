/**
 * @fileoverview Test suite for Auth operations.
 * @module auth.test
 * @requires {@link https://www.npmjs.com/package/supertest|supertest}
 * @requires ../src/app
 * @see {@link https://jestjs.io/docs/en/getting-started|Jest Getting Started}
 * @see {@link https://jestjs.io/docs/en/api|Jest API Reference}
 * @see {@link https://www.npmjs.com/package/supertest|supertest}
 */

// Import dependencies
const request = require("supertest");
const app = require("../src/app");

// Import the User model
const User = require("../src/models/user.model");

// Test data
const userSignup = {
  username: "newerUserTest",
  email: "newerusertest@example.com",
  password: "password123",
  roles: ["user"],
};
const userSignin = {
  username: "userTest",
  password: "password123",
};
const userAdmin = {
  username: "AdminUserTest",
  password: "password123",
};
let deletedUserId;

/**
 * @description Test the signup process.
 * @function describeSignup
 * @test {POST /api/auth/signup}
 */
describe("POST /api/auth/signup", () => {
  /**
   * @description Test the signup process with correct credentials.
   */
  it("should create a new user and send a confirmation email", async () => {
    const res = await request(app).post("/api/auth/signup").send(userSignup);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual(
      "L'utilisateur a été enregistré avec succès! merci de vérifier votre email"
    );

    // Save the user ID for later use
    deletedUserId = res.body.id;

    // Check if the user is added to the database
    const user = await User.findOne({ email: userSignup.email });

    expect(user).not.toBeNull();
    expect(user.username).toBe(userSignup.username);
    expect(user.email).toBe(userSignup.email);
  });

  /**
   * @description Test the signup process with an invalid email.
   */
  it("should return a validation error for invalid email", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        username: "newerUserTestEmail",
        email: "newerusertestemailexample.com",
        password: "password123",
        roles: ["user"],
      });

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("errors");
    expect(
      res.body.errors.some((error) => error.path === "email")
    ).toBeTruthy();
  });

  /**
   * @description Test the signup process with a short password.
   */
  it("should return a validation error for short password", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        username: "newerUserTestPass",
        email: "newerusertestpass@example.com",
        password: "pa",
        roles: ["user"],
      });

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("errors");
    expect(
      res.body.errors.some((error) => error.path === "password")
    ).toBeTruthy();
  });

  /**
   * @description Test the signup process with an invalid username.
   */
  it("should return a validation error for short password", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        username: "ne",
        email: "newerusertestusername@example.com",
        password: "password123",
        roles: ["user"],
      });

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("errors");
    expect(
      res.body.errors.some((error) => error.path === "username")
    ).toBeTruthy();
  });
});

/**
 * @description Test the signin process with correct credentials.
 * @function describeSignin
 * @test {POST /api/auth/signin}
 */
describe("POST /api/auth/signin", () => {
  it("should signin a user with correct credentials", async () => {
    const res = await request(app).post("/api/auth/signin").send({
      username: userSignin.username,
      password: userSignin.password,
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("accessToken");
  });

  /**
   * @description Test the signin process with incorrect username.
   */
  it("should return a 404 error if the user is not found", async () => {
    const res = await request(app).post("/api/auth/signin").send({
      username: "unknownUser",
      password: "testPassword",
    });

    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual("Utilisateur non trouvé.");
  });

  /**
   * @description Test the signin process with incorrect password.
   */
  it("should return 401 if password is incorrect", async () => {
    const res = await request(app).post("/api/auth/signin").send({
      username: userSignin.username,
      password: "wrongPassword",
    });

    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual("Mot de passe incorrect!");
  });
  /**
   * @description Test the signin process with an inactive account.
   */
  it("should return 403 if account is not active", async () => {
    const res = await request(app).post("/api/auth/signin").send({
      username: userSignup.username,
      password: userSignup.password,
    });

    expect(res.statusCode).toEqual(403);
    expect(res.body.message).toEqual(
      "Veuillez vérifier votre email pour activer votre compte!"
    );
  });

  /**
   * @description Test the signin process with an invalid request.
   */
  it("should handle internal server errors", async () => {
    // Simulate a server error, for example by sending an invalid request
    const res = await request(app).post("/api/auth/signin").send({
      username: userSignin.username,
      // ... Omitting password to trigger an error in the controller
    });

    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toBeDefined();
    expect(res.body).toHaveProperty("message", "Erreur interne du serveur.");
  });
});

/**
 * @description Test the user deletion process.
 * @function describeDeleteUser
 * @test {DELETE /api/users/:id}
 */
describe("DELETE /api/users/:id", () => {
  it("should delete the created user", async () => {
    // auth as admin and get the token
    const logAdmin = await request(app).post("/api/auth/signin").send({
      username: userAdmin.username,
      password: userAdmin.password,
    });
    const adminToken = logAdmin.body.accessToken;

    // Delete the user
    const res = await request(app)
      .delete(`/api/users/${deletedUserId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual(
      "L'utilisateur et les baignades associés ont bien été supprimé !"
    );
  });
});
