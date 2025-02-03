import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import PagerView from "react-native-pager-view";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { postData } from "@/src/data";
const index = () => {
  return (
    <View style={styles.container}>
      <View style={styles.homeHeader}>
        <View style={styles.homeText}>
          <Image source={require("@/assets/home/IG logo.png")} />
          <AntDesign name="down" size={16} color="black" />
        </View>
        <View style={styles.headerLogo}>
          <AntDesign name="hearto" size={24} color="black" />
          <Image source={require("@/assets/home/messagelogo.png")} />
          <AntDesign name="plussquareo" size={24} color="black" />
        </View>
      </View>
      <View style={{ height: 105 }}>
        <ScrollView horizontal={true}>
          <Image source={require("@/assets/home/Story user.png")} />
          <Image source={require("@/assets/home/Story user (1).png")} />
          <Image source={require("@/assets/home/Story user (2).png")} />
          <Image source={require("@/assets/home/Story user (3).png")} />
          <Image source={require("@/assets/home/Story user (1).png")} />
          <Image source={require("@/assets/home/Story user (2).png")} />
          <Image source={require("@/assets/home/Story user (3).png")} />
        </ScrollView>
      </View>
      <View style={styles.homePost}>
        <View style={styles.postHeader}>
          <View
            style={{
              width: 84,
              height: 36,
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Image
              style={{ height: 36, width: 36 }}
              source={require("@/assets/images/AccountIcon2.png")}
            />
            <Text style={{ fontSize: 14 }}>Name</Text>
          </View>
          <SimpleLineIcons name="options" size={24} color="black" />
        </View>
        <Image
          source={postData[0].img}
          style={{ width: "100%", height: Dimensions.get("window").width }}
        />
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    flex: 1,
  },
  homeHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "orange",
    paddingTop: 5,
    height: 40,
    paddingBottom: 5,
    paddingLeft: 13,
    paddingRight: 13,
  },
  headerLogo: {
    flexDirection: "row",
    gap: 24,
  },
  homeText: {
    flexDirection: "row",
    gap: 8,
  },
  storyBar: {
    height: 105,
  },
  homePost: {
    // backgroundColor: "blue",
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    justifyContent: "space-between",
    paddingRight: 13,
    paddingLeft: 13,
    paddingTop: 7,
    paddingBottom: 7,
  },
});
