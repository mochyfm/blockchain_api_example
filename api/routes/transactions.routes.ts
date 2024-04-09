import { Router } from "express";
import transactionsController from "../controllers/transactions.controller";

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       required:
 *         - sender
 *         - receiver
 *         - message
 *       properties:
 *         sender:
 *           type: Address
 *           description: The sender address
 *         receiver:
 *           type: Address
 *           description: The receiver address
 *         message:
 *           type: string
 *           description: The message that will be sent
 *       example:
 *         sender: "0xA1F4282fd0E8fEc7a3E77b7d183f8781C3C878e6"
 *         receiver: "0x541d0b4759D4DbCb63fdEEc196945f6d08bd65A9"
 *         message: Hello Mate!, how are you doing?
 */

const transactionsRouter: Router = Router();

/**
 *
 *       HTTP Verbs                                             URL                                                     WHAT DOES IT DO
 *
 *   GET              http://localhost:8080/enpower/api/transactions/create                       Gets all the conversations
 *   GET              http://localhost:8080/enpower/api/transactions={userPrivateKey}/{user}      Gets all the conversations with a specific user
 *   POST (w/ Body)   http://localhost:8080/enpower/api/transactions?from={userPrivateKey}        Sends a message to a user
 *
 */

/**
 * @swagger
 * /inbox/{privateKey}:
 *   get:
 *     summary: Retrieve all conversations from a user
 *     produces:
 *        - application/json
 *     parameters:
 *        - in: path
 *          name: privateKey
 *          description: The private key of the user
 *     responses:
 *       200:
 *         description: A list of messages
 */
transactionsRouter
  .route("/inbox/:privateKey")
  .get(transactionsController.getAllConversations);

/**
 * @swagger
 * /inbox/{privateKey}/{sender}:
 *   get:
 *     summary: Retrieve all conversations from a user but with a filter
 *     produces:
 *        - application/json
 *     parameters:
 *        - in: path
 *          name: privateKey
 *          description: The private key of the user
 *        - in: path
 *          name: sender
 *          description: The address of the sender
 *     responses:
 *       200:
 *         description: A list of messages
 */
transactionsRouter
  .route("/inbox/:privateKey/:sender")
  .get(transactionsController.getAllConversations);

/**
 * @swagger
 * /new/conversation:
 *   post:
 *     summary: Sends a message to a pointed Address in the body
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *         description: The privateKey of the message sender
 *         default: "0x89ffe12be0cee7daaceb8c90d48a0641add1cd82b67d1185383ad50ec19c5c3c"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *                 description: The address to send the message to
 *                 default: "0x541d0b4759D4DbCb63fdEEc196945f6d08bd65A9"
 *               message:
 *                 type: string
 *                 description: The message to send
 *                 default: "Hey dude!, how are you?"
 *     responses:
 *       200:
 *         description: Returns the transaction.
 */
transactionsRouter
  .route("/new/conversation")
  .post(transactionsController.sendMessage);

export default transactionsRouter;
