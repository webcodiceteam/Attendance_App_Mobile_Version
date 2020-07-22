import React, { useState } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import HeaderComp from "../Header";

const AttendanceStudent = ({ navigation }) => {
  const [name, setName] = useState("");

  AsyncStorage.getItem("user").then((data) => {
    setName(data);
  });

  const logout = () => {
    AsyncStorage.removeItem("token");
  };

  const backAction = () => {
    AsyncStorage.removeItem("user").then(() => console.log("success"));
  };

  return (
    <View style={styles.container}>
      <HeaderComp navigation={navigation} />
      <Text style={styles.welcome}>Attendance</Text>
      <Text style={styles.welcome}>
        <Text>Welcome</Text>
        <Text> {name} </Text>
      </Text>
      <View style={{ marginLeft: -5 }}>
        <View style={{ flexDirection: "row", margin: 10 }}>
          <Text
            style={styles.textstyle}
            onPress={() => navigation.navigate("QR_Scan")}
          >
            Scan QR
          </Text>
          <Text
            style={styles.textstyle}
            onPress={() => navigation.navigate("MyAtendanceStudent")}
          >
            My Attendance
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
  },
  mycard: {
    marginRight: 30,
    width: "50%",
    padding: 10,
    height: "20%",
    borderRadius: 5,
    shadowColor: "#fff",
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  cardView: {
    flexDirection: "row",
    padding: 5,
  },
  textstyle: {
    width: "50%",
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
    fontSize: 20,
    textAlign: "center",
    borderRadius: 5,
    borderColor: "#333",
    borderWidth: 1,
    padding: 8,
  },
});
export default AttendanceStudent;
