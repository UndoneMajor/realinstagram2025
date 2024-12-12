import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import MaterialTopTabNavigationOptions from "react-native-pager-view";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blue",
        tabBarStyle: { width: 390, height: 56 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Нүүр хуудас",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="account-circle" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
