import { ethers } from "ethers";
import { Request, Response } from "express";
import blockchain from "../services/blockchain.service";

const getTransactionsFromUser = async (req: Request, res: Response) => {
  let response = {
    statusCode: 401,
    message: "",
    messagesFromUser: [{}],
  };

  if (ethers.isAddress(req.query?.from)) {
    try {
      const messageList = await blockchain.getMessages(req.query.from);
      response.messagesFromUser = messageList;
      response.statusCode = 200;
    } catch (error) {
      console.error(error);
      response.statusCode = 500;
      response.message = "Error";
    }
  }
  return res.send(response);
};

const sendMessage = async (req: Request, res: Response) => {
  let response = {
    statusCode: 200,
    message: "",
    transaction: "",
  };

  if (req.body.from && req.body.message && req.body.to) {
    try {
      const transaction = await blockchain.sendMessage(
        req.body.from,
        req.body.to,
        req.body.message
      );
      response.message = `Message sent to ${req.body.to}`;
      if (transaction) {
        response.transaction = transaction;
      }
    } catch (error) {
      console.error(error);
      response.message = "";
    }
  }
  return res.send(response);
};

export default { getTransactionsFromUser, sendMessage };
