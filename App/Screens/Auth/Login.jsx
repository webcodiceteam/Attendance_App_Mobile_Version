import React, { useState } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { JSHash, CONSTANTS } from "react-native-hash";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

export default function Login({ navigation }) {
  const [username, setUername] = useState("");
  const [password, setPassword] = useState("");
  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem("token")
        .then((x) => {
          if (x !== null) {
            axios
              .post("http://krishma.webcodice.com/react-native/axios.php", {
                request: 20,
                token: x,
              })
              .then((response) => {
                if (response.data == "User not valid") {
                  alert(response.data);
                } else {
                  AsyncStorage.setItem("token", x);
                  AsyncStorage.setItem("role", response.data["0"].role);
                  if (response.data["0"].role == "teacher") {
                    AsyncStorage.setItem("user", response.data["0"].username);
                    navigation.navigate("Teacher");
                  } else if (response.data["0"].role == "student") {
                    AsyncStorage.setItem("user", response.data["0"].username);
                    navigation.navigate("Student");
                  } else if (response.data["0"].role == "admin") {
                    AsyncStorage.setItem("user", response.data["0"].username);
                    navigation.navigate("Admin");
                  }
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        })
        .catch((err) => console.log(err));
      return () => {};
    }, [])
  );
  const handleSubmit = () => {
    if (username == "") {
      alert("Please Enter Name.");
    } else if (password == "") {
      alert("Please Enter Password.");
    } else if (username == "" || password == "") {
      alert("All fields are required to fill.");
    } else if (username != "" || password != "") {
      JSHash(username + password, CONSTANTS.HashAlgorithms.sha256)
        .then((hash) => {
          axios
            .post(
              "http://harman.webcodice.com/nonRoot/react/React_Native_Attendance/axios.php",
              {
                request: 6,
                username: username,
                password: password,
                token: hash,
              }
            )
            .then((response) => {
              if (response.data == "User not valid") {
                alert(response.data);
              } else {
                AsyncStorage.setItem("token", hash);
                AsyncStorage.setItem("id", response.data[0].id);
                AsyncStorage.setItem("role", response.data["0"].role);
                if (response.data["0"].role == "teacher") {
                  AsyncStorage.setItem("user", response.data["0"].username);
                  navigation.navigate("Teacher");
                } else if (response.data["0"].role == "student") {
                  AsyncStorage.setItem("user", response.data["0"].username);
                  navigation.navigate("Student");
                } else if (response.data["0"].role == "admin") {
                  AsyncStorage.setItem("user", response.data["0"].username);
                  navigation.navigate("Admin");
                }
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch((e) => console.log(e));
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Login </Text>
      <TextInput
        style={styles.inputstyle}
        label="Username"
        mode="outlined"
        secureTextEntry={false}
        theme={mytheme}
        onChangeText={(text) => setUername(text)}
      />

      <TextInput
        style={styles.inputstyle}
        label="Password"
        mode="outlined"
        secureTextEntry={true}
        theme={mytheme}
        onChangeText={(text) => setPassword(text)}
      />

      <Button
        mode="contained"
        style={styles.inputstyle}
        theme={mytheme}
        onPress={handleSubmit}
      >
        Log In
      </Button>
    </View>
  );
}
const mytheme = {
  colors: {
    primary: "#05c5f5",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f0f8ff",
  },
  mytext: {
    fontSize: 18,
    textAlign: "center",
    margin: 5,
  },
  inputstyle: {
    margin: 5,
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
});
