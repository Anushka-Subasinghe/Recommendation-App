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
import { FontAwesome } from "@expo/vector-icons";
import { Storage } from "expo-storage";
import { ViewPropTypes } from "deprecated-react-native-prop-types";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import FindMe from "./FindMe";
const Checkme = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [openFindMescree,setOpenFindMeScreen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [value, setValue] = useState([
    "italy",
    "spain",
    "barcelona",
    "finland",
  ]);
  const [items, setItems] = useState([
    { label: "Sri Lanka", value: "Sri Lanka" },
    { label: "kaluthara", value: "kaluthara", parent: "Sri Lanka" },
    { label: "colombo", value: "colombo", parent: "Sri Lanka" },
    { label: "gampaha", value: "gampaha", parent: "Sri Lanka" },
    { label: "gall", value: "gall", parent: "Sri Lanka" },
   
  ]);

  
  return (
    <View style={s.container}>
      <View style={s.row1}>
       {
        openFindMescree ? ( <Image source={require("../assets/checkme.jpeg")} style={s.image_1} />):(
          <Image source={require("../assets/findme.jpeg")} style={s.image_1} />
        )
       }
      </View>
      {openFindMescree ? <FindMe handleChangeBackBtn={()=>setOpenFindMeScreen(!openFindMescree)} /> : (<>
      <View style={s.row2}>
        <Text style={s.titleText}>
          This will provide you with infromation about the air pollution on that
          has occured in your desired environmental system and the situation
          after our system's contribution to it.
        </Text>
      </View>
      <View style={s.row3}>
        <TouchableOpacity onPressIn={() => setOpen(!open)}>
          <Text style={s.label}>Set The date</Text>
          <TextInput
            editable={false}
            style={s.input2}
            maxLength={100}
            value={date.toLocaleDateString()}
          />
        </TouchableOpacity>
        <TouchableOpacity onPressIn={() => setOpen2(!open2)}>
          <Text style={s.label}>Set The Time</Text>
          <TextInput
            editable={false}
            style={s.input2}
            maxLength={100}
            value={time.toLocaleTimeString()}
          />
        </TouchableOpacity>
        <Text style={s.label}>Set The Location</Text>
        <DropDownPicker
          open={open3}
          value={value}
          items={items}
          setOpen={setOpen3}
          setValue={setValue}
          setItems={setItems}
          theme="DARK"
          multiple={true}
          mode="BADGE"
          onChangeItem={(item) => {
            setSelectedValue(item.value);
            setOpen3(!open3);
          }}
        />

        {open && (
          <DateTimePicker
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || date;
              setDate(currentDate);
              setOpen(!open);
            }}
            date={date}
          />
        )}
        {open2 && (
          <DateTimePicker
            value={time}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => {
              setTime(new Date(selectedDate || time));
              setOpen2(!open2);
            }}
            date={time}
          />
        )}
      </View>
      <View style={s.row4}>
      <TouchableOpacity onPressIn={(e) =>  setOpenFindMeScreen(!openFindMescree)}>
            <Text style={s.boxText2}>Find</Text>
        </TouchableOpacity>
      </View>
      </>
      )}
    </View>
  );
};

Checkme.propTypes = {
  style: ViewPropTypes.style,
};
const s = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: "white",
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal:10,
    borderWidth: 0,
    flex: 1,
  },
  row1: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    
  },
  row2: {
    
    flexDirection: "row",
    
  },
  row3: {
    flex: 1,
  },
  row4: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "center",
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
    width: '100%',
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
export default Checkme;
