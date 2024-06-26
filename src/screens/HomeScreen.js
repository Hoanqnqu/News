import { View, ScrollView, StatusBar } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
// import { StatusBar } from "expo-status-bar";
import Loading from "../components/Loading/Loading";
import Header from "../components/Header/Header";
import NewsSection from "../components/NewsSection/NewsSection";
import { useQuery } from "@tanstack/react-query";
import { fetchLatestNews, fetchRecommendedNews } from "../utils/NewsApi";
import MiniHeader from "../components/Header/MiniHeader";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import BreakingNews from "../components/BreakingNews";
import Login from "../components/Modals/Login";

export default function HomeScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  // Breaking News
  const { data, isLoading: isBreakingLoading } = useQuery({
    queryKey: ["breakingNewss"],
    queryFn: fetchLatestNews,
  });
  // Recommended News
  const { data: recommendedNew, isLoading: isRecommendedLoading, refetch, isFetching } = useQuery({
    queryKey: ["recommededNewss"],
    queryFn: fetchRecommendedNews,
  });


  return (
    <SafeAreaView className=" flex-1 bg-white dark:bg-neutral-900">
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />
      <View>
        {/* Header */}
        <Header />

        {/* Breaking News */}
        {isBreakingLoading ? (
          <Loading />
        ) : (
          <View className="">
            <MiniHeader label="Latest News" />
            <BreakingNews label="Latest News" data={data?.data} />
          </View>
        )}

        {/* Recommended News */}
        <View className="h-[450px]">
          <MiniHeader label="Recommended" />

          <NewsSection
            label="Recommendation"
            newsProps={recommendedNew?.data || []}
            isFetching={isFetching}
            isLoading={isRecommendedLoading}
            refetch={refetch}
          />

        </View>
      </View>
    </SafeAreaView>
  );
}
