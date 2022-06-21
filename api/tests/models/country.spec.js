const { Activity, conn } = require("../../src/db.js");
const { expect } = require("chai");
const { v4 } = require("uuid");

describe("Activity model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Activity.sync({ force: true }));
    describe("name and dificult errors", () => {
      it("should throw an error if name or dificult are null", (done) => {
        Activity.create({})
          .then(() => done(new Error("requierd name and dificult ")))
          .catch(() => done());
      });
      it("should throw an error if title is null", (done) => {
        Activity.create({ name: null, dificult: "3" })
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      // it("should throw an error if name is null")
    });

    describe("Creating activities", () => {
      it("should work when its a valid title and summary", () => {
        Activity.create({
          name: "1234",
          dificult: "3",
        }).then(() => done());
      });

      it("should return the activities created", async () => {
        let temp = await Activity.create({
          id: v4(),
          name: "1234",
          dificult: "3",
          duration: "2 semanas",
          season: "Spring",
        });
        expect(temp.name).to.equal("1234");
        expect(temp.dificult).to.equal("3");
        expect(temp.duration).to.equal("2 semanas");
      });
    });
  });
});
