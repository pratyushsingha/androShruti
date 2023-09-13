import React, { useState } from "react";
import Toast from "react-native-toast-message";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  Button,
  TextInput,
  Alert,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [signup, setSignup] = useState(false);
  const auth = FIREBASE_AUTH;

  const logIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      Toast.show({
        type: "success",
        text1: `Welcome ${email.split("@")[0].toUpperCase()}`,
        text2: `successfully loged in`,
      });
      navigation.navigate("Welcome", { email: `${email}` });
    } catch (err) {
      console.log(err);
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: `${err} 😢`,
      });
    } finally {
      setLoading(false);
    }
  };
  
  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      Toast.show({
        type: "success",
        text1: `Hiii ${email.split("@")[0].toUpperCase()}`,
        text2: `Login to continue👋`,
      });
    } catch (err) {
      console.log(err);
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: `${err.message} 😢`,
      });
    } finally {
      setLoading(false);
    }
  };
  const signupHandler = () => {
    if (signup === false) {
      setSignup(true);
    } else {
      setSignup(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Text className="text-2xl text-bold text-black my-6">
        {signup ? "SIGN IN" : "SIGN UP"}
      </Text>
      <View style={{ width: wp(70) }}>
        <TextInput
          className="border-b border-black mb-2 px-2 text-lg "
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>
      <View style={{ width: wp(70) }}>
        <TextInput
          className="border-b border-black mb-2 px-2 text-lg mt-6"
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View className="flex-col space-y-2">
          <Button
            color="black"
            title={signup ? "login" : "sign up"}
            onPress={signup ? logIn : signUp}
          />
        </View>
      )}
      <View className="flex-row space-x-2 my-4">
        <Text>Don't have an account?</Text>
        <Text className="text-blue-800 font-bold" onPress={signupHandler}>
          {signup ? "sign up" : "log in"}
        </Text>
      </View>
      <Toast />
    </SafeAreaView>
  );
}
