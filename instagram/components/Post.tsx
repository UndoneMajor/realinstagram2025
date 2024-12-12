import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import PagerView from "react-native-pager-view";
import { useRouter, Link } from "expo-router";
import { postData } from "@/src/data";
const Post = () => {
  const ref = useRef();
  const router = useRouter();
  const [pagePosition, setPagePosition] = useState(0);
  return (
    <View style={styles.container}>
      {" "}
      <View style={styles.headerIcons}>
        {" "}
        <TouchableOpacity
          onPress={() => ref.current?.setPage(0)}
          style={[styles.icons, pagePosition == 0 && styles.activeIcons]}
        >
          <Image source={require("../assets/profile/Icons.png")} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => ref.current?.setPage(1)}
          style={[styles.icons, pagePosition == 1 && styles.activeIcons]}
        >
          {" "}
          <Image source={require("../assets/profile/Icons-1.png")} />{" "}
        </TouchableOpacity>{" "}
        <TouchableOpacity
          onPress={() => ref.current?.setPage(2)}
          style={[styles.icons, pagePosition == 2 && styles.activeIcons]}
        >
          {" "}
          <Image source={require("../assets/profile/Icons-2.png")} />{" "}
        </TouchableOpacity>{" "}
      </View>{" "}
      <PagerView
        ref={ref}
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={(e) => setPagePosition(e.nativeEvent.position)}
      >
        <ScrollView>
          <View key="1" style={styles.page1}>
            {postData.map((medee) => (
              <View>
                <Link href={"/posts/" + medee.id} asChild>
                  <TouchableOpacity>
                    <Image style={styles.postImage} source={medee.img} />
                  </TouchableOpacity>
                </Link>
              </View>
            ))}
          </View>
        </ScrollView>
        <View key="2">
          <Text>Second page</Text>
        </View>
        <View key="3">
          <Text>Third page</Text>
        </View>
      </PagerView>
    </View>
  );
};
export default Post;
const styles = StyleSheet.create({
  page1: { flexDirection: "row", flexWrap: "wrap", width: 390 },
  postImage: { width: 129.31, height: 129.31 },
  pagerView: { flex: 1 },
  container: {
    flex: 1,
  },
  headerIcons: {
    flexDirection: "row",
    height: 50,
    paddingTop: 5,
    justifyContent: "center",
  },
  icons: {
    width: 120,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  activeIcons: { borderBottomWidth: 2, borderBottomColor: "lightgray" },
});
