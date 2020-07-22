import React, { useState, useEffect } from "react";
import {
  View,
  Picker,
  StyleSheet,
  Text,
  AsyncStorage,
  Image,
  SafeAreaView,
  ScrollView,
  Modal,
} from "react-native";
import {
  Body,
  Header,
  Icon,
  Left,
  Right,
  SwipeRow,
  Button,
  Content,
} from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Title, Card } from "react-native-paper";
import axios from "axios";
import HeaderComp from "../Header";
import QRCode from "react-qr-code";
export default function View_QR({ navigation }) {
  let [students, setStudents] = useState([]);

  useEffect(() => {
    getQRData();
  }, []);

  const getQRData = () => {
    axios
      .post("http://krishma.webcodice.com/react-native/axios.php", {
        request: 21,
      })
      .then((response) => {
        setStudents(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [class_name, setClassname] = useState();
  const [teacher, setTeacher] = useState();
  const [section, setSection] = useState();
  const [date_time, setDate] = useState();
  const [subject, setSubject] = useState();
  const [qrlink, setQrlink] = useState();
  const showModal = (classname, teach, sec, sub, date_tym, qrlinkData) => {
    setModalVisible(true);
    setClassname(classname);
    setTeacher(teach);
    setSection(sec);
    setDate(date_tym);
    setSubject(sub);
    setQrlink(qrlinkData);
  };

  AsyncStorage.getItem("user").then((data) => {
    // let user = data;
    setName(data);
  });

  return (
    <View style={styles.container}>
      <HeaderComp navigation={navigation} />
      <SafeAreaView style={styles.content}>
        <ScrollView style={styles.scroll}>
          <Text style={styles.welcome}>
            <Text>Welcome</Text>
            <Text> {name} </Text>
          </Text>

          <View style={styles.content}>
            <Title style={styles.welcome}>List of QR's</Title>
            {students.map((x) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    showModal(
                      x.class_name,
                      x.teacher,
                      x.section,
                      x.subject,
                      x.date_time,
                      x.qrlink
                    )
                  }
                  key={x.id}
                >
                  <Card style={styles.mycard} key={x.id}>
                    <View style={styles.cardView}>
                      <QRCode
                        height="100"
                        width="100"
                        value={
                          x.teacher +
                          x.class_name +
                          x.section +
                          x.subject +
                          x.date_time
                        }
                        size={50}
                      />

                      <View style={{ marginLeft: 10 }}>
                        <Text style={styles.text}>{x.teacher}</Text>
                        <Text style={styles.textstyle}>
                          {x.class_name + " " + x.section}
                        </Text>
                        <Text style={styles.textstyle}>{x.subject}</Text>
                      </View>
                    </View>
                  </Card>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <SafeAreaView style={styles.content}>
            <ScrollView style={styles.scroll}>
              <View style={styles.modalView}>
                <Icon
                  ios="ios-close"
                  android="md-close"
                  style={{
                    fontSize: 30,
                    color: "#333",
                    alignItems: "flex-end",
                  }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                />

                <Text style={styles.welcome}>QR Detail</Text>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "5%",
                  }}
                >
                  <QRCode
                    height="500"
                    width="500"
                    value={teacher + class_name + section + subject + date_time}
                    size={150}
                  />
                </View>
                <Text style={styles.modalText}>Teacher Name: {teacher}</Text>
                <Text style={styles.modalText}>Class Name: {class_name}</Text>
                <Text style={styles.modalText}>Section: {section}</Text>
                <Text style={styles.modalText}>Subject: {subject}</Text>
                <Text style={styles.modalText}>Time: {date_time}</Text>
                <Text style={styles.modalText}>Time: {qrlink}</Text>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputstyle: {
    margin: 5,
  },
  scroll: {
    width: "100%",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    width: "60%",
    paddingTop: 8,
    marginTop: 10,
    paddingBottom: 8,
    backgroundColor: "#006aff",
    marginBottom: 20,
  },
  mycard: {
    margin: 5,
  },
  cardView: {
    flexDirection: "row",
    padding: 6,
  },
  text: {
    fontSize: 18,
  },
  textstyle: {
    fontSize: 14,
  },
  datetextstyle: {
    margin: 5,
    padding: 15,
    borderRadius: 5,
    borderColor: "grey",
    borderWidth: 1,
    color: "#333",
    backgroundColor: "#f2f2f2",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: "20%",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: "4%",
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
  btntextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,

    fontSize: 20,
  },
});
