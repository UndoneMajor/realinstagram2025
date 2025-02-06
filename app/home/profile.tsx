import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Post from "@/components/Post";
import { Link } from "expo-router";
const profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileFollowers}>
        <Image
          style={styles.proImg}
          source={require("../../assets/images/AccountIcon2.png")}
        />
        <View style={styles.followersMain}>
          <View style={styles.followersNumber}>
            <Text style={styles.bold}>1234</Text>
            <Text>Posts</Text>
          </View>
          <View style={styles.followersNumber}>
            <Text style={styles.bold}>5678</Text>
            <Text>Followers</Text>
          </View>
          <View style={styles.followersNumber}>
            <Text style={styles.bold}>9101</Text>
            <Text>Following</Text>
          </View>
        </View>
      </View>
      <View style={styles.bio}>
        <View style={styles.bioText}>
          <Text style={styles.bold}>Username</Text>
          <Text>Category/Genre text</Text>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam,
            tenetur.
          </Text>
          <Text style={styles.link}>Link goes here</Text>
        </View>
        <View style={styles.bioFollowed}>
          <Image source={require("../../assets/images/avatars.png")} />
          <Text style={styles.bioFollowedText}>
            Followed by username, username and 100 others
          </Text>
        </View>
        <View style={styles.bioEdit}></View>
      </View>
      <Post />
    </View>
  );
};
export default profile;
const styles = StyleSheet.create({
  container: {
    width: 390,
    flex: 1,
    backgroundColor: "white",
  },
  bioFollowedText: {
    width: 300,
    height: 32,
    fontSize: 13,
  },
  link: {},
  bioText: {
    width: 366,
    height: 89,
  },
  bioFollowed: {
    width: 366,
    height: 36,
    fontSize: 13,
    flexDirection: "row",
    alignItems: "center",
  },
  bioEdit: {
    width: 366,
    height: 30,
  },
  bio: {
    fontSize: 13,
    width: 390,
    height: 195,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  profileFollowers: {
    width: 390,
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 60,
  },
  proImg: {
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
  },
  followersMain: {
    width: 197,
    height: 35,
    flexDirection: "row",
    justifyContent: "space-between", 
  },
  followersNumber: {
    flexDirection: "column",
    alignItems: "center",
    width: 56,
    height: 35,
    fontSize: 14,
  },
  bold: {
    fontWeight: "bold",
  },
});
