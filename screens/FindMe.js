import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    StyleSheet,
    Image,
    Linking,
    TextInput,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { ViewPropTypes } from "deprecated-react-native-prop-types";
import { useNavigation } from "@react-navigation/native";

const FindMe = ({handleChangeBackBtn}) => {
    const naviagtion  = useNavigation()
  return (
    <View style={s.container}>
      <View style={s.row2}>
        <TouchableOpacity style={s.textRow}>
          <Text style={s.label}>Locaton : </Text>
          <Text>Malabe</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.textRow}>
          <Text style={s.label}>Date :</Text>
          <Text>5/16/2023</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.textRow}>
          <Text style={s.label}>Current Value States :</Text>
          <Text>Good</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.textRow}>
          <Text style={s.label}>Current Value :</Text>
          <Text>45</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.textRow}>
          <Text style={s.label}>Count of Drones :</Text>
          <Text>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.textRow}>
          <Text style={s.label}>Abosorbe CO2 Weight :</Text>
          <Text>500g</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.textRow}>
          <Text style={s.label}>Abosorbe Media : </Text>
          <Text>KOH Powder</Text>
        </TouchableOpacity>
      </View>
      <View style={s.row4}>
        <TouchableOpacity onPressIn={(e) => handleChangeBackBtn()}>
            <Text style={s.boxText2}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPressIn={(e) =>  naviagtion.navigate("Home")}>
            <Text style={s.boxText3}>Exist</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
FindMe.propTypes = {
    style: ViewPropTypes.style,
  };
  const s = StyleSheet.create({
    container: {
      borderRadius: 5,
      backgroundColor: "white",
      marginVertical: 10,
      // marginHorizontal: 10,
      borderWidth: 0,
      flex: 1,
    },
    row1: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    textRow:{
        
        flexDirection:'row'
    },
    row2: {
      flex: 1,
    },
    row3: {
      flex: 1,
    },
    row4: {
      flex: 0.5,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },
    flex: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    titleText: {
      color: "#000",
      fontSize: 15,
      textAlign: "justify",
    },
    pracentageText: {
      color: "black",
      fontSize: 15,
      textAlign: "justify",
    },
    image_1: {
      width: 200,
      height: 200,
      borderRadius: 10,
    },boxText2:{
      width:100,
      height:50,
      borderRadius:10,
      backgroundColor: "#318f5e",
      textAlign:'center',
      paddingTop:10,
      fontSize:20,
      alignItems:'center',
      color:'white'
    },boxText3:{
        width:100,
        height:50,
        borderRadius:10,
        backgroundColor: "red",
        textAlign:'center',
        paddingTop:10,
        fontSize:20,
        alignItems:'center',
        color:'white'
      },input2:{
      width:140,
      borderColor:'black',
      borderWidth:1,
      borderRadius:10,
      height:40,
      fontSize:15,
      textDecorationLine:'none',
      paddingHorizontal:5
     },label:{
      fontSize:15,
      color:'#318f5e',
      paddingVertical:5,
      width:200
    },
  });

  
export default FindMe