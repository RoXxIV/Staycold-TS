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
let token;
let bathId;

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
 * @function describe.createBath
 * @description Test suite for POST /api/bath endpoint.
 */
describe("POST /api/bath", () => {
  /**
   * @test {POST} /api/bath
   * @description Should create a new bath record.
   */
  it("should create a new bath", async () => {
    const newBathData = {
      author: "65414ffac4528cf7f45f9fa8",
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
 * @function describe.modifyBath
 * @description Test suite for PUT /api/bath/:id endpoint.
 */
describe("PUT /api/bath/:id", () => {
  /**
   * @test {PUT} /api/bath/:id
   * @description Should edit an existing bath record.
   */
  it("should edit an existing bath", async () => {
    const updatedBathData = {
      author: "65414ffac4528cf7f45f9fa8",
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
 * @function describe.deleteBath
 * @description Test suite for DELETE /api/bath/:id endpoint.
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
      .send({ author: "65414ffac4528cf7f45f9fa8" });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Baignade supprimé !");
    expect(res.body).toHaveProperty("bath");
    expect(res.body.bath._id).toEqual(bathId);
  });
});
