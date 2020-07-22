import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  AsyncStorage,
} from "react-native";
import { TextInput, Title, Button } from "react-native-paper";
import axios from "axios";
import HeaderComp from "../Header";

export default function Add_Subject({ navigation }) {
  const [subject_name, setSubject_name] = useState("");
  const [subject_code, setSubject_code] = useState("");

  const logout = () => {
    AsyncStorage.removeItem("user").then(() => alert("success"));
  };

  const handleSubmit = () => {
    if (subject_name == "" || subject_code == "") {
      alert("Please Fill all class Fields");
    } else {
      axios
        .post("http://krishma.webcodice.com/react-native/axios.php", {
          request: 13,
          subject_name: subject_name,
          subject_code: subject_code,
        })
        .then((response) => {
          alert(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <HeaderComp navigation={navigation} />
      <SafeAreaView style={styles.content}>
        <ScrollView style={styles.scroll}>
          <Title style={styles.welcome}>Add Subject👨‍🎓</Title>

          <TextInput
            style={styles.inputstyle}
            label="Subject Name"
            value={subject_name}
            mode="outlined"
            theme={mytheme}
            onChangeText={(e) => setSubject_name(e)}
          />
          <TextInput
            style={styles.inputstyle}
            label="Subject Code"
            value={subject_code}
            mode="outlined"
            theme={mytheme}
            onChangeText={(e) => setSubject_code(e)}
          />

          <Button
            mode="contained"
            style={styles.inputstyle}
            theme={mytheme}
            onPress={handleSubmit}
          >
            Add Class
          </Button>
        </ScrollView>
      </SafeAreaView>
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
  },
  content: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
  },
  welcome: {
    fontWeight: "bold",
    textAlign: "center",
    margin: 20,
    padding: 10,
    fontSize: 28,
  },
  inputstyle: {
    margin: 5,
  },
});

// 90331 80467

// 42754
