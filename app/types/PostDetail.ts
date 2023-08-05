import { CommentViewModel } from "./Comment";
import { PostViewModel } from "./Post";

export type PostDetailViewModel = PostViewModel &{
    comments?:CommentViewModel[]
}