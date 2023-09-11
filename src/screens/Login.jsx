import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Button,
  TextInput,
} from "react-native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  //   const submitHandler = () => {
  //     navigation.navigate("Home");
  //   };

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      navigation.navigate("Home");
    } catch (err) {
      console.log(err);
      alert(`sign in failed ${err.message}`);
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
    } catch (err) {
      console.log(err);
      alert(`sign up failed ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView>
        <TextInput
          placeholder="Email"
          autoCapitalize="none" // Correct the typo here
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize="none" // Correct the typo here
          onChangeText={(text) => setPassword(text)}
          value={password}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Button title="Login" onPress={signIn} />
            <Button title="Create Account" onPress={signUp} />
          </>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}
