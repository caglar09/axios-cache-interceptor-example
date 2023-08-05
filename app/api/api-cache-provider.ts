import AxiosProvider from "axios";
import { setupCache, buildKeyGenerator, buildStorage } from "axios-cache-interceptor/dev";

import { ENV } from "../config";
import { StorageOperations } from "../utils";

AxiosProvider.defaults.headers["Content-Type"] = "application/json";
AxiosProvider.defaults.baseURL = ENV.BASE_API_URL;

// Custom cache stroage by mmkv
const myStorage = buildStorage({
	find: (key, currentRequest) => {
		return StorageOperations.getStorageData(key)
	},
	set: (key, value) => {
		StorageOperations.setStorageData(key, value)
	},
	remove: (key) => {
		StorageOperations.removeStoreageData(key)
	}
});

// axios instance
const axios = setupCache(AxiosProvider, {
	debug: console.log,
	generateKey: buildKeyGenerator((request) => ({
		method: request.method,
		url: request.url,
		params: request.params,
		data: request.data,
	})),
	storage: myStorage,
	cachePredicate: {
		statusCheck: (status) =>
			[200, 203, 300, 301, 302, 404, 405, 410, 414, 501].includes(status),
	},
	ttl: 1000 * 60 * 1, // 1 minute
});

export { axios };
