const request = require("supertest");
const app = require("../../index");
const User = require("../../models/User");

describe("Auth Controller", () => {
  describe("POST /api/v1/auth/register", () => {
    it("should register a new user", async () => {
      const response = await request(app).post("/api/v1/auth/register").send({
        email: "test@test.com",
        password: "password123",
        firstName: "Test",
        lastName: "User",
      });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("User registered successfully");
    });

    it("should not register user with existing email", async () => {
      await User.create({
        email: "test@test.com",
        password: "password123",
        firstName: "Test",
        lastName: "User",
      });

      const response = await request(app).post("/api/v1/auth/register").send({
        email: "test@test.com",
        password: "password123",
        firstName: "Test",
        lastName: "User",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Email already in use");
    });
  });

  describe("POST /api/v1/auth/login", () => {
    beforeEach(async () => {
      await User.create({
        email: "test@test.com",
        password: "password123",
        firstName: "Test",
        lastName: "User",
      });
    });

    it("should login user with valid credentials", async () => {
      const response = await request(app).post("/api/v1/auth/login").send({
        email: "test@test.com",
        password: "password123",
      });

      expect(response.status).toBe(200);
      expect(response.body.accessToken).toBeDefined();
      expect(response.body.refreshToken).toBeDefined();
    });
  });
});
