/**
 * @fileoverview Test suite for CRUD operations on Bath records.
 * @module crud-baths.test
 * @requires {@link https://www.npmjs.com/package/supertest|supertest}
 * @requires ../src/app
 * @see {@link https://jestjs.io/docs/en/getting-started|Jest Getting Started}
 * @see {@link https://jestjs.io/docs/en/api|Jest API Reference}
 * @see {@link https://www.npmjs.com/package/supertest|supertest}
 */

// Import supertest and the server
const request = require("supertest");
const app = require("../src/app");

let token; // auth token to use for tests
let bathId; // bath id to use for tests
let userId = "65414ffac4528cf7f45f9fa8"; // testUser id to use for tests
let limit = 6; // number of recent baths to get
// bath data to use for tests
const newBathData = {
  author: userId,
  waterTemperature: 1,
  timeInWater: 1,
  temperatureOutside: 1,
  weather: "ensoleillé",
  wind: "leger",
  recoveryTime: 1,
  afterdrop: "modéré",
  globalFeeling: "facile",
  commentary: "It was a refreshing experience.",
};
let invalidBathId = "60f72dbf4d440a001fbb10de"; // invalid bath id to use for tests

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
      username: "testUser",
      password: "testPassword",
    })
    .end((err, response) => {
      if (err) {
        console.error("Erreur d'authentification:", err);
        done(err);
      } else {
        token = response.body.accessToken; // save the token!
        // console.log("Token obtenu:", token);
        done();
      }
    });
});

/**
 * @function describeCreateBath
 * @description Test suite for POST /api/bath endpoint.
 * @test {POST} /api/bath
 */
describe("POST /api/bath", () => {
  /**
   * @description Should create a new bath record.
   */
  it("should create a new bath", async () => {
    const res = await request(app)
      .post("/api/bath")
      .set("Authorization", `Bearer ${token}`)
      .send(newBathData);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty(
      "message",
      "La baignade a correctement été enregistrée."
    );
    expect(res.body).toHaveProperty("bath");
    // test that the bath object contains all the properties we sent
    for (const key in newBathData) {
      expect(res.body.bath[key]).toEqual(newBathData[key]);
    }
    // save the bathId for later use
    bathId = res.body.bath._id;
    // console.log("bathId:", bathId); // debug line
  });
  /**
   * @description should return 400 if required fields are missing
   */
  it("should return 400 if required fields are missing", async () => {
    const incompleteData = {
      author: userId,
      waterTemperature: 1,
      // Missing other required fields
    };
    const res = await request(app)
      .post("/api/bath")
      .set("Authorization", `Bearer ${token}`)
      .send(incompleteData);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "Champs requis manquants.");
  });
  /**
   * @description should return 404 if the user ID does not exist
   */
  it("should return 404 if the user ID does not exist", async () => {
    const InvalidNewBathData = {
      author: "65414ffac4528cf7f45f9fa9",
      waterTemperature: 1,
      timeInWater: 1,
      temperatureOutside: 1,
      weather: "ensoleillé",
    };
    const res = await request(app)
      .post("/api/bath")
      .set("Authorization", `Bearer ${token}`)
      .send(InvalidNewBathData);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message", "Une erreur s'est produite.");
  });
  /**
   * @description should return 401 if the token is missing
   * */
  it("should return 401 if the token is invalid", async () => {
    const res = await request(app)
      .post("/api/bath")
      .set("Authorization", `Bearer someInvalidToken`)
      .send(newBathData);
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("message", "Non autorisé!");
  });
});

/**
 * @function describeModifyBath
 * @description Test suite for PUT /api/bath/:id endpoint.
 * @test {PUT} /api/bath/:id
 */
describe("PUT /api/bath/:id", () => {
  /**
   * @description Should edit an existing bath record.
   */
  const updatedBathData = {
    author: userId,
    waterTemperature: 2,
    timeInWater: 1,
    temperatureOutside: 1,
    weather: "ensoleillé",
    wind: "leger",
    recoveryTime: 1,
    afterdrop: "modéré",
    globalFeeling: "facile",
    commentary: "It was a refreshing experience.",
  };
  it("should edit an existing bath", async () => {
    const res = await request(app)
      .put(`/api/bath/${bathId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedBathData);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Baignade edité !");
    expect(res.body).toHaveProperty("bath");

    for (const key in updatedBathData) {
      expect(res.body.bath[key]).toEqual(updatedBathData[key]);
    }
    expect(res.body.bath.waterTemperature).toEqual(2);
  });
  /**
   * @description should return 404 if the bath ID does not exist
   */
  it("should return 404 if the bath ID does not exist", async () => {
    const invalidBathId = "654168b3ab75733a3611fb35";
    const res = await request(app)
      .put(`/api/bath/${invalidBathId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedBathData);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message", "Une erreur s'est produite.");
  });
  /**
   * @description should return 404 if the user ID does not exist
   */
  it("should return 404 if the user ID does not exist", async () => {
    const invalidUserData = {
      ...updatedBathData,
      author: "65414ffac4528cf7f45f9fa9",
    };
    const res = await request(app)
      .put(`/api/bath/${bathId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(invalidUserData);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message", "Une erreur s'est produite.");
  });
  /**
   * @description should return 400 if required fields are missing
   * */
  it("should return 400 if required fields are missing", async () => {
    const incompleteData = { author: userId }; // Missing other required fields
    const res = await request(app)
      .put(`/api/bath/${bathId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(incompleteData);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "Champs requis manquants.");
  });
});

/**
 * @function describeGetAllBaths
 * @description Test suite for GET /api/bath endpoint.
 * @test {GET} /api/bath
 */
describe("GET /api/bath", () => {
  /**
   * @description Should get all bath records.
   */
  it("should get all bath records", async () => {
    const res = await request(app).get("/api/bath");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
    expect(typeof res.body[0]).toBe("object");
    expect(res.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
});

/**
 * @function describeGetOneBath
 * @description Test suite for GET /api/bath/:id endpoint.
 * @test {GET} /api/bath/:id
 */
describe("GET /api/bath/:id", () => {
  /**
   * @description Should get one bath record by ID.
   */
  it("should get one bath record by ID", async () => {
    const res = await request(app).get(`/api/bath/${bathId}`);
    // console.log("res.body:", res.body); // debug line
    expect(res.statusCode).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body._id).toEqual(bathId);
    expect(res.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  /**
   * @description Should return 400 for invalid bath ID.
   */
  it("should return 400 for invalid bath ID", async () => {
    const res = await request(app).get(`/api/bath/someInvalidId`);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "Une erreur s'est produite.");
  });

  /**
   * @description Should return 404 if bath not found.
   */
  it("should return 404 if bath not found", async () => {
    const res = await request(app).get(`/api/bath/${invalidBathId}`);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message", "Une erreur s'est produite.");
  });
});
/**
 * @function describeGetRecentBaths
 * @description Test suite for GET /api/bath/recent/:limit endpoint.
 * @test {GET} /api/bath/recent/:limit
 */
describe("GET /api/bath/recent/:limit", () => {
  /**
   * @description Should get all recent bath records by limit.
   */
  it("should get all recent bath records by limit", async () => {
    const res = await request(app).get(`/api/bath/recent/${limit}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toEqual(limit);
    expect(res.body.length).toBeGreaterThan(0);
    expect(typeof res.body[0]).toBe("object");
    expect(res.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
  /**
   * @description Should return 400 for missing limit.
   */
  it("should return 400 for missing limit", async () => {
    const res = await request(app).get(`/api/bath/recent/`);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "Une erreur s'est produite.");
  });
  /**
   * @description Should return 400 for invalid limit.
   */
  it("should return 400 for invalid limit", async () => {
    const res = await request(app).get(`/api/bath/recent/someInvalidLimit`);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "Une erreur s'est produite.");
  });
  /**
   * @description Should return 400 for limit !== 6.
   */
  it("should return 400 for limit !== 6", async () => {
    const res = await request(app).get(`/api/bath/recent/7`);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "Une erreur s'est produite.");
  });
});

/**
 * @function describeGetAllBathsByUser
 * @description Test suite for GET /api/bath/user/:userId endpoint.
 * @test {GET} /api/bath/user/:userId
 */
describe("GET /api/bath/user/:userId", () => {
  /**
   * @test {GET} /api/bath/user/:userId
   * @description Should get all bath records by user ID.
   */
  it("should get all bath records by user ID", async () => {
    const res = await request(app).get(`/api/bath/user/${userId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
    expect(typeof res.body[0]).toBe("object");
    expect(res.body[0].author._id).toEqual(userId);
    expect(res.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
  /**
   * @description Should return 400 for invalid user ID format.
   */
  it("should return 400 for invalid user ID format", async () => {
    const res = await request(app).get(`/api/bath/user/someInvalidId`);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "Une erreur s'est produite.");
  });
  /**
   * @description Should return 404 when the user ID does not exist.
   */
  it("should return 404 when the user ID does not exist", async () => {
    const res = await request(app).get(
      `/api/bath/user/65414ffac4528cf7f45f9fa9`
    );
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message", "Une erreur s'est produite.");
  });
});

/**
 * @function describeDeleteBath
 * @description Test suite for DELETE /api/bath/:id endpoint.
 * @test {DELETE} /api/bath/:id
 */
describe("DELETE /api/bath/:id", () => {
  /**
   * @description Should delete an existing bath record.
   */
  it("should delete an existing bath", async () => {
    const res = await request(app)
      .delete(`/api/bath/${bathId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ author: userId });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Baignade supprimé !");
    expect(res.body).toHaveProperty("bath");
    expect(res.body.bath._id).toEqual(bathId);
  });
  /**
   * @description should return 400 if the user ID is not valid
   */
  it("should return 400 if the user ID is not valid", async () => {
    const res = await request(app)
      .delete(`/api/bath/${bathId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ author: "someInvalidId" });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "Une erreur s'est produite.");
  });
  /**
   * @description should return 404 if the user ID does not exist
   */
  it("should return 404 if the user ID does not exist", async () => {
    const res = await request(app)
      .delete(`/api/bath/${bathId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ author: "65414ffac4528cf7f45f9fa9" });

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message", "Une erreur s'est produite.");
  });
  /**
   * @description should return 404 if the bath ID does not exist
   */
  it("should return 404 if the bath ID does not exist", async () => {
    const res = await request(app)
      .delete(`/api/bath/654168b3ab75733a3611fb35`)
      .set("Authorization", `Bearer ${token}`)
      .send({ author: userId });

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message", "Baignade non trouvée.");
  });
});
