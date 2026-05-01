import api from "./api";

export default async function getUser() {
	const response = await api.get("/");

	const { name, agency, account, current_balance } = response.data;

	return {
		name,
		agency,
		account,
		current_balance,
	};
}