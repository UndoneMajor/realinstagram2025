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

const Sigin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidepassword, setHidepassword] = useState(true);
  const togglePassword = () => {
    setHidepassword(!hidepassword);
  };
  const Login = () => {
    console.log(email, password);
  };
  return (
    <View style={styles.container}>
      <View style={styles.logIn}>
        <Image
          style={{ width: "60%", height: "10%", marginBottom: 30 }}
          source={require("@/assets/home/IG logo.png")}
        />
        <View style={styles.inputStyle}>
          <TextInput
            // textContentType="emailAddress"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="email"
          />
        </View>

        <View style={styles.inputStyle}>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={hidepassword}
            placeholder="password"
          />
          <TouchableOpacity onPress={togglePassword}>
            <Text>{hidepassword ? "Show" : "Hide"}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={Login} style={styles.logButton}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Log in</Text>
        </TouchableOpacity>

        <Link href={"/login/signUp"} asChild>
          <TouchableOpacity>
            <Text style={{ color: "#4CB5F9", fontWeight: "bold" }}>
              Sign up
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default Sigin;

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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 2,
    padding: 5,
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
