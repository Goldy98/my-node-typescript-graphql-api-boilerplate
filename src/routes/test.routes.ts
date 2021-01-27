import express from "express";
import { sayHello } from "../graphql/test/queries";
import { writeJsonResponse } from "../helpers/web-server-helpers";

export const testRouter = express.Router();

testRouter.get("/", (req, res) => {
  const result = sayHello();
  writeJsonResponse(res, 200, result);
});

export default testRouter;
