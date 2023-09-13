import React from "react";
import { Text, View, Image, SafeAreaView } from "react-native";

export default function Navbar() {
  return (
    <SafeAreaView>
      <View className="px-5 pt-5 flex justify-center items-center bg-white dark:bg-gray-800">
        <View className="flex flex-row space-x-2 mb-2">
          <Image
            className="w-6 h-6 rounded-full self-center"
            source={{
              uri: "https://i.postimg.cc/vBd2MN55/5cb480cd5f1b6d3fbadece79.png",
            }}
          />
          <Text className="text-2xl font-bold">Shruti</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
