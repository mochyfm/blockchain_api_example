import { config } from "dotenv";
config();

import express, { Express } from "express";
import helmet from "helmet";
import cors from "cors";
import path from "path";
import { createServer } from "http";
import { ROOT_API_BASE_URL, API_PORT, SWAGGER_URL, API_BASE_URL } from "../config/server.config";
import transactionsRouter from "../routes/transactions.routes";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerOptions from "../config/swagger.config";
import swaggerUiExpress from 'swagger-ui-express';

// Instance of the server
const app: Express = express();
const swaggerUi = swaggerUiExpress;
const specs = swaggerJSDoc(swaggerOptions);

// We disable the x-powered-by and etag feature in order to hide the server type
app.set("x-powered-by", false);
app.set("etag", false);
app.set("date", false)

// ----- Middlewares ----- //

// Protects from web vulnerabilities
app.use(helmet());
// Enables JSOn files lecture
app.use(express.json());
// Allows solicitude methods (PUT, POST)
app.use(express.urlencoded({ extended: true }));
// Allows CORS
app.use(cors());
// Enables the public folder of the server (not used yet)
app.use(express.static(path.join(process.cwd(), "public")));

app.get(ROOT_API_BASE_URL, (req, res) => {
  return res.send({
    error: false,
    message: "Welcome to the EnPower Blockchain Restful CRUD API",
    writen_by: "DST",
    published_on: "http://dstech.it",
    date: `${new Date().getHours()}:${new Date().getMinutes()} - ${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
  });
});


app.use(ROOT_API_BASE_URL, transactionsRouter);

app.use(SWAGGER_URL, swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

const server = createServer(app);

const runServer = () => {
  console.log("Starting server ...");
  server.listen(API_PORT, () => {
    console.log(`Server started on port ${API_BASE_URL}:${API_PORT}`);
  });
};

const stopServer = () => {
    console.log("Stopping server ...");
    server.close();
    console.log('Server stopped. Bye')
}

export { runServer, stopServer }