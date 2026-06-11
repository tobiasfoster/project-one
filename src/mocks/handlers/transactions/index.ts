import { singleTransactionHandler } from "./single-transaction"
import { transactionsHandler } from "./transactions"

export const transactionsHandlers = [transactionsHandler, singleTransactionHandler]
