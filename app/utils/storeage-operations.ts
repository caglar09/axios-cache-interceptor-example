import { MMKV } from "react-native-mmkv";

const storage = new MMKV({ id: "global-storage" });

// Retrieves data from storage based on a given key.
const getStorageData = <T extends any = any>(key: string): T => {
	try {
		const stringData = storage.getString(key);

		return JSON.parse(stringData) as T;
	} catch (error) {
		console.log("getStoreageData string parse error", error);
		return null;
	}
};

// Sets the data in the storage with the given key.
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

// Removes the specified key from the storage.
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
