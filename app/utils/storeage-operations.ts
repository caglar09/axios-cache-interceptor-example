import { MMKV } from "react-native-mmkv";

const storage = new MMKV({ id: "global-storage" });

const getStorageData =<T extends any = any> (key: string): T => {
	try {
		const stringData = storage.getString(key);

		return JSON.parse(stringData) as T;
	} catch (error) {
		console.log("getStoreageData string parse error", error);
		return null;
	}
};

const setStorageData = (key: string, data: any): boolean => {
	try {
		const stringData = JSON.stringify(data);
		storage.set(key, stringData);
		return true;
	} catch (error) {
		console.log("setStorageData string parse error", error);
		return false;
	}
};

const removeStoreageData = (key: string): boolean => {
	try {
		storage.delete(key);
		return true;
	} catch (error) {
		console.log("removeStoreageData string parse error", error);
		return false;
	}
};

const StorageOperations = {
	getStorageData,
	setStorageData,
	removeStoreageData,
};

export { StorageOperations };
