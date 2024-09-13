import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet, ImageBackground, Alert, ScrollView
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useMemo, useState } from "react";
import RadioGroup from "react-native-radio-buttons-group";
import { ViewPropTypes } from "deprecated-react-native-prop-types";
import { useNavigation } from "@react-navigation/native";
import { Storage } from 'expo-storage';

const PersonalTab = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [age, setAge] = useState(0);
  const [name, setName] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedId1, setSelectedId1] = useState();
  const [selectedId2, setSelectedId2] = useState();
  const [selectedId3, setSelectedId3] = useState();
  const [selectedId4, setSelectedId4] = useState();
  const [selectedId5, setSelectedId5] = useState();

  const validateForm = async () => {

    if (!name.trim()) {
      Alert.alert("Validation Error", "Please enter your name.");
    } else if (age === 0) {
      Alert.alert("Validation Error", "Please select your birthday.");
    } else if (!selectedId1) {
      Alert.alert("Validation Error", "Please select your gender.");
    } else if (!selectedId2) {
      Alert.alert("Validation Error", "Please select your background.");
    } else if (!selectedId3) {
      Alert.alert("Validation Error", "Please select your smoking status.");
    } else if (!selectedId4) {
      Alert.alert(
          "Validation Error",
          "Please select your preferred mode of transportation."
      );
    } else {
      // All validation checks pass; navigate to the next screen
      const personalData = {
        name,
        date,
        age,
        "gender": selectedId1,
        "background": selectedId2,
        "smoking": selectedId3,
        "transportation": selectedId4,
        "pregnant": selectedId5,
      };

      try {
        // Save personal data to AsyncStorage
        await Storage.setItem({key: 'personal_data', value: JSON.stringify(personalData)});

        // Navigate to the HealthTab
        navigation.navigate('Health');
      } catch (error) {
        // Handle AsyncStorage error
        console.error('Error saving personal data:', error);
      }
    }
  };

  const genderRadioButtons = useMemo(
    () => [
      {
        id: "0",
        label: (
            <Text style={{color: '#FFFFFF', fontSize: 18}}>{'Male'}</Text>
        ),
        value: "Male",
        color: "white",
      },
      {
        id: "1",
        label: (
            <Text style={{color: '#FFFFFF', fontSize: 18}}>{'Female'}</Text>
        ),
        value: "Female",
        color: "white",
      },
    ],
    []
  );
  const backgroundRadioButtons = useMemo(
    () => [
      {
        id: "1",
        label: (
            <Text style={{color: '#FFFFFF', fontSize: 18}}>{'Outdoor'}</Text>
        ),
        value: "Outdoor",
        color: "white",
      },
      {
        id: "2",
        label: (
            <Text style={{color: '#FFFFFF', fontSize: 18}}>{'Indoor'}</Text>
        ),
        value: "Indoor",
        color: "white",
      },
    ],
    []
  );

  const smokingRadioButtons = useMemo(
    () => [
      {
        id: "0",
        label: (
            <Text style={{color: '#FFFFFF', fontSize: 18}}>{'Yes'}</Text>
        ),
        value: "Yes",
        color: "white",
      },
      {
        id: "1",
        label: (
            <Text style={{color: '#FFFFFF', fontSize: 18}}>{'No'}</Text>
        ),
        value: "No",
        color: "white",
      },
    ],
    []
  );

  const pregnantRadioButtons = useMemo(
      () => [
        {
          id: "0",
          label: (
              <Text style={{color: '#FFFFFF', fontSize: 18}}>{'Yes'}</Text>
          ),
          value: "Yes",
          color: "white",
        },
        {
          id: "1",
          label: (
              <Text style={{color: '#FFFFFF', fontSize: 18}}>{'No'}</Text>
          ),
          value: "No",
          color: "white",
        },
      ],
      []
  );

  const transpotationRadioButtons = useMemo(
    () => [
      {
        id: "2",
        label: (
            <Text style={{color: '#FFFFFF', fontSize: 18}}>{'By Foot'}</Text>
        ),
        value: "foot",
        color: "white",
        textColor: "white"
      },
      {
        id: "1",
        label: (
            <Text style={{color: '#FFFFFF', fontSize: 18}}>{'Private Vehicle'}</Text>
        ),
        value: "private",
        color: "white",
      },
      {
        id: "0",
        label: (
            <Text style={{color: '#FFFFFF', fontSize: 18}}>{'Public Transport'}</Text>
        ),
        value: "public",
        color: "white",
      }
    ],
    []
  );

  function calculateAge(birthDate) {
    const currentDate = new Date();
    const birthYear = birthDate.getFullYear();
    const birthMonth = birthDate.getMonth();
    const birthDay = birthDate.getDate();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    let age = currentYear - birthYear;
    if (
      currentMonth < birthMonth ||
      (currentMonth === birthMonth && currentDay < birthDay)
    ) {
      age--;
    }
    return age;
  }

  const currentDate = new Date();
  const oneYearAgo = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());

  return (
      <ScrollView>
        <ImageBackground style={s.container} source={require("../../assets/unsplash.jpg")}>
          <View>
            <View style={s.col}>
              <Text style={s.label}>Name</Text>
              <TextInput
                  style={s.input}
                  onChangeText={(text) => setName(text)}
                  value={name}
              />
            </View>

            <View style={s.row}>
              <View>
                <TouchableOpacity onPressIn={() => setOpen(!open)}>
                  <Text style={s.label}>Birthday</Text>
                  <TextInput
                      editable={false}
                      style={s.input2}
                      maxLength={100}
                      value={date.toDateString()}
                  />
                </TouchableOpacity>
                {open && (
                    <DateTimePicker
                        maximumDate={oneYearAgo}
                        value={date}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={(event, selectedDate) => {
                          const currentDate = selectedDate || date;
                          setShowPicker(Platform.OS === "ios");
                          setDate(currentDate);
                          const birthDate = new Date(currentDate);
                          const ag = calculateAge(birthDate);
                          setAge(ag);
                          setOpen(!open);
                        }}
                        date={date}
                    />
                )}
              </View>
              <View>
                <Text style={s.label}>Age</Text>
                <TextInput
                    editable={false}
                    style={s.input2}
                    keyboardType="numeric"
                    maxLength={3}
                    value={age == 0 ? "" : age.toString()}
                    onChangeText={(text) => setAge(parseInt(text, 10))}
                />
              </View>
            </View>

            <View style={s.row}>
              <View>
                <Text style={s.label}>Gender</Text>
                <RadioGroup
                    containerStyle={s.radio}
                    radioButtons={genderRadioButtons}
                    onPress={setSelectedId1}
                    selectedId={selectedId1}
                />
              </View>
              <View>
                <Text style={s.label}>Background</Text>
                <RadioGroup
                    containerStyle={s.radio}
                    radioButtons={backgroundRadioButtons}
                    onPress={setSelectedId2}
                    selectedId={selectedId2}
                />
              </View>
            </View>

            <View style={s.col}>
              <Text style={s.label}>Smoking Status</Text>
              <RadioGroup
                  containerStyle={s.radio}
                  radioButtons={smokingRadioButtons}
                  onPress={setSelectedId3}
                  selectedId={selectedId3}
              />
            </View>

            <View>
              <Text style={s.label}>Preferred mode of transportation</Text>
              <RadioGroup
                  containerStyle={s.radio}
                  radioButtons={transpotationRadioButtons}
                  onPress={setSelectedId4}
                  selectedId={selectedId4}
              />
            </View>
            <View>
              <Text style={s.label}>Pregnant?</Text>
              <RadioGroup
                  containerStyle={s.radio}
                  radioButtons={pregnantRadioButtons}
                  onPress={setSelectedId5}
                  selectedId={selectedId5}
              />
            </View>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity onPress={() => validateForm()}>
                <Text style={s.boxText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
  );
};

PersonalTab.propTypes = {
  style: ViewPropTypes.style,
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: "white",
    padding: 10,
    marginVertical: 2,
    marginHorizontal: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  col: {
    flexDirection: "column",
  },
  label: {
    fontSize: 15,
    color: "white",
    paddingVertical: 5,
    width: 200,
  },
  input: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    fontSize: 15,
    textDecorationLine: "none",
    paddingHorizontal: 5,
    color: "white"
  },
  input2: {
    width: 140,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    fontSize: 15,
    textDecorationLine: "none",
    paddingHorizontal: 5,
    color: "white"
  },
  radio: {
    textAlign: "left",
    alignItems: "baseline",
  },
  boxText: {
    width: 100,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#D6EFFF",
    textAlign: "center",
    paddingTop: 10,
    fontSize: 20,
    alignItems: "center",
  },
});
export default PersonalTab;
