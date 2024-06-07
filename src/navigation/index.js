import { Platform } from "react-native";
import React, { useState, createContext, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import NewsDetails from "../screens/NewsDetails";
import DiscoverScreen from "../screens/DiscoverScreen";
import SavedScreen from "../screens/SavedScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { View, Text, TouchableOpacity, Image, FlatList, Pressable, StyleSheet } from "react-native";
import SearchScreen from "../screens/SearchScreen";
import { useColorScheme } from "nativewind";
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Login from "../components/Modals/Login";
import { LoginRequiredContext } from "../hooks/loginContext";
import { AuthContext } from "../hooks/authContext";
import Loading from "../components/Loading/Loading";

const android = Platform.OS === "android";
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
export default function AppNavigation() {
    const context = useContext(LoginRequiredContext);
    const { colorScheme, toggleColorScheme } = useColorScheme();
    const TabNavigator = () => {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,

                    tabBarActiveTintColor: "green",
                    tabBarInactiveTintColor: "gray",
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontFamily: "SpaceGroteskMedium",
                        // paddingBottom: 10,
                    },
                    tabBarStyle: {
                        backgroundColor: colorScheme == "dark" ? "black" : "white",
                        // borderTopWidth: 0,
                        // padding: 10,
                        // height: 60,
                    },
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Discover" component={DiscoverScreen} />
                <Tab.Screen name="Saved" component={SavedScreen} />
                <Tab.Screen name="Search" component={SearchScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        );
    };
    const { loading } = useContext(AuthContext);
    if (loading) {
        return <Loading />;
    }
    return (

        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="SplashS"
                screenOptions={{
                    headerShown: false,
                }}
            >

                <Stack.Screen name="HomeTabs" component={TabNavigator} />
                <Stack.Screen name="Search" component={SearchScreen} />
                <Stack.Screen
                    name="NewsDetails"
                    component={NewsDetails}
                    options={{ animation: "slide_from_bottom" }}
                />


            </Stack.Navigator>
            {context.isLoginRequired && <>
                <AnimatedPressable
                    entering={FadeIn}
                    exiting={FadeOut}
                    style={{
                        ...StyleSheet.absoluteFill,
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        zIndex: 1,
                    }}
                    onPress={() => context.handleLoginRequired(false)}
                >

                </AnimatedPressable>
                <Login />
            </>}
        </NavigationContainer>


    );
}