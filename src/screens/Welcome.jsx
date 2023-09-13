import {
  View,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
export default function Welcome({ route, navigation }) {
  const [userName, setUserName] = useState("");
  const { email } = route.params;

  const capitalizeUsername = (email) => {
    setUserName(email.split("@")[0].toUpperCase());
    // console.log(userName);
  };

  useEffect(() => {
    capitalizeUsername(email);
  }, []);

  return (
    <SafeAreaView style={{
      marginLeft: responsiveWidth(2),
      marginRight: responsiveWidth(2),
    }} className="mx-2 my-8">
      <Text className="text-4xl font-bold">Welcome</Text>
      <Text className="text-3xl font-bold text-[#23e754]">
        PRATYUSHSINGHA83
      </Text>
      <View className="mt-8">
        <Text
          style={{ fontSize: responsiveFontSize(2.3), lineHeight: responsiveHeight(3.5) }}
          className="text-justify text-gray-700"
        >
          This unofficial app is free, syncs your history across devices, and
          brings you the latest model improvements from OpenAI.
        </Text>
      </View>
      <View
        style={{
          marginLeft: responsiveWidth(5),
          marginRight: responsiveWidth(5),
        }}
        className="my-5 flex-row space-x-3"
      >
        <View className="self-center">
          <FontAwesome
            name="lock"
            style={{
              color: "#23e754",
              fontSize: responsiveFontSize(4),
            }}
          />
        </View>
        <View>
          <Text
            style={{ fontSize: responsiveFontSize(2.5) }}
            className=" text-black mb-2 font-semibold"
          >
            Shruti can be inaccurate
          </Text>
          <Text
            style={{ fontSize: responsiveFontSize(2.3), lineHeight: responsiveHeight(3.5)}}
            className=" text-justify text-gray-800"
          >
            SHRUTI may provide inaccurate information about people, places, or
            facts.
          </Text>
        </View>
      </View>
      <View style={{
          marginLeft: responsiveWidth(5),
          marginRight: responsiveWidth(5),
        }} className="my-2 flex-row space-x-3">
        <View className="self-center">
          <FontAwesome
            name="lock"
            style={{
              color: "#052c70",
              fontSize: responsiveFontSize(4),
            }}
          />
        </View>
        <View>
          <Text
            style={{ fontSize: responsiveFontSize(2.5) }}
            className=" text-black mb-2 font-semibold"
          >
            Don't share sensitive info
          </Text>
          <Text
            style={{ fontSize: responsiveFontSize(2.3), lineHeight: responsiveHeight(3.5) }}
            className="text-justify text-gray-800"
          >
            SHRUTI may provide inaccurate information about people, places, or
            facts.
          </Text>
        </View>
      </View>
      <View style={{
          marginLeft: responsiveWidth(5),
          marginRight: responsiveWidth(5),
        }} className="my-2 flex-row space-x-3">
        <View className="self-center">
          <FontAwesome
            name="lock"
            style={{
              color: "#FFA500",
              fontSize: responsiveFontSize(4),
            }}
          />
        </View>
        <View>
          <Text
            style={{ fontSize: responsiveFontSize(2.5) }}
            className=" text-black mb-2 font-semibold"
          >
            Control your chat history
          </Text>
          <Text
            style={{ fontSize: responsiveFontSize(2.3), lineHeight: 28 }}
            className=" text-justify text-gray-800"
          >
            SHRUTI may provide inaccurate information about people, places, or
            facts.
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Chatbot", { userName: `${userName}` })
        }
        className="mt-10 flex justify-center items-center bg-blue-700 rounded-full"
      >
        <Text className="text-white py-3 font-semibold">Contunue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
