import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StyleSheet,

} from "react-native";
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import moment from 'moment';
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import RenderHtml from 'react-native-render-html';
import { WebView } from "react-native-webview";
import { ChevronLeftIcon, ShareIcon } from "react-native-heroicons/outline";
import { BookmarkSquareIcon } from "react-native-heroicons/solid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import OcticonsIcon from "react-native-vector-icons/Octicons";
import Comment from "../components/Modals/Comment";
const { height, width } = Dimensions.get("window");
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
export default function NewsDetails() {
  const { params: item } = useRoute();
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const [isBookmarked, toggleBookmark] = useState(false);

  // console.log("item URL", item.url);

  const toggleBookmarkAndSave = async () => {
    try {
      // Check if News Article is already in Storage
      const savedArticles = await AsyncStorage.getItem("savedArticles");
      let savedArticlesArray = savedArticles ? JSON.parse(savedArticles) : [];
      // console.log("Check if the article is already bookmarked");

      // Check if the article is already in the bookmarked list
      const isArticleBookmarked = savedArticlesArray.some(
        (savedArticle) => savedArticle.url === item.url
      );

      // console.log("Check if the article is already in the bookmarked list");

      if (!isArticleBookmarked) {
        // If the article is not bookmarked, add it to the bookmarked list
        savedArticlesArray.push(item);
        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(savedArticlesArray)
        );
        toggleBookmark(true);
        // console.log("Article is bookmarked");
      } else {
        // If the article is already bookmarked, remove it from the list
        const updatedSavedArticlesArray = savedArticlesArray.filter(
          (savedArticle) => savedArticle.url !== item.url
        );
        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(updatedSavedArticlesArray)
        );
        toggleBookmark(false);
        // console.log("Article is removed from bookmarks");
      }
    } catch (error) {
      console.log("Error Saving Article", error);
    }
  };

  useEffect(() => {
    // Load saved articles from AsyncStorage when the component mounts
    const loadSavedArticles = async () => {
      try {
        const savedArticles = await AsyncStorage.getItem("savedArticles");
        const savedArticlesArray = savedArticles
          ? JSON.parse(savedArticles)
          : [];

        // Check if the article is already in the bookmarked list
        const isArticleBookmarked = savedArticlesArray.some(
          (savedArticle) => savedArticle.url === item.url
        );

        toggleBookmark(isArticleBookmarked);
        // console.log("Check if the current article is in bookmarks");
      } catch (error) {
        console.log("Error Loading Saved Articles", error);
      }
    };

    loadSavedArticles();
  }, [item.url]);

  return (
    <>
      {visible && <>
        <AnimatedPressable
          entering={FadeIn}
          exiting={FadeOut}
          style={{
            ...StyleSheet.absoluteFill,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 1,
          }}
          onPress={() => setVisible(false)}
        >
        </AnimatedPressable>
        <Comment />
      </>}
      <View className="w-full flex-row justify-between items-center px-4 pt-4 pb-4 bg-white">
        <View className="bg-gray-100 p-2 rounded-full items-center justify-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={25} strokeWidth={3} color="gray" />
          </TouchableOpacity>
        </View>

        <View className="space-x-3 rounded-full items-center justify-center flex-row">
          <TouchableOpacity className="bg-gray-100 p-2 rounded-full">
            <AntDesignIcon name="like2" size={25} color="gray" strokeWidth={2} />
          </TouchableOpacity>

          <TouchableOpacity className="bg-gray-100 p-2 rounded-full">
            <AntDesignIcon name="dislike2" size={25} color="gray" strokeWidth={2} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setVisible(true)} className="bg-gray-100 p-2 rounded-full">
            <OcticonsIcon name="comment" size={25} color="gray" strokeWidth={2} />
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-gray-100 p-2 rounded-full"
            onPress={toggleBookmarkAndSave}
          >
            <BookmarkSquareIcon
              size={25}
              color={isBookmarked ? "green" : "gray"}
              strokeWidth={2}
            />
          </TouchableOpacity>

          <TouchableOpacity className="bg-gray-100 p-2 rounded-full">
            <ShareIcon size={25} color="gray" strokeWidth={2} />
          </TouchableOpacity>

        </View>
      </View>
      <ScrollView className="bg-white text-gray-900 dark:text-neutral-300">
        <Text
          className="text-2xl font-bold px-4 pb-4 text-gray-900 dark:text-neutral-300"
        >
          {item.title}
        </Text>
        <Image
          source={{
            uri:
              item.image_url ||
              "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
          }}

          resizeMode="cover"
          className="w-full h-60"
        />
        <Text
          className="text-xl font-semibold italic px-4 text-gray-900 dark:text-neutral-300"
        >
          {item.description}
        </Text>
        <View
          className="w-full text-gray-900 dark:text-neutral-300 px-4"
        >
          <RenderHtml className="px-4" source={{
            html: item.content,
          }} contentWidth={width} />
        </View>
        <Text
          className={"px-4 py-4 text-gray-900 dark:text-neutral-300"}
          style={{

            fontSize: 15,
            paddingTop: 10,
            fontWeight: 'bold',
          }}>
          Author: {item.author === null ? 'Legit Source' : item.author}
        </Text>
        <Text
          className={"px-4 py-4 text-gray-900 dark:text-neutral-300"}
          style={{
            fontSize: 15,
            marginTop: 10,
            paddingBottom: 30,
          }}>
          🕘 {moment(item.publishedAt).format('MMMM Do YYYY, h:mm a')}
        </Text>
      </ ScrollView>
    </>
  );
}
