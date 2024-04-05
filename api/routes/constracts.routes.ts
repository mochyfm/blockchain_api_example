import { Router } from 'express';
import contractsController from '../controllers/contracts.controller';

const contractsRouter : Router = Router();

/**
 * 
 * HTTP Verbs                           URL                                 
 * 
 * GET              http://localhost:8080/enpower/api/contracts
 * GET              http://localhost:8080/enpower/api/contracts/{address}   
 * GET              http://localhost:8080/enpower/api/contracts/{owner_address} 
 * 
 */

/* GET */


contractsRouter.route('/contracts').get(contractsController.getAllContracts);
contractsRouter.route('/contracts/:address').get(contractsController.getContractsByAddress);
contractsRouter.route('/contracts/:owner').get(contractsController.getContractsFromOwnerAddress);



export default contractsRouter;