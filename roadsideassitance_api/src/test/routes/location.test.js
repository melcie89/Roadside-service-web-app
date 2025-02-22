const request = require("supertest");
const app = require("../../index");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

describe("Location Routes", () => {
  let token;
  let user;

  beforeEach(async () => {
    user = await User.create({
      email: "test@test.com",
      password: "password123",
      firstName: "Test",
      lastName: "User",
    });
    token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  });

  describe("POST /api/location/start", () => {
    it("should start location sharing", async () => {
      const response = await request(app)
        .post("/api/location/start")
        .set("Authorization", `Bearer ${token}`)
        .send({
          roomId: "test-room",
          latitude: 1.234,
          longitude: 4.567,
        });

      expect(response.status).toBe(201);
      expect(response.body.roomId).toBe("test-room");
      expect(response.body.latitude).toBe(1.234);
      expect(response.body.longitude).toBe(4.567);
    });
  });
});
