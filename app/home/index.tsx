import React, { useState, useCallback } from "react";
import { useFonts } from "expo-font";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Ionicons, FontAwesome, Feather, AntDesign } from "@expo/vector-icons";
import { postData } from "../../src/data";

const storiesData = postData.slice(0, 6).map((post) => ({
  id: post.id.toString(),
  username: `User${post.id}`,
  image: post.img,
}));

const getProfileImageForUser = (userId) => {
  const defaultImages = [
    "https://randomuser.me/api/portraits/med/men/75.jpg",
    "https://randomuser.me/api/portraits/med/women/65.jpg",
    "https://randomuser.me/api/portraits/med/men/55.jpg",
    "https://randomuser.me/api/portraits/med/women/45.jpg",
    "https://randomuser.me/api/portraits/med/men/35.jpg",
    "https://randomuser.me/api/portraits/med/women/25.jpg",
    "https://randomuser.me/api/portraits/med/men/15.jpg",
    "https://randomuser.me/api/portraits/med/women/5.jpg",
  ];
  const index = (parseInt(userId) - 1) % defaultImages.length;
  return defaultImages[index];
};

const Stories = () => {
  return (
    <View style={styles.storiesContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {storiesData.map((story) => (
          <View key={story.id} style={styles.storyItem}>
            <Image source={story.image} style={styles.storyImage} />
            <Text style={styles.storyUsername}>{story.username}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const HomeScreen = () => {
  const [fontsLoaded] = useFonts({
    Billabong: require("../../assets/fonts/Billabong.ttf"),
  });

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" style={styles.loading} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.logo}>Instagram</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Feather name="heart" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 15 }}>
            <Ionicons name="paper-plane-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={postData}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={<Stories />}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <View style={styles.post}>
            <View style={styles.postHeader}>
              <Image
                style={styles.profileImage}
                source={
                  item.userImage
                    ? typeof item.userImage === "string"
                      ? { uri: item.userImage }
                      : item.userImage
                    : { uri: getProfileImageForUser(item.id) }
                }
              />
              <Text style={styles.username}>{`User${item.id}`}</Text>
            </View>
            <Image style={styles.postImage} source={item.img} />
            <View style={styles.postActions}>
              <View style={styles.actionIcons}>
                <TouchableOpacity>
                  <AntDesign name="hearto" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 10 }}>
                  <FontAwesome name="comment-o" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 10 }}>
                  <Ionicons name="paper-plane-outline" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <Feather name="bookmark" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <Text style={styles.description}>{item.desc}</Text>
            {item.comment && item.comment.length > 0 && (
              <View style={styles.commentsSection}>
                {item.comment.map((comment, index) => (
                  <View key={index} style={styles.commentRow}>
                    <Image
                      style={styles.commentProfile}
                      source={{ uri: comment.idProfile }}
                    />
                    <Text style={styles.commentText}>
                      <Text style={styles.commentUser}>{comment.id}</Text>{" "}
                      {comment.text}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
  },
  logo: {
    fontSize: 40,
    fontFamily: "Billabong",
  },
  headerIcons: {
    flexDirection: "row",
  },
  storiesContainer: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
  },
  storyItem: {
    alignItems: "center",
    marginHorizontal: 8,
  },
  storyImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#c13584",
  },
  storyUsername: {
    marginTop: 5,
    fontSize: 12,
    color: "#333",
  },
  post: {
    marginBottom: 20,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
  },
  postImage: {
    width: "100%",
    height: 400,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  actionIcons: {
    flexDirection: "row",
  },
  description: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 14,
  },
  commentsSection: {
    paddingHorizontal: 10,
    marginTop: 5,
  },
  commentRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  commentProfile: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    marginRight: 8,
  },
  commentText: {
    fontSize: 13,
  },
  commentUser: {
    fontWeight: "bold",
  },
});
