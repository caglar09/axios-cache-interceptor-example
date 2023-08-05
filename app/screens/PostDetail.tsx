import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import React, { useCallback } from "react";
import { PostDetailViewModel } from "../types";
import { PostService } from "../service";
import { StackScreenProps } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";

const PostDetail = ({ route }) => {
	const { postId } = route.params as { postId: number };

	const [post, setPost] = React.useState<PostDetailViewModel | null>(null);
	const [loading, setLoading] = React.useState<boolean>(true);

	const fetchPost = useCallback(async () => {
		setLoading(true);
		const post = await PostService.getPostById(postId, "comments");
		setPost(post?.data ?? null);
		setLoading(false);
	}, []);

	React.useEffect(() => {
		fetchPost();
	}, [postId]);

	if (loading) {
		return (
			<View style={styles.postContainer}>
				<Text>Loading...</Text>
			</View>
		);
	}

	if (!post) {
		return (
			<View style={styles.postContainer}>
				<Text>Post not found</Text>
			</View>
		);
	}

	return (
		<View style={styles.postContainer}>
			<Text style={styles.title}>{post.title}</Text>
			<Text style={styles.content}>{post.body}</Text>
			<View style={styles.commentsContainer}>
				<Text style={styles.commentsTitle}>Comments:</Text>
				<ScrollView>
					{post.comments?.map((comment) => (
						<View key={comment.id} style={styles.commentContainer}>
							<Text style={styles.commentName}>{comment.name}</Text>
							<Text style={styles.commentEmail}>{comment.email}</Text>
							<Text style={styles.commentBody}>{comment.body}</Text>
						</View>
					))}
				</ScrollView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	postContainer: {
		paddingHorizontal: 16,
		paddingVertical: 12,
		flex: 1,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 8,
	},
	content: {
		fontSize: 14,
		color: "#555",
		marginBottom: 16,
	},
	commentsContainer: {
		paddingVertical: 16,
		marginBottom: 30,
	},
	commentsTitle: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 8,
	},
	commentContainer: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		padding: 12,
		marginBottom: 8,
	},
	commentName: {
		fontSize: 14,
		fontWeight: "bold",
		marginBottom: 4,
	},
	commentEmail: {
		fontSize: 12,
		color: "#555",
		marginBottom: 4,
	},
	commentBody: {
		fontSize: 12,
		color: "#555",
	},
});
export { PostDetail };
