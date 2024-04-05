import { Request, Response } from "express";

const getAllContracts = async (req : Request, res : Response) => {
    return res.send({
        statusCode: 200,
        statusMessage: 'Ok',
        message: 'All good',
        data: 'Hola que tal'
    })
};

const getContractsByAddress = () => {};

const getContractsFromOwnerAddress = () => {};

export default {
  getAllContracts,
  getContractsByAddress,
  getContractsFromOwnerAddress,
};
