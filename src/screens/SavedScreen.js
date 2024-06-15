import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React, { useCallback, useEffect, useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { BookmarkSquareIcon } from "react-native-heroicons/solid";
// import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { AuthContext } from "../hooks/authContext";
import { AuthRequirement } from "./AuthRequired";
import { fetchsavedNews } from "../utils/NewsApi";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading/Loading";

export default function SavedScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { userInfo } = useContext(AuthContext);
  const navigation = useNavigation();
  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["savedNewss"],
    queryFn: fetchsavedNews,
  });
  console.log(data?.length)
  // Function to handle click on an item
  const handleClick = (item) => {
    navigation.navigate("NewsDetails", item);
  };

  // Function to format the date
  function formatDate(isoDate) {
    const options = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    const date = new Date(isoDate);
    return date.toLocaleDateString(undefined, options);
  }

  const toggleBookmarkAndSave = async (item, index) => {
    try {
    } catch (error) {
      // console.log("Error Saving/Removing Article", error);
    }
  };

  const clearSavedArticles = async () => {
    try {
    } catch (error) {
      // console.log("Error clearing saved articles", error);
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        className="mb-4 space-y-1 "
        key={index}
        onPress={() => handleClick(item)}
      >
        <View className="flex-row justify-start w-[100%]shadow-sm">
          {/* Image */}
          <View className="items-start justify-start w-[20%]">
            <Image
              source={{
                uri:
                  item.image_url ||
                  "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
              }}
              style={{ width: hp(9), height: hp(10) }}
              resizeMode="cover"
              className="rounded-lg"
            />
          </View>

          {/* Content */}

          <View className="w-[70%] pl-4 justify-center space-y-1">
            {/* Author */}
            <Text className="text-xs font-bold text-gray-900 dark:text-neutral-300">
              {item.author}
            </Text>

            {/* Title */}
            <Text
              className="text-neutral-800 capitalize max-w-[90%] dark:text-white "
              style={{
                fontSize: hp(1.7),
                fontFamily: "SpaceGroteskBold",
              }}
            >
              {item.title.length > 50
                ? item.title.slice(0, 50) + "..."
                : item.title}
            </Text>

            {/* Date */}
            <Text className="text-xs text-gray-700 dark:text-neutral-300">
              {formatDate(item.publish_at)}
            </Text>
          </View>

          {/* Save */}
          <View className="w-[10%] justify-center">
            <TouchableOpacity
              onPress={() => toggleBookmarkAndSave(item, index)}
            >
              <BookmarkSquareIcon color="green" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (!userInfo) {
    return (<AuthRequirement />)
  }
  if (isLoading) {
    return <Loading />
  }
  return (
    <SafeAreaView className="p-4 bg-white flex-1 dark:bg-neutral-900">
      {/* <StatusBar style={colorScheme == "dark" ? "light" : "dark"} /> */}

      {/* Header  */}
      <View className="flex-row justify-between items-center">
        <Text
          className="font-bold text-xl text-green-800 dark:text-white"
          style={{
            fontFamily: "SpaceGroteskBold",
          }}
        >
          Saved Articles
        </Text>
        <TouchableOpacity
          onPress={clearSavedArticles}
          className="bg-green-800 py-1 px-4 rounded-lg"
        >
          <Text
            className="font-bold text-lg text-white dark:text-white"
            style={{
              fontFamily: "SpaceGroteskBold",
            }}
          >
            Clear
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginVertical: hp(2) }} className="space-y-2 ">
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.title}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom: hp(2),
          }}
        />
      </View>
    </SafeAreaView>
  );
}
