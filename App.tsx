import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { PostList, PostDetail } from "./app/screens";

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="PostList" component={PostList} />
				<Stack.Screen name="PostDetail" component={PostDetail} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
