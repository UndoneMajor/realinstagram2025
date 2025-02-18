import React, { useRef } from "react";
import {
  Dimensions,
  Image,
  Animated,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
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
    extrapolate: "clamp",
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.headerWrapper, { top: insets.top }]}>
        <Animated.View
          style={[
            styles.homeHeader,
            {
              transform: [{ translateY: headerTranslateY }],
              paddingTop: insets.top,
            },
          ]}
        >
          <View style={styles.homeText}>
            <Image source={require("@/assets/home/IG logo.png")} />
            <AntDesign name="down" size={16} color="black" />
          </View>
          <View style={styles.headerLogo}>
            <AntDesign name="hearto" size={24} color="black" />
            <Image source={require("@/assets/home/messagelogo.png")} />
            <AntDesign name="plussquareo" size={24} color="black" />
          </View>
        </Animated.View>
      </View>
      <Animated.ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingTop: TOTAL_HEADER_HEIGHT + 20 }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <View style={styles.storyContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.storyItem}>
              <Image
                source={require("@/assets/home/Story user.png")}
                style={styles.storyImage}
              />
              <Text style={styles.storyText}>Your Story</Text>
            </View>
            <View style={styles.storyItem}>
              <Image
                source={require("@/assets/home/Story user (1).png")}
                style={styles.storyImage}
              />
              <Text style={styles.storyText}>Friend</Text>
            </View>
            <View style={styles.storyItem}>
              <Image
                source={require("@/assets/home/Story user (2).png")}
                style={styles.storyImage}
              />
              <Text style={styles.storyText}>Friend</Text>
            </View>
            <View style={styles.storyItem}>
              <Image
                source={require("@/assets/home/Story user (3).png")}
                style={styles.storyImage}
              />
              <Text style={styles.storyText}>Friend</Text>
            </View>
          </ScrollView>
        </View>
        {postData.map((post) => (
          <View style={styles.homePost} key={post.id}>
            <View style={styles.postHeader}>
              <View style={styles.postHeaderLeft}>
                <Image
                  style={styles.postUserIcon}
                  source={post.profileImage}
                />
                <Text style={styles.postUserName}>{post.profileName}</Text>
              </View>
              <SimpleLineIcons name="options" size={24} color="black" />
            </View>
            <Image
              source={post.img}
              style={{
                width: "100%",
                height: Dimensions.get("window").width,
              }}
            />
            <View style={styles.postFooter}>
              <Text style={styles.postDesc}>{post.desc}</Text>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  headerWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    height: TOTAL_HEADER_HEIGHT,
    overflow: "hidden",
    zIndex: 1000,
  },
  scrollContainer: { flex: 1 },
  homeHeader: {
    height: TOTAL_HEADER_HEIGHT,
    paddingHorizontal: 13,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
  },
  homeText: { flexDirection: "row", alignItems: "center" },
  headerLogo: { flexDirection: "row", alignItems: "center" },
  storyContainer: {
    height: 120,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  storyItem: {
    alignItems: "center",
    marginRight: 15,
  },
  storyImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#C13584",
    marginBottom: 5,
  },
  storyText: { fontSize: 12 },
  homePost: { marginBottom: 20 },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    justifyContent: "space-between",
    paddingHorizontal: 13,
    paddingVertical: 7,
  },
  postHeaderLeft: { flexDirection: "row", alignItems: "center" },
  postUserIcon: { height: 36, width: 36, borderRadius: 18 },
  postUserName: { fontSize: 14, marginLeft: 8 },
  postFooter: { paddingHorizontal: 13, paddingVertical: 7 },
  postDesc: { fontSize: 14 },
});
