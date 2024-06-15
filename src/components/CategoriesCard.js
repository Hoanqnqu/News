import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { categoryData } from "../constants";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Loading from "./Loading/Loading";

export default function CategoriesCard({
  categories,
  isCategoriesLoading,
  activeCategory,
  handleChangeCategory,
}) {
  if (isCategoriesLoading) {
    return <Loading />;
  }
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{
          paddingRight: 20,
        }}
      >
        {categories.map((category, index) => {
          let isActive = category.name == activeCategory;
          let activeButtonClass = isActive
            ? "bg-green-700 "
            : "bg-black/10 dark:bg-neutral-400 ";
          let activeTextClass = isActive
            ? "text-white "
            : "text-gray-600 dark:text-neutral-600 ";

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategory(category.id)}
              className="flex items-center space-y-1"
            >
              <View
                className={
                  "rounded-full py-2 px-4 " + activeButtonClass
                }
              >
                <Text
                  className={"capitalize " + activeTextClass}
                  style={{
                    fontSize: hp(1.6),
                  }}
                >
                  {category.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
