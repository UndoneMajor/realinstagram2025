import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { postData } from "@/src/data";
const onepost = () => {
  const id = useLocalSearchParams();
  console.log(id);
  const postId = id.id;
  const post = postData.find((post) => post.id == postId);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: true });
  }, [navigation]);
  return (
    <View>
      <Image style={styles.postImg} source={post.img} />
      <Text>{post.desc}</Text>
    </View>
  );
};

export default onepost;

const styles = StyleSheet.create({
  postImg: {
    width: 390,
    height: 390,
  },
});
