import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Link } from "expo-router";

const signUp = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logIn}>
        <Image
          style={{ width: "60%", height: "10%", marginBottom: 30 }}
          source={require("@/assets/home/IG logo.png")}
        />
        <TextInput style={styles.inputStyle} placeholder="email" />
        <TextInput style={styles.inputStyle} placeholder="password" />
        <TextInput style={styles.inputStyle} placeholder="Full name" />
        <TextInput style={styles.inputStyle} placeholder="Username" />
        <Link href={"/login"} asChild style={{ marginBottom: 15 }}>
          <TouchableOpacity style={styles.logButton}>
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
