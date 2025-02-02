import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="home" />
      <Stack.Screen name="posts/[id]" options={{ title: "Post" }} />
      <Stack.Screen
        name="comments"
        options={{
          presentation: "modal",
          title: "Comments",
        }}
      />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
