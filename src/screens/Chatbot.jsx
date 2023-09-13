import React, { useState, useRef } from "react";
import Toast from "react-native-toast-message";

import Navbar from "./Navbar";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Text,
  Image,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

export default function Chatbot({ route, navigation }) {
  const { userName } = route.params;
  const scrollViewRef = useRef();

  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

  const changeHandler = (text) => {
    console.log(text);
    setInput(text);
  };

  const chatResponse = async () => {
    setLoading(true);
    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
      "Content-Type": "application/json",
      Authorization:
        "Bearer ",
    };

    const newInput = input;
    setInput("");

    const data = {
      model: "gpt-3.5-turbo",
      messages: conversation.concat([{ role: "user", content: newInput }]),
      temperature: 0.7,
    };

    try {
      const response = await axios.post(url, data, { headers });
      if (response.data.choices && response.data.choices.length > 0) {
        const content = response.data.choices[0].message.content;
        setConversation([
          ...conversation,
          { role: "user", content: newInput },
          { role: "assistant", content },
        ]);
      } else {
        Toast.show({
          type: "error",
          text1: "Sorry😢",
          text2: "No content found",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "We are sorry",
        text2: `${error}`,
      });
    }
    setLoading(false);
  };

  const submitHandler = (text) => {
    text.preventDefault();
    if (input.trim() !== "") {
      chatResponse();
    } else {
      Toast.show({
        type: "error",
        text1: "Write something😢✒️",
        text2: "Input can't be empty",
      });
    }
  };

  return (
    <SafeAreaView
      style={{
        marginLeft: responsiveWidth(1),
        marginRight: responsiveWidth(1),
      }}
      className="dark:bg-gray-800 bg-white"
    >
      <Navbar />
      <View style={{ height: responsiveHeight(98) }} className="">
        <ScrollView
          bounce={false}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
          showsVerticalScrollIndicator={false}
          className="space-y-2 px-1 py-1"
        >
          <FlatList
            data={conversation}
            renderItem={({ item }) => (
              <View>
                <View className="px-1 py-1">
                  <View
                    className={`block text-justify text-md flex-col space-y-1  ${
                      item.role === "user"
                        ? `  px-2 py-2 rounded-xl flex`
                        : `px-2 py-2 rounded-xl`
                    }`}
                  >
                    <Text className="text-gray-700">
                      {item.role === "user" ? (
                        <View className="flex flex-row space-x-1">
                          <Image
                            className="w-5 h-5 rounded-full self-center"
                            source={{
                              uri: "https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Free-Download.png",
                            }}
                          />
                          <Text className="text-red-600 font-bold">
                            {userName}
                          </Text>
                        </View>
                      ) : (
                        <View className="flex flex-row space-x-1">
                          <Image
                            className="w-4 h-4 rounded-full self-center"
                            source={{
                              uri: "https://i.postimg.cc/vBd2MN55/5cb480cd5f1b6d3fbadece79.png",
                            }}
                          />
                          <Text className="text-green-600 font-bold">
                            SHRUTI
                          </Text>
                        </View>
                      )}
                    </Text>
                    <Text className="text-gray-700 font-semibold text-justify">
                      {item.content}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        </ScrollView>
        <Toast />
      </View>
      <KeyboardAvoidingView
        keyboardVerticalOffset={12}
        behavior={"position"}
      >
        <View className=" bg-white flex-row space-x-2 mt-1 justify-center items-center">
          {loading && <ActivityIndicator size="small" color="#052c70" />}
          <TextInput
            className="border rounded-3xl px-3 text-lg bg-slate-200 dark:bg-gray-500"
            placeholder="Message"
            style={{
              width: loading ? responsiveWidth(76) : responsiveWidth(84),
              height: responsiveHeight(5.3),
            }}
            onChangeText={changeHandler}
            value={input}
          />
          <TouchableOpacity
            className="bg-blue-500 rounded-lg"
            onPress={submitHandler}
          >
            <Text className="text-white px-3 py-3">
              {loading ? (
                <FontAwesome name="square" />
              ) : (
                <FontAwesome name="arrow-up" />
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
