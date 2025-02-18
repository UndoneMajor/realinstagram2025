import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import React, { useState } from "react"
import { useRouter } from "expo-router"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { auth, db } from "../../firebaseConfig"

export default function SignUp() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullname, setFullname] = useState("")
  const [username, setUsername] = useState("")

  const Signup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(response => {
        setDoc(doc(db, "users", response.user.uid), { fullname, username, email })
      })
      .catch(err => console.error(err))
    router.push("/login")
  }

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
          onChangeText={setEmail}
          style={styles.inputStyle}
          placeholder="email"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.inputStyle}
          placeholder="password"
          secureTextEntry
        />
        <TextInput
          value={fullname}
          onChangeText={setFullname}
          style={styles.inputStyle}
          placeholder="Full name"
        />
        <TextInput
          value={username}
          onChangeText={setUsername}
          style={styles.inputStyle}
          placeholder="Username"
        />
        <TouchableOpacity onPress={Signup} style={styles.logButton}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%", justifyContent: "center", alignItems: "center", backgroundColor: "white" },
  logIn: { width: "80%", height: "70%", borderWidth: 1, borderColor: "#DDDDDD", justifyContent: "flex-start", alignItems: "center", paddingTop: 20, gap: 10 },
  inputStyle: { width: "80%", height: "12%", borderWidth: 1, borderColor: "#DDDDDD", borderRadius: 2, paddingLeft: 10 },
  logButton: { width: "80%", height: "10%", borderWidth: 1, borderColor: "#DDDDDD", backgroundColor: "#4CB5F9", borderRadius: 2, justifyContent: "center", alignItems: "center" }
})
