import { Router } from 'express';
import transactionsController from '../controllers/transactions.controller';

const transactionsRouter : Router = Router();

/**
 * 
 *       HTTP Verbs                                             URL                                 
 * 
 *   GET              http://localhost:8080/enpower/api/{contract_address}/transactions
 *   GET              http://localhost:8080/enpower/api/transactions/{user}    
 *   POST (w/ Body)   http://localhost:8080/enpower/api/transactions?destination={target_address}&contractId=1
 * 
 */

/* GET */

transactionsRouter.route('/transactions').get(transactionsController.getTransactionsFromUser);
// transactionsRouter.route('/transactions/:id').get(transactionsController.getTransactionById);

/* POST */

transactionsRouter.route('/transactions').post(transactionsController.sendMessage);


export default transactionsRouter;