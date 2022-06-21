/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { v4 } = require("uuid");
const { Country, Activity, conn } = require("../../src/db.js");

const agent = session(app);
const activiti = {
  id: v4(),
  name: "1234",
  dificult: "3",
  duration: "2 semanas",
  season: "Spring",
};
describe("Activities routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Activity.sync({ force: true }).then(() => Activity.create(activiti))
  );
  afterEach(() => {
    Activity.sync({ force: true });
  });
  describe("GET /activity", () => {
    it("should get 200", () => agent.get("/activity").expect(200));
  });

  describe("GET /countries", () => {
    it("debe retornar 200", () => agent.get("/countries").expect(200));
  });

  describe("GET /activity/:idActivity", function () {
    it("responde con 200 cuando la diga páginas existe", function () {
      let activiti = Activity.create({
        id: v4(),
        name: "1234",
        dificult: "3",
        duration: "2 semanas",
        season: "Spring",
      }).then(() => {
        return agent.get("/activity/" + activiti.id).expect(200);
      });
    });
    it("responde con 404 cuando la página no existe", function () {
      return agent.get("/activity/pp").expect(404);
    });
  });
});
