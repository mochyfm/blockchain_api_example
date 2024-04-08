import { ethers } from "ethers";
import { Request, Response } from "express";
import blockchain from "../services/blockchain.service";

const getAllConversations = async (req: Request, res: Response) => {
  let response = {
    statusCode: 401,
    note: "",
    messagesFromUser: [{}],
  };

  const privateKey = req.params.privateKey;
  const sender = req.params.sender;

  console.log("Who is checking the mailbox?: ", privateKey);

  if (privateKey) {
    try {

      const messagesFilteredByUser = await blockchain.getAllMessages(privateKey, sender);
      response.messagesFromUser = messagesFilteredByUser

    } catch (error) {
      console.error(error);
      response.statusCode = 500;
      response.note = "Error";
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

  
  const fromSignature = (typeof req.query.from === 'string') ? req.query.from : null;
  const addressTo = req.body.to;
  const message = req.body.message;

  if (message && addressTo && fromSignature) {
    try {
      console.log(`
      {
        from: ${fromSignature},
        to: ${addressTo},
        message: ${message}
      }`);

      // const realSignature = new ethers.Wallet(signature);
      const transaction = await blockchain.sendMessage(
        fromSignature,
        addressTo,
        message,
      );

      response.message = `Message sent to ${addressTo}`;
      // if (transaction) {
      //   response.transaction = transaction;
      // }
    } catch (error) {
      console.error(error);
      response.message = "Could not send the message";
    }
  }
  return res.send(response);
};

export default { getAllConversations, sendMessage };
