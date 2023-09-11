import React from "react";
import { Text, View, Image, SafeAreaView } from "react-native";
import Navbar from "./Navbar";
import Chatbot from "./Chatbot";

export default function Home() {
  return (
    <View>
      <Navbar />
      <Chatbot />
    </View>
  );
}
