import API from "../service/ApiService";

export interface User {
    name : string;
	agency : string;
	account : string;
	current_balance : number;
}

export default async function getUser():Promise<User> {
	const response = await API.get("/");
	return response.data
}