import {OpenAPIRegistry} from "@asteasolutions/zod-to-openapi";
import express, {type Request, type Response, type Router} from "express";
import {z} from "zod";

import {createApiResponse} from "@/api-docs/openAPIResponseBuilders";
import {ServiceResponse} from "@/common/models/serviceResponse";
import {handleServiceResponse} from "@/common/utils/httpHandlers";
import {featureFlags, GeoCodeContext} from "@/common/featureFlag/openFeature";

export const welcomeRegistry = new OpenAPIRegistry();
export const welcomeRouter: Router = express.Router();

welcomeRegistry.registerPath({
  method: "get",
  path: "/",
  tags: ["Home"],
  responses: createApiResponse(z.null(), "Success"),
});

welcomeRouter.get("/", async (req: Request, res: Response) => {
  const context: GeoCodeContext = {targetingKey: String(req.headers["x-geo"]) ?? ""};

  // Rebranding feature
  const isRebranded = await featureFlags.getBooleanValue("is-rebranded", false, context);
  const serviceResponse = ServiceResponse.success(`Welcome to ${isRebranded ? "Ageras" : "Tellow"}`, null);
  return handleServiceResponse(serviceResponse, res);
});
