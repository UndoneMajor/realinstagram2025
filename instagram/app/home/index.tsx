import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PagerView from "react-native-pager-view";
const index = () => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    width: 390,
  },
  pagerView: {
    flex: 1,
  },
});
