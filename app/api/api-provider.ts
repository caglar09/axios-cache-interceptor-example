import { CacheRequestConfig, CacheAxiosResponse } from "axios-cache-interceptor";
import  { axios } from "./api-cache-provider";

const get = <T extends any=any>(url: string, config?: CacheRequestConfig): Promise<CacheAxiosResponse<T>> => {
	return axios.get(url, config);
};

const post = (url: string, data?: any, config?: CacheRequestConfig): Promise<CacheAxiosResponse> => {
	return axios.post(url, data, config);
};

const put = (url: string, data?: any, config?: CacheRequestConfig): Promise<CacheAxiosResponse> => {
	return axios.put(url, data, config);
};

const deleteMethod = (url: string, data?: any): Promise<CacheAxiosResponse> => {
	return axios.delete(url, data);
};

const API = { get, post, put, deleteMethod };

export { axios, API };
