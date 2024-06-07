import { View, ScrollView, StatusBar } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
// import { StatusBar } from "expo-status-bar";
import Loading from "../components/Loading/Loading";
import Header from "../components/Header/Header";
import NewsSection from "../components/NewsSection/NewsSection";
import { useQuery } from "@tanstack/react-query";
import { fetchBreakingNews, fetchRecommendedNews } from "../utils/NewsApi";
import MiniHeader from "../components/Header/MiniHeader";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import BreakingNews from "../components/BreakingNews";
import Login from "../components/Modals/Login";

export default function HomeScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  // Breaking News
  const { data, isLoading: isBreakingLoading } = useQuery({
    queryKey: ["breakingNewss"],
    queryFn: fetchBreakingNews,
  });
  // Recommended News
  const { data: recommendedNew, isLoading: isRecommendedLoading, refetch, isFetching } = useQuery({
    queryKey: ["recommededNewss"],
    queryFn: fetchRecommendedNews,
  });

  console.log(data?.data?.length)
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
            <MiniHeader label="Breaking News" />
            <BreakingNews label="Breaking News" data={data?.data} />
          </View>
        )}

        {/* Recommended News */}
        <View>
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
