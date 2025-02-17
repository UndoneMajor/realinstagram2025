import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import { signupBase } from "../../firebaseConfig";

const signUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const Signup = async () => {
    const response = await signupBase(email, password);
    console.log("responce", response);
  };
  return (
    <View style={styles.container}>
      <View style={styles.logIn}>
        <Image
          style={{ width: "60%", height: "10%", marginBottom: 30 }}
          source={require("@/assets/home/IG logo.png")}
        />
        <TextInput
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.inputStyle}
          placeholder="email"
        />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.inputStyle}
          placeholder="password"
        />
        <TextInput
          value={fullname}
          onChangeText={(text) => setFullname(text)}
          style={styles.inputStyle}
          placeholder="Full name"
        />
        <TextInput
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.inputStyle}
          placeholder="Username"
        />
        <Link href={"/login"} asChild style={{ marginBottom: 15 }}>
          <TouchableOpacity onPress={Signup} style={styles.logButton}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Sign up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default signUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  logIn: {
    width: "80%",
    height: "70%",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
    gap: 10,
  },
  inputStyle: {
    width: "80%",
    height: "12%",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 2,
  },
  logButton: {
    width: "80%",
    height: "10%",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    backgroundColor: "#4CB5F9",
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
