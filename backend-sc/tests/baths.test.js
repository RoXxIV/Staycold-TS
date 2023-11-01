/**
 * @fileoverview Test suite for CRUD operations on Bath records.
 * @module crud-baths.test
 * @requires {@link https://www.npmjs.com/package/supertest|supertest}
 * @requires ../server
 * @see {@link https://jestjs.io/docs/en/getting-started|Jest Getting Started}
 * @see {@link https://jestjs.io/docs/en/api|Jest API Reference}
 * @see {@link https://www.npmjs.com/package/supertest|supertest}
 */
const request = require("supertest");
const app = require("../server");
let token; // auth token to use for tests
let bathId; // bath id to use for tests
let userId = "65414ffac4528cf7f45f9fa8"; // testUser id to use for tests
let limit = 1; // number of recent baths to get

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
    In this test, we are verifying the following:
    The status code should be 201 (Created).
    The response should contain a message indicating "Baignade enregistré !".
    The response should contain a bath object.
    The bath object should contain all the properties that were sent in the request.
    The bath object should have an _id property, which is stored for future tests.
 */
describe("POST /api/bath", () => {
  /**
   * @test {POST} /api/bath
   * @description Should create a new bath record.
   */
  it("should create a new bath", async () => {
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
    const res = await request(app)
      .post("/api/bath")
      .set("Authorization", `Bearer ${token}`)
      .send(newBathData);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "Baignade enregistré !");
    expect(res.body).toHaveProperty("bath");
    // test that the bath object contains all the properties we sent
    for (const key in newBathData) {
      expect(res.body.bath[key]).toEqual(newBathData[key]);
    }
    bathId = res.body.bath._id;
    console.log("bathId:", bathId);
  });
});

/**
 * @function describeModifyBath
 * @description Test suite for PUT /api/bath/:id endpoint.
    In this test, we are verifying the following:
    The status code should be 200 (OK).
    The response should contain a message indicating "Baignade edité !".
    The response should contain a bath object.
    The bath object should contain all the updated properties.
    The waterTemperature of the bath object should be updated to 2.
 */
describe("PUT /api/bath/:id", () => {
  /**
   * @test {PUT} /api/bath/:id
   * @description Should edit an existing bath record.
   */
  it("should edit an existing bath", async () => {
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
});

/**
 * @function describeGetAllBaths
 * @description Test suite for GET /api/bath endpoint. 
    In this test, we are verifying the following:
    The status code should be 200 (OK).
    The response should be an array.
    The array should contain at least one object.
    The content-type header should indicate JSON. 
 */
describe("GET /api/bath", () => {
  /**
   * @test {GET} /api/bath
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
    In this test, we are verifying the following:
    The status code should be 200 (OK).
    The response should be an object.
    The _id of the object should match the bathId used for retrieval.
    The content-type header should indicate JSON.
 */
describe("GET /api/bath/:id", () => {
  /**
   * @test {GET} /api/bath/:id
   * @description Should get one bath record by ID.
   */
  it("should get one bath record by ID", async () => {
    const res = await request(app).get(`/api/bath/${bathId}`);
    console.log("res.body:", res.body);
    console.log(bathId);
    expect(res.statusCode).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body._id).toEqual(bathId);
    expect(res.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
});

/**
 * @function describeGetRecentBaths
 * @description Test suite for GET /api/bath/recent/:limit endpoint.
    In this test, we are verifying the following:
    The status code should be 200 (OK).
    The response should be an array.
    The length of the array should match the limit specified.
    The array should contain at least one object.
    The content-type header should indicate JSON.
 */
describe("GET /api/bath/recent/:limit", () => {
  /**
   * @test {GET} /api/bath/recent/:limit
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
});

/**
 * @function describeGetAllBathsByUser
 * @description Test suite for GET /api/bath/user/:userId endpoint.
    In this test, we are verifying the following:
    The status code should be 200 (OK).
    The response should be an array.
    The array should contain at least one object.
    The author._id of the first object should match the userId used for retrieval.
    The content-type header should indicate JSON.
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
});

/**
 * @function describeDeleteBath
 * @description Test suite for DELETE /api/bath/:id endpoint.
    In this test, we would verify the following:
    The status code should be 200 (OK).
    The response should contain a message indicating "Baignade supprimé !".
    The response should contain a bath object.
    The _id of the bath object should match the bathId used for deletion.
 */
describe("DELETE /api/bath/:id", () => {
  /**
   * @test {DELETE} /api/bath/:id
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
});
