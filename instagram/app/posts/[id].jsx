import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import { postData } from "@/src/data";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
const onepost = () => {
  const id = useLocalSearchParams();
  const postId = id.id;
  const post = postData.find((post) => post.id == postId);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: true });
  }, [navigation]);
  return (
    <View>
      <Image style={styles.postImg} source={post.img} />
      <View style={styles.commentBar}>
        <View style={styles.commentButtons}>
          <AntDesign name="hearto" size={24} color="black" />
          <Link
            href={{
              pathname: "/comments",
              params: { id: postId },
            }}
          >
            <FontAwesome5 name="comment" size={24} color="black" />
          </Link>
          <Text
            style={{
              fontSize: 24,
              margin: 0,
              padding: 0,
              justifyContent: "flex-start",
            }}
          >
            {post.comment.length}
          </Text>
          <FontAwesome name="share-square" size={24} color="black" />
        </View>
        <View>
          <Feather name="bookmark" size={24} color="black" />
        </View>
      </View>
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
  commentBar: {
    margin: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentButtons: {
    flexDirection: "row",
    alignContent: "center",
    gap: 10,
  },
});
