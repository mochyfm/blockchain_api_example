import { ethers, Interface, JsonRpcProvider } from "ethers";

// Address of the smart contract on the Ethereum network
const CONTRACT_ADDRESS: string = process.env.CONTRACT_ADDRESS || "0xE05b5eAD574B87Bd61b5cA16cA8068d41250550E";
// Address of the provider for connecting into the Ethereum network
const PROVIDER_ADDRESS =
  process.env.PROVIDER_ADDRESS || "http://127.0.0.1:7545/";
// Address of the account on the Ethereum network that signed the contract
const SIGNER_ADDRESS =
  process.env.SIGNER_ADDRESS ||
  "0xa29a80c7c040c5dac55e945d830c6a3b8143ab29c4f01617cebde6fe2e039ffc";

// ABI interface of the smart contract
const ABI: Interface = new ethers.Interface([
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
]);

// JSON-RPC provider for connecting to the local Ethereum network
const PROVIDER_INSTANCE: JsonRpcProvider = new ethers.JsonRpcProvider(
  PROVIDER_ADDRESS
);

// Creating a Wallet object to sign transactions
const SIGNER_INSTANCE: ethers.Wallet = new ethers.Wallet(
  SIGNER_ADDRESS,
  PROVIDER_INSTANCE
);

// Contract object to interact with the smart contract
export const SMART_CONTRACT = new ethers.Contract(
  CONTRACT_ADDRESS,
  ABI,
  SIGNER_INSTANCE
);
