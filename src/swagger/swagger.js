import { LoginSwagger } from "./login-swagger.js";
import { RegisterSwagger } from "./register-swagger.js";
import { AuthenticateSwagger } from "./authenticate-swagger.js";

export const swaggerDocument = {
  openapi: "3.0.1",
  info: {
    version: "1.0.0",
    title: "Blessed App API Document",
    description:
      "Blessed App API Document. These APIs are useful to get data for the app.",
    termsOfService: "",
    contact: {
      name: "Blessed",
      url: "https://blessed.com",
    },
  },
  components: {
    schemas: {
      reqParameter: {
        type: "object",
        properties: {
          email: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  paths: {
    "/api/login": {
      post: LoginSwagger,
    },
    "/api/register": {
      post: RegisterSwagger,
    },
    "/api/authenticate": {
      post: AuthenticateSwagger,
    },
  },
};
