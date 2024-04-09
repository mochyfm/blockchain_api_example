import { ethers, TransactionReceipt } from "ethers";
import {
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
  PROVIDER,
  SEND_MESSAGE,
  SMART_CONTRACT,
} from "../config/blockchain.config";
import { Message } from "../../types/Types";

/**
 * Sends an encrypted message through the smart contract.
 * @param from Sender's address.
 * @param to Recipient's address.
 * @param message Message to send.
 * @returns Transaction hash.
 */
const sendMessage = async (
  fromSignature: string,
  to: string,
  message: string
): Promise<TransactionReceipt | null> => {
  try {
    console.log(
      "Who is creating the transaction?: ",
      `
      {
        Address: ${fromSignature},
        To: ${to}
      }
    `
    );

    const wallet = new ethers.Wallet(fromSignature, PROVIDER);
    const bytes32message = ethers.encodeBytes32String(message);
    console.log("Message: ", bytes32message);
    // Codificar los parámetros de la función
    const txData = SMART_CONTRACT.interface.encodeFunctionData(SEND_MESSAGE, [
      to,
      bytes32message,
    ]);
    // Enviar la transacción a la red Ethereum
    const txResponse = await wallet.sendTransaction({
      to: SMART_CONTRACT.getAddress(),
      data: txData,
    });
    console.log("Transaction sent:", txResponse.hash);
    const txToReturn = txResponse.wait();
    return txToReturn;
  } catch (error) {
    console.error("Error sending message:", error);
    return null;
  }
};

/**
 * Retrieves all the conversations of a user, that can or not be filtered by the user sender.
 * @param privateKey privateKey from who is asking for its conversation.
 * @param senderToFilter Recipient's address.
 * @returns The clean list of conversations.
 */
const getAllMessages = async (privateKey: string, senderToFilter?: string) => {
  try {
    const wallet = new ethers.Wallet(privateKey, PROVIDER);
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      wallet
    );

    console.log(`{ SignerKey: ${privateKey.substring(0, 6)}... }`);
    const messages = await contract.getAllConversations();

    console.log(messages);

    // Descifrar los mensajes antes de mostrarlos al usuario
    const decryptedMessages = messages.map((message: Message) => {
      return {
        sender: wallet.address === message.sender ? "Me" : message.sender,
        reciever: wallet.address === message.receiver ? "Me" : message.receiver,
        content: ethers.decodeBytes32String(message.content),
      };
    });

    if (senderToFilter) {
      return decryptedMessages.filter(( message : Message) => message.sender === senderToFilter);
    }
    return decryptedMessages;
  } catch (error) {
    console.error("Error retrieving messages:", error);
    throw error;
  }
};

export default { sendMessage, getAllMessages };
