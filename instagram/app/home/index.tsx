import React, { useRef, useState } from "react";
import { Dimensions, Image, Animated, StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { postData } from "@/src/data";

const HEADER_HEIGHT = 50;
const HEADER_EXTRA = 20;
const TOTAL_HEADER_HEIGHT = HEADER_HEIGHT + HEADER_EXTRA;

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const clampedScrollY = Animated.diffClamp(scrollY, 0, TOTAL_HEADER_HEIGHT);
  const headerTranslateY = clampedScrollY.interpolate({
    inputRange: [0, TOTAL_HEADER_HEIGHT],
    outputRange: [0, -TOTAL_HEADER_HEIGHT],
    extrapolate: "clamp"
  });
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.headerWrapper, { top: insets.top }]}>
        <Animated.View style={[styles.homeHeader, { transform: [{ translateY: headerTranslateY }], paddingTop: insets.top }]}>
          <View style={styles.homeText}>
            <Image source={require("@/assets/home/IG logo.png")} style={styles.logo} />
            <AntDesign name="down" size={16} color="black" />
          </View>
          <View style={styles.headerLogo}>
            <AntDesign name="hearto" size={24} color="black" style={styles.headerIcon} />
            <Image source={require("@/assets/home/messagelogo.png")} style={styles.headerIcon} />
            <AntDesign name="plussquareo" size={24} color="black" style={styles.headerIcon} />
          </View>
        </Animated.View>
      </View>
      <Animated.ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingTop: TOTAL_HEADER_HEIGHT + 20, paddingBottom: insets.bottom + 20 }}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
      >
        <View style={styles.storyContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.storyItem}>
              <Image source={require("@/assets/home/Story user.png")} style={styles.storyImage} />
              <Text style={styles.storyText}>Your Story</Text>
            </View>
            <View style={styles.storyItem}>
              <Image source={require("@/assets/home/Story user (1).png")} style={styles.storyImage} />
              <Text style={styles.storyText}>Friend</Text>
            </View>
            <View style={styles.storyItem}>
              <Image source={require("@/assets/home/Story user (2).png")} style={styles.storyImage} />
              <Text style={styles.storyText}>Friend</Text>
            </View>
            <View style={styles.storyItem}>
              <Image source={require("@/assets/home/Story user (3).png")} style={styles.storyImage} />
              <Text style={styles.storyText}>Friend</Text>
            </View>
          </ScrollView>
        </View>
        {postData.map(post => (
          <View style={styles.homePost} key={post.id}>
            <View style={styles.postHeader}>
              <View style={styles.postHeaderLeft}>
                <Image source={post.profileImage} style={styles.postUserIcon} />
                <Text style={styles.postUserName}>{post.profileName}</Text>
              </View>
              <SimpleLineIcons name="options" size={24} color="black" />
            </View>
            <Image source={post.img} style={{ width: "100%", height: Dimensions.get("window").width, marginBottom: 10 }} />
            <View style={styles.interactionRow}>
              <View style={styles.leftIcons}>
                <AntDesign name="hearto" size={24} color="black" />
                <TouchableOpacity onPress={() => { setSelectedPost(post); setCommentModalVisible(true); }}>
                  <SimpleLineIcons name="speech" size={24} color="black" style={styles.iconSpacing} />
                </TouchableOpacity>
                <SimpleLineIcons name="paper-plane" size={24} color="black" style={styles.iconSpacing} />
              </View>
              <SimpleLineIcons name="bookmark" size={24} color="black" />
            </View>
            <View style={styles.postFooter}>
              <Text style={styles.postDesc}>{post.desc}</Text>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
      <Modal visible={commentModalVisible} animationType="slide" onRequestClose={() => setCommentModalVisible(false)}>
        <SafeAreaView style={modalStyles.modalContainer}>
          <View style={modalStyles.header}>
            <TouchableOpacity onPress={() => setCommentModalVisible(false)}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text style={modalStyles.headerTitle}>Comments</Text>
          </View>
          <ScrollView style={modalStyles.commentsContainer}>
            {selectedPost && selectedPost.comments.map((comment, index) => (
              <View key={index} style={modalStyles.commentItem}>
                <Image source={{ uri: comment.idProfileImg }} style={modalStyles.commentUserIcon} />
                <Text style={modalStyles.commentText}>{comment.comment}</Text>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  headerWrapper: { position: "absolute", left: 0, right: 0, height: TOTAL_HEADER_HEIGHT, overflow: "hidden", zIndex: 1000 },
  scrollContainer: { flex: 1 },
  homeHeader: { height: TOTAL_HEADER_HEIGHT, paddingHorizontal: 13, backgroundColor: "white", flexDirection: "row", justifyContent: "space-between", alignItems: "center", elevation: 4 },
  homeText: { flexDirection: "row", alignItems: "center" },
  headerLogo: { flexDirection: "row", alignItems: "center" },
  logo: { width: 100, height: 30, resizeMode: "contain" },
  headerIcon: { marginHorizontal: 5 },
  storyContainer: { height: 120, marginBottom: 10, paddingHorizontal: 10 },
  storyItem: { alignItems: "center", marginRight: 15 },
  storyImage: { width: 80, height: 80, borderRadius: 40, borderWidth: 3, borderColor: "#C13584", marginBottom: 5 },
  storyText: { fontSize: 12 },
  homePost: { marginBottom: 20, backgroundColor: "#fff" },
  postHeader: { flexDirection: "row", alignItems: "center", height: 50, justifyContent: "space-between", paddingHorizontal: 13, paddingVertical: 7 },
  postHeaderLeft: { flexDirection: "row", alignItems: "center" },
  postUserIcon: { height: 36, width: 36, borderRadius: 18 },
  postUserName: { fontSize: 14, marginLeft: 8 },
  interactionRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 13, paddingVertical: 7 },
  leftIcons: { flexDirection: "row", alignItems: "center" },
  iconSpacing: { marginLeft: 15 },
  postFooter: { paddingHorizontal: 13, paddingVertical: 7 },
  postDesc: { fontSize: 14 }
});

const modalStyles = StyleSheet.create({
  modalContainer: { flex: 1, backgroundColor: "white" },
  header: { flexDirection: "row", alignItems: "center", padding: 15, borderBottomWidth: 1, borderBottomColor: "#ccc" },
  headerTitle: { fontSize: 18, marginLeft: 15 },
  commentsContainer: { padding: 15 },
  commentItem: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  commentUserIcon: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  commentText: { fontSize: 14 }
});
