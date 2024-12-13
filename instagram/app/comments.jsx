import { useLocalSearchParams, useNavigation } from "expo-router";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import { postData } from "@/src/data";
import { useEffect } from "react";
export default function Modal() {
  const id = useLocalSearchParams();
  const postId = id.id;
  const post = postData.find((post) => post.id == postId);
  console.log(postId);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: true });
  }, [navigation]);
  return (
    <View style={styles.container}>
      {post?.comment?.map((comment) => (
        <View style={styles.oneComment}>
          <Image
            style={{ width: 24, height: 24, borderRadius: 12 }}
            source={{ uri: comment.idProfile }}
          />
          <Text>{comment.text}</Text>
        </View>
      ))}
      <View style={styles.oneComment}>
        <Image
          style={styles.proImg}
          source={require("../assets/images/AccountIcon2.png")}
        />
        <TextInput placeholder="Add comment" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    margin: 20,
  },
  oneComment: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  proImg: {
    width: 24,
    height: 24,
    borderRadius: 90 / 2,
  },
});
