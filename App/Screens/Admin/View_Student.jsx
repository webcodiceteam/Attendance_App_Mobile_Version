import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  AsyncStorage,
  Image,
  SafeAreaView,
  ScrollView,
  Modal,
  Picker,
  TouchableHighlight,
  LayoutAnimation,
} from "react-native";
import {
  Title,
  Card,
  TextInput,
  RadioButton,
  Button,
} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Actions } from "react-native-router-flux";
import Swipeable from "react-native-swipeable";
import {
  Body,
  Header,
  Icon,
  Left,
  Right,
  SwipeRow,
  Content,
} from "native-base";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import HeaderCom from "../Header";
import * as ImageManipulator from "expo-image-manipulator";

export default function studentlist({ navigation }) {
  const [showDate, setDate] = useState(false);

  // const value = '';
  const mode = "date";
  const displayFormat = "DD/MM/YYYY";
  let [students, setStudents] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
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

  useEffect(() => {
    getClasses();
  }, []);
  const deletestudent = (x) => {
    axios
      .post("http://krishma.webcodice.com/react-native/axios.php", {
        request: 22, // delete student from student list
        role: "student",
        username: x,
      })
      .then((response) => {
        getStudents();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getClasses = () => {
    axios
      .post("http://krishma.webcodice.com/react-native/axios.php", {
        request: 11,
      })
      .then((response) => {
        setClasses(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
    reg
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
  };
  useEffect(() => {
    getStudents();
  }, []);

  const gallerypic = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        let newfile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test.${data.uri.split(".")[1]}`,
        };
        uploadimage(newfile);
      }
    } else {
      // Alert.alert("No work");
    }
  };

  const uploadimage = async (image) => {
    const response = await ImageManipulator.manipulateAsync(image.uri, [], {
      base64: true,
    });
    setPicture(response.base64);
  };

  const getStudents = () => {
    axios
      .post("http://krishma.webcodice.com/react-native/axios.php", {
        request: 10,
      })
      .then((response) => {
        setStudents(response.data);
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

  const handleDatePicked = (dob) => {
    setDob(dob);
    hideDateTimePicker();
  };

  const updatedata = () => {
    // alert(id);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (
      u_name == "" ||
      father_name == "" ||
      id == "" ||
      email == "" ||
      phone_no == "" ||
      dob == " " ||
      registration == " " ||
      gender == " " ||
      section == " " ||
      roll_no == "" ||
      class_name == " " ||
      password == " " ||
      picture == " " ||
      batch == ""
    ) {
      alert("All fields are required !");
    } else if (reg.test(email) === false) {
      alert("Invalid email");
      return false;
    } else {
      axios
        .post("http://krishma.webcodice.com/react-native/axios.php", {
          request: 19,
          id: id,
          name: u_name,
          email: email,
          phone_no: phone_no,
          password: password,
          image: picture,
          gender: gender,
          dob: dob,
          roll_no: roll_no,
          batch: batch,
          class_name: class_name,
          section: section,
          registration: registration,

          father_name: father_name,
        })
        .then((response) => {
          alert(response.data);
          setModalVisible(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const [name, setName] = useState("");

  AsyncStorage.getItem("user").then((data) => {
    setName(data);
  });

  const renderItems = () => {
    return this.state.data.map((item) => {
      return (
        <Item
          key={item.id}
          swipingCheck={(swiping) => this.setState({ swiping })}
          message={item.message}
          id={item.id}
          cleanFromScreen={(id) => this.cleanFromScreen(id)}
          leftButtonPressed={() => console.log("left button pressed")}
          deleteButtonPressed={() => console.log("delete button pressed")}
          editButtonPressed={() => console.log("edit button pressed")}
        />
      );
    });
  };
  return (
    <View style={styles.container}>
      <HeaderCom navigation={navigation} />
      <SafeAreaView style={styles.content}>
        <ScrollView style={styles.scroll}>
          <Text style={styles.welcome}>
            <Text>Welcome</Text>
            <Text> {name} </Text>
          </Text>
          <View style={styles.content}>
            <Title style={styles.welcome}>List of Students</Title>
            {students.map((x) => {
              return (
                <Swipeable
                  key={x.id}
                  leftContent={[
                    <TouchableHighlight
                      style={styles.SwipeableContainer}
                      onPress={() => deletestudent("delete")}
                    >
                      <Button
                        mode="contained"
                        style={{
                          height: 75,
                          justifyContent: "center",
                          margin: "5%",
                        }}
                      >
                        <Icon
                          ios="ios-trash"
                          android="md-trash"
                          style={{
                            fontSize: 30,
                            color: "#fff",
                          }}
                        />
                      </Button>
                    </TouchableHighlight>,
                  ]}
                  rightButtons={[
                    <TouchableHighlight
                      style={styles.SwipeableContainer}
                      onPress={() => deletestudent(x.username)}
                    >
                      <Button
                        mode="contained"
                        style={{
                          height: 75,
                          justifyContent: "center",
                          margin: "5%",
                        }}
                      >
                        <Icon
                          ios="ios-trash"
                          android="md-trash"
                          style={{
                            fontSize: 30,
                            color: "#fff",
                          }}
                        />
                      </Button>
                    </TouchableHighlight>,
                  ]}
                >
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
                            x.password,
                            x.father_name,
                            x.class_name,
                            x.roll_no,
                            x.id,
                            x.dob,
                            x.batch,
                            x.section,
                            x.registration
                          )
                        }
                        key={x.id}
                      >
                        <Image
                          style={{ width: 60, height: 60, borderRadius: 30 }}
                          source={
                            x.image
                              ? {
                                  uri: `http://krishma.webcodice.com/react-native/${x.image}`,
                                }
                              : {
                                  uri:
                                    "https://n8d.at/wp-content/plugins/aioseop-pro-2.4.11.1/images/default-user-image.png",
                                }
                          }
                        />
                      </TouchableOpacity>
                      <View style={{ marginLeft: 10 }}>
                        <Text style={styles.text}>{x.name}</Text>
                        <Text style={styles.textstyle}>{x.email}</Text>
                        <Text style={styles.textstyle}>{x.phone_no}</Text>
                      </View>
                    </View>
                  </Card>
                </Swipeable>
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
          // Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
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
                        ? {
                            uri: `http://krishma.webcodice.com/react-native/${picture}`,
                          }
                        : {
                            uri:
                              "https://n8d.at/wp-content/plugins/aioseop-pro-2.4.11.1/images/default-user-image.png",
                          }
                    }
                  />
                </View>
                <Text onPress={() => gallerypic()} style={styles.modalText}>
                  Edit{" "}
                </Text>

                <TextInput
                  style={styles.inputstyle}
                  label="Name"
                  value={u_name}
                  mode="outlined"
                  theme={mytheme}
                  onChangeText={(text) => setUname(text)}
                />
                <TextInput
                  style={styles.inputstyle}
                  label="Father Name"
                  value={father_name}
                  mode="outlined"
                  theme={mytheme}
                  onChangeText={(e) => setFather_name(e)}
                />
                <TextInput
                  style={styles.inputstyle}
                  label="Email"
                  value={email}
                  mode="outlined"
                  theme={mytheme}
                  onChangeText={(e) => setEmail(e)}
                />
                <TextInput
                  style={styles.inputstyle}
                  label="Phone Number"
                  value={phone_no}
                  mode="outlined"
                  theme={mytheme}
                  placeholder="Phone Number"
                  onChangeText={(e) => setPhone_no(e)}
                />

                <TextInput
                  style={styles.inputstyle}
                  label="Password"
                  value={password}
                  mode="outlined"
                  theme={mytheme}
                  secureTextEntry={false}
                  onChangeText={(e) => setPassword(e)}
                />

                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontSize: 22 }}>Gender :</Text>
                  <RadioButton
                    style={styles.inputstyle}
                    label="Gender"
                    value={gender}
                    mode="outlined"
                    value="male"
                    theme={mytheme}
                    status={gender === "male" ? "checked" : "unchecked"}
                    onPress={() => setGender("male")}
                  />
                  <Text style={{ fontSize: 20, padding: 6 }}>Male</Text>
                  <RadioButton
                    style={styles.inputstyle}
                    theme={mytheme}
                    value="female"
                    status={gender === "female" ? "checked" : "unchecked"}
                    onPress={() => setGender("female")}
                  />
                  <Text style={{ fontSize: 20, padding: 6 }}>Female</Text>
                </View>
                <TextInput
                  style={styles.inputstyle}
                  label="Roll no"
                  value={roll_no}
                  mode="outlined"
                  theme={mytheme}
                  onChangeText={(e) => setRoll_no(e)}
                />
                <Text
                  style={styles.datetextstyle}
                  onPress={() => showDateTimePicker()}
                  theme={mytheme}
                >
                  {dob ? moment(dob).format(displayFormat) : "Select Date"}
                </Text>
                <DateTimePicker
                  date={dob ? new Date(dob) : new Date()}
                  theme={mytheme}
                  isVisible={showDate}
                  mode={mode}
                  onConfirm={handleDatePicked}
                  onCancel={() => hideDateTimePicker()}
                />
                <TextInput
                  style={styles.inputstyle}
                  label="Batch"
                  value={batch}
                  mode="outlined"
                  theme={mytheme}
                  onChangeText={(e) => setBatch(e)}
                />
                <Picker
                  style={styles.pickerstyle}
                  theme={mytheme}
                  selectedValue={class_name}
                  onValueChange={(itemValue) => setClassname(itemValue)}
                >
                  <Picker.Item label="Select Class" value="Class" />

                  {classes.map((x) => (
                    <Picker.Item
                      key={x.class_id}
                      label={x.class_name}
                      value={x.class_name}
                    />
                  ))}
                </Picker>

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
                <TextInput
                  style={styles.inputstyle}
                  label="Registration Number"
                  value={registration}
                  mode="outlined"
                  theme={mytheme}
                  onChangeText={(e) => setRegistration(e)}
                />
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    updatedata();
                  }}
                >
                  <Text style={styles.textStyle}>UPDATE</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>CANCEL</Text>
                </TouchableHighlight>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </Modal>
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
  inputstyle: {
    margin: 5,
  },
  scroll: {
    width: "100%",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    // marginHorizontal: 10,
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  SwipeableContainer: {
    width: 100,
    marginRight: "10%",
  },
});
