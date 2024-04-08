import { Contract, ethers, Interface, JsonRpcProvider, Wallet } from "ethers";

// Address of the smart contract on the Ethereum network
export const CONTRACT_ADDRESS: string =
  process.env.CONTRACT_ADDRESS || "0x2958085fb7e60Eca495fcF8741C29B4a98ee811D";

// The name of the methods of the Smart Contract
export const SEND_MESSAGE = "sendMessage";
export const GET_MESSAGES = "getMessages";
export const GET_MESSAGE_WITH_FILTER = "getMessagesWithFilter";

// Address of the provider for connecting into the Ethereum network
export const PROVIDER_ADDRESS =
  process.env.PROVIDER_ADDRESS || "http://127.0.0.1:7545/";
// Address of the account on the Ethereum network that signed the contract

// ABI interface of the smart contract
export const CONTRACT_ABI: Interface = new ethers.Interface([
  {
    inputs: [],
    name: "getAllConversations",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "address",
            name: "receiver",
            type: "address",
          },
          {
            internalType: "string",
            name: "content",
            type: "string",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
      {
        internalType: "string",
        name: "_encryptedContent",
        type: "string",
      },
    ],
    name: "sendMessage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
]);

// JSON-RPC provider for connecting to the local Ethereum network
export const PROVIDER: JsonRpcProvider = new ethers.JsonRpcProvider(
  PROVIDER_ADDRESS
);

export const CURRENT_SIGNER = PROVIDER.getSigner();

export const newProviderSigned = (
  signature: string,
  provider: string = PROVIDER_ADDRESS
) => {
  console.log(signature, provider);
  return new ethers.JsonRpcProvider(provider, signature);
};

// Contract object to interact with the smart contract
export const SMART_CONTRACT = new ethers.Contract(
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
  PROVIDER
);
