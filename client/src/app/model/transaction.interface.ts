export interface Transaction {
    amount: number;
    description: string;
    transaction_type: string;
}

export interface PaginatedTransaction {
    data: Array<any>[];
    page: number;
    limit: number;
    totalCount: number;

}
