import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState, useContext } from "react";
import { View, Text, TouchableOpacity, Image, FlatList, Pressable, StyleSheet } from "react-native";
import { BookmarkSquareIcon } from "react-native-heroicons/solid";
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { LoginRequiredContext } from "../../hooks/loginContext";
import { AuthContext } from "../../hooks/authContext";
import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";
import { SavedNewsContext } from "../../hooks/savedNewsContext";

export default function NewsSection({ newsProps, isLoading, isFetching, refetch }) {
  const navigation = useNavigation();
  const { savedNews, addSavedNews, removeSavedNews } = useContext(SavedNewsContext);
  const [bookmarkStatus, setBookmarkStatus] = useState([]);
  const context = useContext(LoginRequiredContext);
  const { userInfo } = useContext(AuthContext);
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
  console.log(newsProps?.length)

  const handleClick = (item) => {
    navigation.navigate("NewsDetails", item);
  };

  // Effect to load saved articles from AsyncStorage when the component mounts
  const loadSavedArticles = useCallback(async () => {
    try {
      if (!savedNews || savedNews.length === 0) {
        return;
      }

      // Check if article is already bookmarked
      const isArticleBookmarkedList = newsProps.map((article) =>
        savedNews.some((savedArticle) => savedArticle.id == article.id)
      );
      
      // Set the bookmark status for all items based on the loaded data
      setBookmarkStatus(isArticleBookmarkedList);
    } catch (error) {
      console.log("Error Loading Saved Articles", error);
    }
  }, [savedNews, newsProps]);

  useEffect(() => {
    loadSavedArticles();
  }, [loadSavedArticles, savedNews]);

  // Function to toggle bookmark and save article
  const toggleBookmarkAndSave = async (item, index) => {
    try {
      if (!userInfo) {
        return;
      }
      if (bookmarkStatus[index]) {
        removeSavedNews(item);
      } else {
        addSavedNews(item);
      }
      setBookmarkStatus((prevStatus) => {
        const updatedStatus = [...prevStatus];
        updatedStatus[index] = !prevStatus[index];
        return updatedStatus;
      });
    } catch (error) {
      console.log("Error Saving/Removing Article", error);
    }
  };

  const renderItem = ({ item, index }) => {

    return (
      <TouchableOpacity
        className="mb-4 mx-4 space-y-1"
        key={index}
        onPress={() => handleClick(item)}
      >
        <View className="flex-row justify-start w-[100%]shadow-sm">

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
              {item?.author?.length > 20
                ? item.author.slice(0, 20) + "..."
                : item.author}
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

          {/* Bookmark */}
          <View className="w-[10%] justify-center">
            <TouchableOpacity
              onPress={() => {
                console.log("userInfo:", userInfo)
                if (!userInfo) {
                  context.handleLoginRequired(true)
                }
                else {
                  console.log("index:", index)
                  toggleBookmarkAndSave(item, index)
                }

              }}
            >
              <BookmarkSquareIcon
                color={bookmarkStatus[index] ? "green" : "gray"}
              />
            </TouchableOpacity>
          </View>

        </View>
      </TouchableOpacity >
    );
  };
  return (
    <View className=" bg-white dark:bg-neutral-900 ">
      {/* Header */}
      <FlatList
        nestedScrollEnabled={true}
        onRefresh={async () => {
          refetch()
        }}
        refreshing={isLoading}

        data={newsProps}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}

      />
    </View>


  );
}

// useEffect(() => {

//   const loadSavedArticles = async () => {
//     try {
//       const savedArticles = await AsyncStorage.getItem("savedArticles");
//       const savedArticlesArray = savedArticles
//         ? JSON.parse(savedArticles)
//         : [];

//       // Check if each URL in 'urlList' exists in the bookmarked list
//       const isArticleBookmarkedList = urlList.map((url) =>
//         savedArticlesArray.some((savedArticle) => savedArticle.url === url)
//       );

//       // Set the bookmark status for all items based on the loaded data
//       setBookmarkStatus(isArticleBookmarkedList);
//       console.log("Check if the current article is in bookmarks");
//     } catch (error) {
//       console.log("Error Loading Saved Articles", error);
//     }
//   };

//   loadSavedArticles();
// }, [urlList]);

// contentContainerStyle={{
//         paddingBottom: hp(110),
//       }}
