import React, { useState, useRef, useCallback } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  Animated, 
  Image, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView, 
  ActivityIndicator, 
  RefreshControl 
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, FontAwesome, Feather, AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { FlatList } from "react-native";
import { postData } from "../../src/data";

const HEADER_HEIGHT = 80;

const storiesData = postData.slice(0, 6).map(post => ({
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
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.storiesScroll}
      >
        {storiesData.map((story, index) => (
          <View key={story.id} style={styles.storyItem}>
            <View style={styles.storyImageWrapper}>
              <Image source={story.image} style={styles.storyImage} />
              {index === 0 && (
                <View style={styles.plusIconContainer}>
                  <Ionicons name="add-circle" size={24} color="#3897f0" />
                </View>
              )}
            </View>
            <Text style={styles.storyUsername}>
              {index === 0 ? "Your Story" : story.username}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({
    Billabong: require("../../assets/fonts/Billabong.ttf"),
  });
  const [refreshing, setRefreshing] = useState(false);
  // headerAnim controls the header translation
  const headerAnim = useRef(new Animated.Value(0)).current;
  // prevScrollY tracks the previous scroll offset
  const prevScrollY = useRef(0);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const onScroll = (event) => {
    const currentY = event.nativeEvent.contentOffset.y;
    const diff = currentY - prevScrollY.current;
    prevScrollY.current = currentY;
    // When scrolling down (diff > 0) and past a threshold, hide header.
    if (diff > 5 && currentY > 50) {
      Animated.timing(headerAnim, {
        toValue: -HEADER_HEIGHT,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
    // When scrolling up, show header.
    else if (diff < -5) {
      Animated.timing(headerAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" style={styles.loading} />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#f8f8f8" barStyle="dark-content" />
      <Animated.View 
        style={[
          styles.header, 
          { top: insets.top, transform: [{ translateY: headerAnim }] }
        ]}
      >
        <Text style={styles.logo}>Instagram</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="heart" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconButton, { marginLeft: 15 }]}>
            <Ionicons name="paper-plane-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </Animated.View>
      <FlatList
        data={postData}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={<Stories />}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#333" />}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.contentContainer}
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
                <TouchableOpacity style={styles.actionButton}>
                  <AntDesign name="hearto" size={24} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, { marginLeft: 10 }]}>
                  <FontAwesome name="comment-o" size={24} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, { marginLeft: 10 }]}>
                  <Ionicons name="paper-plane-outline" size={24} color="#333" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.actionButton}>
                <Feather name="bookmark" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <Text style={styles.description}>{item.desc}</Text>
            {item.comment && item.comment.length > 0 && (
              <View style={styles.commentsSection}>
                {item.comment.map((comment, index) => (
                  <View key={index} style={styles.commentRow}>
                    <Image style={styles.commentProfile} source={{ uri: comment.idProfile }} />
                    <Text style={styles.commentText}>
                      <Text style={styles.commentUser}>{comment.id}</Text> {comment.text}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { flex: 1, backgroundColor: "#f8f8f8" },
  header: {
    position: "absolute",
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
    zIndex: 1000,
  },
  logo: { fontSize: 40, fontFamily: "Billabong", color: "#333" },
  headerIcons: { flexDirection: "row", alignItems: "center" },
  iconButton: { padding: 5 },
  contentContainer: { backgroundColor: "#f8f8f8", paddingBottom: 20 },
  storiesContainer: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
  },
  storiesScroll: { paddingHorizontal: 10 },
  storyItem: { alignItems: "center", marginRight: 15 },
  storyImageWrapper: { position: "relative" },
  storyImage: { width: 70, height: 70, borderRadius: 35, borderWidth: 2, borderColor: "#c13584" },
  plusIconContainer: { position: "absolute", bottom: -2, right: -2, backgroundColor: "#fff", borderRadius: 12 },
  storyUsername: { marginTop: 5, fontSize: 12, color: "#333" },
  post: { backgroundColor: "#fff", marginBottom: 15 },
  postHeader: { flexDirection: "row", alignItems: "center", padding: 10 },
  profileImage: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  username: { fontWeight: "bold", fontSize: 16, color: "#333" },
  postImage: { width: "100%", height: 400, backgroundColor: "#ccc" },
  postActions: { flexDirection: "row", justifyContent: "space-between", padding: 10 },
  actionIcons: { flexDirection: "row", alignItems: "center" },
  actionButton: { padding: 5 },
  description: { paddingHorizontal: 10, paddingBottom: 10, fontSize: 14, color: "#333" },
  commentsSection: { paddingHorizontal: 10, paddingVertical: 5, borderTopWidth: 1, borderTopColor: "#eaeaea" },
  commentRow: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  commentProfile: { width: 25, height: 25, borderRadius: 12.5, marginRight: 8 },
  commentText: { fontSize: 13, color: "#555" },
  commentUser: { fontWeight: "bold", color: "#333" },
});
