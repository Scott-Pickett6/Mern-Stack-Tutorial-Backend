import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MERN Stack Tutorial",
      version: "1.0.0",
      description: "API documentation for the MERN Stack Tutorial project",
    },
    servers: [
      {
        url: "http://localhost:5400",
      },
    ],
  },
  apis: [path.join(__dirname, "../routes/*.js")],
};
console.log("dirname:", __dirname);
const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
