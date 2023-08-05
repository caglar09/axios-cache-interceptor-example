import {
	View,
	FlatList,
	Text,
	StyleSheet,
	ActivityIndicator,
	TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { PostService } from "../service";
import { PostViewModel } from "../types";
import { useNavigation } from "@react-navigation/native";

const initialOffset = 1;
const initialLimit = 10;

const PostList = () => {
	const navigation = useNavigation();
	const [data, setData] = useState<PostViewModel[]>([]);
	const [initialized, setInitialized] = useState<boolean>(false); // Added loading state
	const [loading, setLoading] = useState<boolean>(true); // Added loading state
	const [
		onEndReachedCalledDuringMomentum,
		setOnEndReachedCalledDuringMomentum,
	] = useState(true);
	const [offset, setOffset] = useState<number>(initialOffset);
	const [limit, setLimit] = useState<number>(initialLimit);

	const handleGetPosts = async () => {
		const isInitialRequest = offset === initialOffset;

		setLoading(true);
		const calculatedOffset = (offset - 1) * limit;
		const posts = await PostService.getPosts(limit, calculatedOffset);

		const newData = posts?.data ?? [];

		setData(
			calculatedOffset === initialOffset ? newData : [...data, ...newData]
		);
		setLoading(false);
		if (isInitialRequest) {
			setInitialized(true);
		}
	};

	const onEndReached = () => {
		setOffset((_offset) => _offset + 1);
	};

	useEffect(() => {
		handleGetPosts();
	}, [offset, limit]);

	const renderItem = ({
		item,
		index,
	}: {
		item: PostViewModel;
		index: number;
	}) => {
		return (
			<TouchableOpacity
				style={styles.container}
				// @ts-ignore
				onPress={() => navigation.navigate("PostDetail", { postId: item.id })}
			>
				{/* <Image source={item.image} style={styles.image} /> */}
				<View style={styles.contentContainer}>
					<Text style={styles.title}>
						{index + 1}. - {item.title}
					</Text>
					<Text style={styles.content}>{item.body}</Text>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<View style={styles.postContainer}>
			{loading && !initialized ? (
				<Text>Loading...</Text>
			) : (
				<FlatList
					data={data}
					renderItem={renderItem}
					keyExtractor={(item) => item.id.toString()}
					maxToRenderPerBatch={10}
					ListFooterComponent={
						loading && initialized && <ActivityIndicator size="large" />
					}
					onEndReached={() =>
						!loading && !onEndReachedCalledDuringMomentum && onEndReached()
					}
					onEndReachedThreshold={0.1}
					onMomentumScrollBegin={() =>
						setOnEndReachedCalledDuringMomentum(false)
					}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	postContainer: {
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	container: {
		flexDirection: "row",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
		paddingVertical: 16,
	},
	image: {
		width: 80,
		height: 80,
		borderRadius: 8,
		marginRight: 16,
	},
	contentContainer: {
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
	},
});

export { PostList };
