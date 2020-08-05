import React, { useState, useEffect } from "react";
import {
  View,
  Picker,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  AsyncStorage,
  Alert,
} from "react-native";
import { Button, Title } from "react-native-paper";
import QRCode from "react-qr-code";
import Loader from "../Admin/QR_Loader";
import axios from "axios";
import HeaderComp from "../Header";

export default function qrgenerater({ navigation }) {
  const [showDate, setDate] = useState(false);

  let getTime = new Date().toLocaleTimeString();
  let getDate = new Date().toLocaleDateString();
  let dateAndTime = `${getDate} - ${getTime}`;

  let [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [value, setDatetime] = useState(dateAndTime);
  const [class_name, setClassname] = useState("Class");
  const [subject, setSubject] = useState("Subject");
  const [section, setSection] = useState("Section");
  const [showQR, setShowQR] = useState(false);

  AsyncStorage.getItem("user").then((data) => {
    setName(data);
  });

  let [subjects, setSubjects] = useState([]);

  useEffect(() => {
    getData();
    getSubjects();
  }, []);

  const getData = () => {
    AsyncStorage.getItem("user")
      .then((data) => {
        axios
          .post("http://krishma.webcodice.com/react-native/axios.php", {
            request: 24,
            username: data,
          })
          .then((response) => {
            setClassname(response.data[0].class_name);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch((err) => console.log(err));
  };

  const getSubjects = () => {
    axios
      .post("http://krishma.webcodice.com/react-native/axios.php", {
        request: 14,
      })
      .then((response) => {
        setSubjects(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const showDateTimePicker = () => {
    //alert('showDateTimePicker');
    setDate(true);

    // Keyboard.dismiss();
  };

  const hideDateTimePicker = () => {
    setDate(false);
  };

  const handleDatePicked = (value) => {
    setDatetime(value);
    hideDateTimePicker();
  };

  if ({ name } == "") {
    // Actions.login();
  }

  const logout = () => {
    AsyncStorage.setItem("user", "");
    // Actions.login();
  };

  const submit = () => {
    setLoading(true);
    if (class_name == "" || class_name == "Class") {
      Alert.alert("PLease Select Class");
      setLoading(false);
    } else if (subject == "" || subject == "Subject") {
      Alert.alert("PLease Select Subject");
      setLoading(false);
    } else if (section == "" || section == "Section") {
      Alert.alert("PLease Select Setion");
      setLoading(false);
    } else {
      axios
        .post("http://krishma.webcodice.com/react-native/axios.php", {
          request: 15,
          teacher: name,
          class_name: class_name,
          section: section,
          subject: subject,
          date_time: value,
          qrlink: name + class_name + section + subject + value,
        })
        .then(function (response) {
          setShowQR(true);
          setLoading(false);
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
          <Text style={styles.welcome}>
            <Text>Welcome</Text>
            <Text> {name} </Text>
          </Text>
          <Loader loading={loading} />

          <View style={styles.content}>
            <Title style={{ alignItems: "center", margin: 10, fontSize: 24 }}>
              Generate QR Code
            </Title>
            {showQR ? (
              <View style={{ alignItems: "center" }}>
                <QRCode value={name + class_name + section + subject + value} />
              </View>
            ) : null}

            <Text style={styles.labelstyle}>Select Section: </Text>
            <Picker
              style={styles.pickerstyle}
              theme={mytheme}
              selectedValue={section}
              onValueChange={(itemValue) => setSection(itemValue)}
            >
              <Picker.Item label="Select Section" value="Section" />
              <Picker.Item label="A" value="A" />
              <Picker.Item label="B" value="B" />
              <Picker.Item label="C" value="C" />
              <Picker.Item label="D" value="D" />
              <Picker.Item label="E" value="E" />
            </Picker>
            <Text style={styles.labelstyle}>Select Subject: </Text>
            <Picker
              style={styles.pickerstyle}
              theme={mytheme}
              selectedValue={subject}
              onValueChange={(itemValue) => setSubject(itemValue)}
            >
              <Picker.Item label="Select Subject" value="Subject" />

              {subjects.map((x) => (
                <Picker.Item
                  key={x.subject_id}
                  label={x.subject_name}
                  value={x.subject_name}
                />
              ))}
            </Picker>

            <View style={{ alignItems: "center" }}>
              <Button
                style={styles.button}
                mode="contained"
                onPress={() => submit()}
              >
                Generate QR
              </Button>
            </View>
          </View>
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
  pickerstyle: {
    margin: 5,
    padding: 15,
    borderRadius: 5,
    borderColor: "grey",
    borderWidth: 1,
    color: "grey",
    backgroundColor: "#f2f2f2",
  },
  content: {
    flex: 1,
    marginHorizontal: 20,
  },
  scroll: {
    width: "100%",
  },
  labelstyle: {
    margin: 10,
    fontSize: 22,
  },
  button: {
    width: "60%",
    paddingTop: 8,
    marginTop: 10,
    paddingBottom: 8,
    backgroundColor: "#006aff",
    marginBottom: 20,
    alignItems: "center",
  },
  textstyle: {
    margin: 5,
    padding: 15,
    borderRadius: 5,
    borderColor: "grey",
    borderWidth: 1,
    color: "grey",
    backgroundColor: "#f2f2f2",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
  },
});
