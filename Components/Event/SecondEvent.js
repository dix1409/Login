import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import DatePicker from "react-native-datepicker";
import { useFonts } from "expo-font";
export default function SecondEvent({ navigation }) {
  const [error, seterror] = useState("");
  const [eventTitle, setTitle] = useState("");
  const [Name, setName] = useState("");
  const [Date, setDate] = useState("");
  const [Location, setLocation] = useState("");
  const [loaded] = useFonts({
    OpanSans: require("../../static/OpenSans/OpenSans-Medium.ttf"),
  });
  const Check = () => {
    if (eventTitle === "") {
      return 0;
    }
    if (Name === "") {
      return 0;
    }
    if (Location === "") {
      return 0;
    }
    return 1;
  };
  const route = useRoute();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.greetingTitle}>
          What are the Details of the Event?
        </Text>
      </View>
      <KeyboardAvoidingView
        style={styles.container}
        // behavior="position"
        // keyboardVerticalOffset={-550}
      >
        <View style={styles.form}>
          <View style={styles.errorMessage}>
            {!!error && <Text style={styles.error}>{error}</Text>}
          </View>
          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Sport Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={(title) => setTitle(title)}
            />
          </View>
          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Event Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={(Name) => setName(Name)}
            />
          </View>
          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Event Time</Text>
            <DatePicker
              style={styles.input}
              mode="date"
              format="DD/MM/YYYY"
              minDate="01-01-2021"
              maxDate="01-01-2050"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: "absolute",
                  right: -5,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  borderColor: "#000",
                  alignItems: "flex-start",
                  borderWidth: 0,
                  borderBottomWidth: 1,
                },

                dateText: {
                  fontSize: 17,
                },
              }}
              onDateChange={(date) => {
                setDate(date);
              }}
            />
          </View>
          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Event Location</Text>
            <TextInput
              style={styles.input}
              onChangeText={(input) => setLocation(input)}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#333",
            borderRadius: 26,
            height: 52,
            justifyContent: "center",
            alignItems: "center",
            width: "60%",
            textAlign: "center",
          }}
          onPress={() => {
            Check()
              ? navigation.navigate("Third", {
                  eventTitle: eventTitle,
                  Name: Name,
                  date: Date,
                  Location: Location,
                })
              : seterror("Please Fill All The Details");
          }}
        >
          <Text style={{ color: "white", fontFamily: "OpanSans" }}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    // justifyContent: "center",
    //
    width: "100%",
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  greetingTitle: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    color: "black",
    fontFamily: "OpanSans",
  },

  form: {
    marginTop: 20,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: "#000",
    fontSize: 12,
    textTransform: "capitalize",
    fontFamily: "OpanSans",
  },
  input: {
    borderBottomColor: "#8a8f9e",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    width: "100%",
    fontSize: 15,
    color: "#161f3d",
  },
  errorMessage: {
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "#FF3B30",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
});
