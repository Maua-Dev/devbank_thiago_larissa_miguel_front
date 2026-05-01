import api from "./ApiService.ts";

export type BANKNOTE_VALUES = {
	"2": number;
	"5": number;
	"10": number;
	"20": number;
	"50": number;
	"100": number;
	"200": number;
};

type TransactionResponse = {
    current_balance : number;
    timestamp : number;
}

type TransactionResponseError = {
    "detail" : string
}

export const depositPost = async (
    data: BANKNOTE_VALUES
): Promise<TransactionResponse | TransactionResponseError> => {
	const response = await api.post<TransactionResponse | TransactionResponseError>("/deposit", data);
	window.location.reload();

	return response.data;
};

export const withdrawPost = async (
    data: BANKNOTE_VALUES
): Promise<TransactionResponse | TransactionResponseError> => {
    const response = await api.post<TransactionResponse | TransactionResponseError>("/withdraw", data);
    window.location.reload();

    return response.data;
};

type Transaction = {
    type: string;
    value: number;
    current_balance: number;
    timestamp : number;
};

type AllTransactions = {
    all_transactions: Transaction[];
}

export async function getHistory(): Promise<AllTransactions> {
    const response = await api.get("/history");

    return response.data;
}


