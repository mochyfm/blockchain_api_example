import { Router } from 'express';
import transactionsController from '../controllers/transactions.controller';

const transactionsRouter : Router = Router();

/**
 * 
 *       HTTP Verbs                                             URL                                 
 * 
 *   GET              http://localhost:8080/enpower/api/{contract_address}/transactions
 *   GET              http://localhost:8080/enpower/api/transactions?from={user}/{userPrivateKey}  
 *   POST (w/ Body)   http://localhost:8080/enpower/api/transactions?destination={target_address}
 * 
 */

/* GET */

transactionsRouter.route('/inbox/:privateKey/:sender').get(transactionsController.getAllConversations);
transactionsRouter.route('/inbox/:privateKey').get(transactionsController.getAllConversations);


/* POST */

transactionsRouter.route('/new/conversation').post(transactionsController.sendMessage);


export default transactionsRouter;