import swaggerJsdoc from "swagger-jsdoc";
import { API_BASE_URL, API_PORT, ROOT_API_BASE_URL, SWAGGER_URL } from './server.config';

const options : swaggerJsdoc.Options = {
  definition: {
    basePath: ROOT_API_BASE_URL,
    openapi: "3.0.0",
    swagger: `${SWAGGER_URL}`,
    info: {
      title: "API Swagger made on Express",
      version: "1.0.0",
      description: "API Created for a Blockchain Module Example",
      license: {
        name: "MIT License",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "JSONPlaceholder",
        url: "https://jsonplaceholder.typicode.com",
      },
    },
    servers: [
      {
        url: `${API_BASE_URL}:${API_PORT}${ROOT_API_BASE_URL}`,
        description: "Development server",
      },
    ],
  },
  filesPattern: "",
  apis: ["**/*.routes.ts"],
};

export default options;
