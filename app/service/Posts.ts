import { API } from "../api";

import to from "await-to-js";
import { PostViewModel } from "../types";
import {  PostDetailViewModel } from "../types";

const getPosts = async (limit: number, offset: number, _embed?: string) => {
	const [error, data] = await to(
	  API.get<PostViewModel[]>("/posts", {
		params: {
		  _limit: limit,
		  _start: offset,
		  __embed: _embed
		},
		 
	  })
	);
	if (error) {
	  return null;
	}
	return data;
  };


  const getPostById = async (postId:number|string, _embed?: string) => {
	const [error, data] = await to(
	  API.get<PostDetailViewModel>(`/posts/${postId}`, {
		params: { 
			_embed: _embed
		  }
	  })
	);
	if (error) {
	  return null;
	}
	console.log("data",data);
	
	return data;
  };

const PostService = {
	getPosts,
	getPostById
};

export { PostService };
