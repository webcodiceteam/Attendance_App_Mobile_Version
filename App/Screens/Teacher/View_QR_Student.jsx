import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  AsyncStorage,
  Image,
  Modal,
  TouchableHighlight,
} from "react-native";
import { Icon } from "native-base";
import { Title, Card } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import HeaderComp from "../Header";

export default function studentlist({ route, navigation }) {
  const { c } = route.params;
  const { sec } = route.params;
  const { qrlink } = route.params;
  const [students, setStudents] = useState([]);
  const [u_name, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [phone_no, setPhone_no] = useState("");
  const [password, setPassword] = useState("");
  const [picture, setPicture] = useState("");
  const [id, setId] = useState("");
  const [gender, setGender] = useState("male");
  const [dob, setDob] = useState("");
  const [roll_no, setRoll_no] = useState("");
  const [batch, setBatch] = useState("");
  const [class_name, setClassname] = useState("Class");
  const [section, setSection] = useState("");
  const [registration, setRegistration] = useState("");
  const [father_name, setFather_name] = useState("");
  const [classes, setClasses] = useState([]);
  const [nostudent, setNostudent] = useState();
  const [total, setTotal] = useState();
  const [attendance, setAttendance] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    getStudents();
  }, []);

  const showModal = (
    uname,
    e_mail,
    phone,
    image,
    gen,
    pass,
    fname,
    cname,
    rn,
    Id,
    d_o_b,
    bat,
    sec,
    reg,
    attend
  ) => {
    setModalVisible(true);

    setUname(uname);
    setEmail(e_mail);
    setPhone_no(phone);
    setPicture(image);
    setPassword(pass);
    setGender(gen);
    setFather_name(fname);
    setClassname(cname);
    setRoll_no(rn);
    setId(Id);
    setDob(d_o_b);
    setBatch(bat);
    setSection(sec);
    setRegistration(reg);
    setAttendance(attend);
  };

  const getStudents = () => {
    AsyncStorage.getItem("user").then((data) => {
      setName(data);
      axios
        .post("http://krishma.webcodice.com/react-native/axios.php", {
          request: 34,
          class_name: c,
          section: sec,
        })
        .then((response1) => {
          console.log(response1.data);
          if (response1.data === "  no") {
            setNostudent("No students");
          } else {
            axios
              .post("http://krishma.webcodice.com/react-native/axios.php", {
                request: 33,
                qrlink: qrlink,
              })
              .then((response2) => {
                console.log(response2.data);

                // if (response.data === "  no") {
                //   setNostudent("No students");
                // } else {
                //   setTotal(response.data.length);
                //   setStudents(response.data);
                // }
                //AsyncStorage.removeItem("class");
              })
              .catch(function (error) {
                console.log(error);
              });
            setTotal(response1.data.length);
            setStudents(response1.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };
  const showdate = (d) => {
    alert(d);
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
          {nostudent ? (
            <View style={{ justifyContent: "center", alignContent: "center" }}>
              <Text style={styles.welcome}>{nostudent}</Text>
            </View>
          ) : (
            <View style={styles.content}>
              <Title style={styles.welcome}>List of Students</Title>
              <Text>Total Students : {total}</Text>

              {students.map((x) => (
                <Card style={styles.mycard} key={x.id}>
                  <View style={styles.cardView}>
                    <TouchableOpacity
                      onPress={() =>
                        showModal(
                          x.name,
                          x.email,
                          x.phone_no,
                          x.image,
                          x.gender,
                          x.username,
                          x.father_name,
                          x.class_name,
                          x.roll_no,
                          x.id,
                          x.dob,
                          x.batch,
                          x.section,
                          x.registration,
                          x.attendance_result
                        )
                      }
                      key={x.id}
                    >
                      <Image
                        style={{ width: 60, height: 60, borderRadius: 30 }}
                        source={
                          x.image
                            ? { uri: x.image }
                            : {
                                uri:
                                  "https://n8d.at/wp-content/plugins/aioseop-pro-2.4.11.1/images/default-user-image.png",
                              }
                        }
                      />
                    </TouchableOpacity>
                    <View style={{ marginLeft: 10 }}>
                      <Text style={styles.text}>User Name</Text>
                      <Text style={styles.textstyle}>{x.username}</Text>
                    </View>
                    <View style={{ marginLeft: "2%" }}>
                      <Text style={styles.text}>Date-Time</Text>
                      <Text style={styles.textstyle}>{x.attendance_date}</Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          textAlign: "right",
                          margin: "2%",
                          marginTop: "20%",
                        }}
                      >
                        {x.attendance_result == "Present" ? (
                          <Text style={{ color: "green" }}>Present</Text>
                        ) : (
                          <Text style={{ color: "red" }}>Absent</Text>
                        )}
                      </Text>
                    </View>
                  </View>
                </Card>
              ))}
            </View>
          )}
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

                <Text style={styles.welcome}>Student Update</Text>
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Image
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      alignItems: "center",
                    }}
                    source={
                      picture
                        ? { uri: picture }
                        : {
                            uri:
                              "https://n8d.at/wp-content/plugins/aioseop-pro-2.4.11.1/images/default-user-image.png",
                          }
                    }
                  />
                </View>

                <Text style={styles.modalText}>
                  Name:{" "}
                  <Text
                    style={{
                      ...styles.modalText,
                      color: "#686969",
                      marginLeft: "5%",
                    }}
                  >
                    {u_name}
                  </Text>
                </Text>

                <Text style={styles.modalText}>
                  Father Name:{" "}
                  <Text style={{ color: "#686969", marginLeft: "15%" }}>
                    {father_name}
                  </Text>{" "}
                </Text>
                <Text style={styles.modalText}>
                  Registeration No.:{" "}
                  <Text style={{ color: "#686969" }}>{registration}</Text>{" "}
                </Text>
                <Text style={styles.modalText}>
                  Class:<Text style={{ color: "#686969" }}> {class_name}</Text>
                </Text>
                <Text style={styles.modalText}>
                  Section: <Text style={{ color: "#686969" }}> {section}</Text>
                </Text>
                <Text style={styles.modalText}>
                  Roll No: <Text style={{ color: "#686969" }}> {roll_no}</Text>
                </Text>
                <Text style={styles.modalText}>
                  Batch : <Text style={{ color: "#686969" }}> {batch}</Text>
                </Text>
                <Text style={styles.modalText}>
                  Email:{" "}
                  <Text style={{ color: "#686969" }}>
                    {" "}
                    <Text style={{ color: "#686969" }}> {email}</Text>
                  </Text>
                </Text>
                <Text style={styles.modalText}>
                  Phone: <Text style={{ color: "#686969" }}> {phone_no}</Text>
                </Text>
                <Text style={styles.modalText}>
                  Gender: <Text style={{ color: "#686969" }}> {gender}</Text>
                </Text>

                <Text style={styles.modalText}>
                  Date of Birth:{" "}
                  <Text style={{ color: "#686969" }}> {dob}</Text>
                </Text>

                <Text style={styles.modalText}>
                  User Name:{" "}
                  <Text style={{ color: "#686969" }}> {password}</Text>
                </Text>

                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.btntextStyle}>CANCEL</Text>
                </TouchableHighlight>
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
    marginHorizontal: "1%",
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
    fontSize: 16,
    color: "#222",
  },
  textstyle: {
    fontSize: 14,
    color: "#777",
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
    marginTop: 10,
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
