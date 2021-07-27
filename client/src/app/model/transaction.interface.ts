export interface Transaction {
    amount: number;
    description: string;
    transaction_type: string;
}

export interface PaginatedTransaction {
    data: Array<TransactionData>[];
    page: number;
    limit: number;
    totalCount: number;

}

export interface TransactionData {
    id: number;
    amount_withdrawn: number;
    amount_deposited: number;
    account_balance: number;
    description?: string;
    created_at?: Date;
    updated_at?: Date;
}
