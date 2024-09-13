import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Storage } from 'expo-storage'
import { ViewPropTypes } from "deprecated-react-native-prop-types";

const AirPolutionCard = ({ data }) => {
  const [open, setOpen] = useState(false);
  return (
    <View style={s.container}>
      <TouchableOpacity>
        <View>
          <Text style={s.titleText}>{data?.title}</Text>
        </View>
        <View>
          <Image source={data.image} style={s.image_1} />
        </View>
        <View>
          <Text style={s.pracentageText}>{data?.pracentage}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
AirPolutionCard.propTypes = {
  style: ViewPropTypes.style,
};
const s = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: "white",
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    borderWidth: 0,
    minHeight: 100,
    width: 150,
  },
  flex: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleText: {
    color: "#7C9070",
    fontSize: 25,
    textAlign: "left",
  },
  pracentageText: {
    color: "black",
    fontSize: 15,
    textAlign: "justify",
  },
  image_1: {
    width: 120,
    height: 120,
  },
});

export default AirPolutionCard;
