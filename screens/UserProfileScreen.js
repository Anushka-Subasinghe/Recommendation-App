import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PersonalTab from "../components/personalTab/PersonalTab";
import HealthTab from "../components/personalTab/HealthTab";
import { ViewPropTypes } from 'deprecated-react-native-prop-types';


const Tab = createMaterialTopTabNavigator();
const UserProfileScreen = () => {
  
  return (
        <Tab.Navigator>
          <Tab.Screen name="Personal" component={PersonalTab} />
          <Tab.Screen name="Health" component={HealthTab} />
        </Tab.Navigator>
  );
};
UserProfileScreen.propTypes = {
  style: ViewPropTypes.style,
};

const styles = StyleSheet.create({
  tab: {
    backgroundColor: "#f4511e",
    padding: 10,
  },
  tabText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default UserProfileScreen;
