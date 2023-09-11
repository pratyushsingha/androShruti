import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import {
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
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
        console.log("no content found");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  const submitHandler = (text) => {
    text.preventDefault();
    if (input.trim() !== "") {
      chatResponse();
    } else {
      console.log("input can't be empty");
    }
  };

  return (
    <View className="mx-2 my-2">
      <View style={{ height: hp(85) }} className="bg-neutral-200">
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
                <View
                  className="px-1 py-1"
                >
                  <Text className={`block text-justify text-md ${item.role==="user"?`text-red-500 font-bold bg-black px-2 py-2 rounded-xl`:`text-green-500 bg-black px-2 py-2 rounded-xl`}`}>{item.content}</Text>
                </View>
              </View>
            )}
          />
        </ScrollView>
      </View>

      <View className="flex-row space-x-2">
        <TextInput
          placeholder="Message"
          style={{ width: wp(80) }}
          onChangeText={changeHandler}
          value={input}
        />
        <TouchableOpacity
          className="bg-blue-500 rounded-xl px-3 py-4"
          onPress={submitHandler}
        >
          <Text className="text-white">Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
