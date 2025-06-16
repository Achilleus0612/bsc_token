// import config from '../config.json'

export const scanApi = async (method: string, params: string[]) => {
	try {
		// console.log(`${config.scanUrl}/api/service`)
		// const response = await fetch(`${config.scanUrl}/api/service`, {
		// 	body: JSON.stringify({jsonrpc: '2.0', method, params, id: +new Date()}),
		// 	headers: {
		// 		Accept: "application/json",
		// 		"Content-Type": "application/json"
		// 	},
		// 	method: "POST"
		// });
		// const data = await response.json();
		// if (data.result!==undefined) return data.result
		return '';
	} catch (error) {
		console.log('scanApi', error)
	}
	return null
}

