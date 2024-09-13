import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,ScrollView,Linking
} from "react-native";
import CheckBox from "react-native-check-box";
import { ViewPropTypes } from "deprecated-react-native-prop-types";
import { useNavigation } from "@react-navigation/native";

import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import AirPolutionCard from "../components/AirPullutionCard";
import { selectLocations } from "../redux/reducers/LocationSlice";
import { useSelector } from 'react-redux';
import { Storage } from 'expo-storage'

const AirPolutionScreen = () => {
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false);
  const [pollutionType, setPollutionType] = useState("Mobile Source");
  const [location,setLocation] = useState("")
  const [airPolutionList,setAirPolutionList] = useState([{
    image: require('../assets/airPollution/vehicle.png'),
    title:'NOX',
    pracentage:'47%'
  },{
    image: require('../assets/airPollution/tree.png'),
    title:'CO2',
    pracentage:'18%'
  },{
    image: require('../assets/airPollution/air.png'),
    title:'SO2',
    pracentage:'75%'
  },{
    image: require('../assets/airPollution/air.png'),
    title:'NA2',
    pracentage:'2%'
  },{
    image: require('../assets/airPollution/air.png'),
    title:'H2SO4',
    pracentage:'8%'
  }])

  const getValueFunction = async () => {
    const item = JSON.parse(
      await Storage.getItem({ key: `current_location` })
    )
    setLocation(item?.location)
  };
  useEffect(()=>{
    getValueFunction()
  },[])
  return (
    <View style={s.container}>
      <View style={s.row1}>
        <Text style={s.btnPersonalizeRecommendations}>
          Air Pollution Source
        </Text>
        <View style={s.locationIcon}>
          <MaterialIcons name="location-on" size={24} color="black" />
          <Text>{location ? location : ""}</Text>
        </View>
      </View>
      <View style={s.row2}>
        <View style={s.roundedView}>
          <Text style={s.roundedViewText}>{pollutionType}</Text>
        </View>
        
      </View>
      <View style={s.row3}>
      <View>
        <TouchableOpacity  onPress={()=>{Linking.openURL('https://example.com');}}>
         <Text style={s.linking}>{`➡️ what do you mean as ${pollutionType} Click for more info.`}</Text>
         </TouchableOpacity>
        </View>
        <ScrollView horizontal>
          {airPolutionList.map((item, ind) => (
            <AirPolutionCard data={item} key={ind}/>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
AirPolutionScreen.propTypes = {
  style: ViewPropTypes.style,
};
const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  row1: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
  },
  row2: {
    flex: 4,
    marginVertical: 5,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  row3: {
    flex: 3,
    margin: 10,
    borderRadius: 10,
  },
  roundedView: {
    width: 250,
    height: 250,
    borderWidth: 3,
    backgroundColor: "#F97B22",
    borderRadius: 250,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  roundedViewText: {
    textAlign: "center",
    fontSize: 25,
    color: "white",
  },
  linking:{
    // textDecorationLine:'underline',
    textAlign:'center'
  },
  btnPersonalizeRecommendations: {
    backgroundColor: "#1f5b3c",
    color: "white",
    borderRadius: 10,
    paddingTop: 15,
    textAlign: "center",
    height: 50,
    width: "100%",
  },
  locationIcon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "#D6EFFF",
    borderRadius: 10,
  },
  boxText: {
    fontSize: 10,
    textAlign: "center",
    paddingTop: 45,
  },
  row_1: {
    height: 150,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingTop: 5,
    marginHorizontal: 10,
    borderTopWidth: 2,
    borderColor: "grey",
  },
  status: {
    textAlign: "center",
    width: 200,
    height: 50,
    backgroundColor: "#fed18c",
    marginTop: 40,
    paddingTop: 15,
    borderTopColor: "black",
    borderTopWidth: 2,
    borderRadius: 10,
  },
  row_2: {
    height: 50,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 2,
    borderColor: "grey",
    paddingTop: 5,
    marginHorizontal: 10,
  },
  location: {
    borderRadius: 10,
    backgroundColor: "#fed18c",
    height: 50,
    color: "black",
    textAlign: "center",
    borderColor: "black",
    borderTopWidth: 2,
    paddingTop: 10,
    fontSize: 25,
    textTransform: "uppercase",
  },
  temp: {
    backgroundColor: "#fed18c",
    height: 50,
    width: 140,
    textAlign: "center",
    paddingTop: 15,
    borderTopColor: "black",
    borderTopWidth: 2,
    borderRadius: 10,
  },
  image_1: {
    borderRadius: 10,
    width: 150,
    height: 150,
  },
  image_2: {
    borderRadius: 10,
    width: 50,
    height: 50,
  },
});
export default AirPolutionScreen;
