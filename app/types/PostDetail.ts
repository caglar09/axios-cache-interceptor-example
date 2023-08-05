import { CommentViewModel } from "./Comment";
import { PostViewModel } from "./Post";

// from: https://jsonplaceholder.typicode.com/posts & https://jsonplaceholder.typicode.com/comments
export type PostDetailViewModel = PostViewModel & {
    comments?: CommentViewModel[]
}