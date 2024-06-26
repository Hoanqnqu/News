import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from "react-native";
import React, { useEffect, useState, useReducer } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
// import { StatusBar } from "expo-status-bar";
import Loading from "../components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import CategoriesCard from "../components/CategoriesCard";
import NewsSection from "../components/NewsSection/NewsSection";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { fetchDiscoverNews } from "../utils/NewsApi";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { fetchAllCategories } from "../utils/CategoryAPI";

export default function DiscoverScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [activeCategory, setActiveCategory] = useState("");
  const navigation = useNavigation();

  // Categories
  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchAllCategories,
  });


  const { data: discoverNew, isLoading: isDiscoverLoading, isFetching, refetch } = useQuery({
    queryKey: ["discoverNews", activeCategory],
    queryFn: () => fetchDiscoverNews(activeCategory),
  });

  const handleChangeCategory = (category) => {
    setActiveCategory(category);
  };


  return (
    <SafeAreaView className="pt-8 bg-white dark:bg-neutral-900">
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />

      <View>
        {/* Header */}
        <View className="px-4 mb-6 justify-between">
          <Text
            className="text-3xl text-green-800 dark:text-white"
            style={{
              fontFamily: "SpaceGroteskBold",
            }}
          >
            Discover
          </Text>

          <Text
            className="text-base text-gray-600 dark:text-neutral-300 "
            style={{
              fontFamily: "SpaceGroteskMedium",
            }}
          >
            News from all over the world
          </Text>
        </View>

        {/* Search */}
        <View className="mx-4 mb-8 flex-row p-2 py-3 justify-between items-center bg-neutral-100 rounded-full">
          <TouchableOpacity className="pl-2">
            <MagnifyingGlassIcon size="25" color="gray" />
          </TouchableOpacity>
          <TextInput
            onPressIn={() => navigation.navigate("Search")}
            placeholder="Search for news"
            placeholderTextColor={"gray"}
            className="pl-4 flex-1 font-medium text-black tracking-wider"
          />
        </View>

        {/* Categories */}
        <View className="flex-row mx-4">
          <CategoriesCard
            categories={categories}
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
            isCategoriesLoading={isCategoriesLoading}
          />
        </View>

        <View className="h-full">
          {/* Header Title */}
          <View className="my-4 mx-4 flex-row justify-between items-center">
            <Text
              className="text-xl dark:text-white"
              style={{
                fontFamily: "SpaceGroteskBold",
              }}
            >
              Discover
            </Text>
          </View>


          <View
            className="h-[500px]"
            contentContainerStyle={{
              paddingBottom: hp(70),
            }}
          >
            <NewsSection newsProps={discoverNew?.data || []} isFetching={isFetching} isLoading={isDiscoverLoading} refetch={refetch} label="Discovery" />
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
}
