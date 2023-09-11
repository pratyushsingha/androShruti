import React, { useState } from "react";
import Toast from "react-native-toast-message";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import {
  Text,
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

export default function Chatbot() {
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
        "Bearer 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",
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
    <SafeAreaView className="mx-2 my-2">
      <KeyboardAvoidingView keyboardVerticalOffset={hp(5)} behavior="padding">
        <View style={{ height: hp(84) }} className="bg-neutral-200">
          <ScrollView
            bounce={false}
            showsVerticalScrollIndicator={false}
            className="space-y-2 px-1 py-1"
          >
            <FlatList
              data={conversation}
              renderItem={({ item }) => (
                <View
                  className={`${
                    item.role === "user"
                      ? "flex justify-start"
                      : "flex justify-end"
                  }`}
                >
                  <View className="px-1 py-1">
                    <Text
                      className={`block text-justify text-md ${
                        item.role === "user"
                          ? `text-red-500 font-bold bg-black px-2 py-2 rounded-xl`
                          : `text-green-500 bg-black px-2 py-2 rounded-xl`
                      }`}
                    >
                      {item.content}
                    </Text>
                  </View>
                </View>
              )}
            />
          </ScrollView>
          <Toast />
        </View>

        <View className="flex-row space-x-2 mt-1">
          <TextInput
            className="border rounded-3xl px-3 text-lg"
            placeholder="Message"
            style={{ width: wp(80) }}
            onChangeText={changeHandler}
            value={input}
          />
          <TouchableOpacity
            className="bg-blue-500 rounded-lg"
            onPress={submitHandler}
          >
            <Text className="text-white px-3 py-3">
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                "send"
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
