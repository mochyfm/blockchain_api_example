import {
  ethers,
  TransactionResponse,
} from "ethers";
import { Message } from "../../types/Types";
import { SMART_CONTRACT as contract }  from "../config/blockchain.config";

/**
 * Sends an encrypted message through the smart contract.
 * @param from Sender's address.
 * @param to Recipient's address.
 * @param message Message to send.
 * @returns Transaction hash.
 */
const sendMessage = async (from: string, to: string, message: string): Promise<string | undefined> => {
  try {
    // Encode the message as bytes32
    const bytes32message = ethers.encodeBytes32String(message);

    // Send transaction to the contract
    const tx: TransactionResponse = await contract.sendMessage(to, bytes32message);

    // Wait for the transaction to be confirmed
    await tx.wait();
    console.log(`Message sent [ From: ${from} to: ${to} ]`);

    return tx.hash;
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

/**
 * Retrieves messages received by an address.
 * @param from Recipient's address.
 * @returns List of formatted messages.
 */
const getMessages = async (from: string): Promise<Message[]> => {
  try {
    // Get messages from the contract
    const messages: any[] = await contract.getMessages(from);
    console.log(messages);

    // Format received messages
    const formattedMessages: Message[] = messages.map(msg => ({
      sender: msg.sender,
      encryptedContent: msg.encryptedContent
    }));
    return formattedMessages;
  } catch (error) {
    console.error("Error getting messages:", error);
    return [];
  }
};

export default { sendMessage, getMessages };
