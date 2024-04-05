import {
  AddressLike,
  ethers,
  InterfaceAbi,
  JsonRpcProvider,
  TransactionResponse,
} from "ethers";
import { Message } from "../../types/Types";

const provider: JsonRpcProvider = new ethers.JsonRpcProvider(
  "http://127.0.0.1:8545/"
);

const signer: ethers.Wallet = new ethers.Wallet('0x28f37fd3063fb4ecbfe3fd6481c590e193ef9c61f298ff71b9a96f595e2c37b4', provider);
const contractAddress: string = "0x2578ABC806f022802b4A00cE68543B62F51a67C7";
const abi: InterfaceAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "_encryptedContent",
        type: "bytes32",
      },
    ],
    name: "sendMessage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_sender",
        type: "address",
      },
    ],
    name: "getMessages",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "encryptedContent",
            type: "bytes32",
          },
        ],
        internalType: "struct SecureMessaging.Message[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const contract = new ethers.Contract(contractAddress, abi, signer);

const sendMessage = async (from: string, to: string, message: string) => {
  try {
    
    // Encode to Bytes32
    const bytes32message = ethers.encodeBytes32String(message);

    // Sending the transaction
    const tx : TransactionResponse = await contract.sendMessage(to, bytes32message);

    // Waiting for the transaction to be submited
    await tx.wait();
    console.log(`Message sended [ From: ${from} to: ${to} ]`);

    return tx.hash;
  } catch (error) {
    console.error("Error al enviar el mensaje:", error);
  }
};

const getMessages = async (from: string) => {
    const messages: any[] = await contract.getMessages(from);
    console.log(messages);
    const formattedMessages: Message[] = messages.map(msg => ({
      sender: msg.sender,
      encryptedContent: msg.encryptedContent
    }));
    return formattedMessages;
};

export default { sendMessage, getMessages };
