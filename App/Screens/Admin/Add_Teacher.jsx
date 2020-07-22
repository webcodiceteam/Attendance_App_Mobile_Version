import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Modal, Alert, ScrollView } from "react-native";
import { TextInput, Title, Button, RadioButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import axios from "axios";
import DateTimePicker from "react-native-modal-datetime-picker";
import Loader from "./QR_Loader";
import HeaderComp from "../Header";
import DropDownPicker from "react-native-dropdown-picker";
import moment from "moment";
import * as ImageManipulator from "expo-image-manipulator";

const Add_Teacher = ({ navigation }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("male");
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");
  const [classname, setClassname] = useState("Class");
  const [subject, setSubject] = useState("Subject");
  const [picture, setPicture] = useState("");
  const [qualification, setQualification] = useState("");
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDate, setDate] = useState(false);

  let [classes, setClasses] = useState([]);
  let [subjects, setSubjects] = useState([]);
  useEffect(() => {
    getClasses();
    getSubjects();
  }, []);

  const getClasses = () => {
    axios
      .post("http://krishma.webcodice.com/react-native/axios.php", {
        request: 11,
      })
      .then((response) => {
        let ClassData = [];
        response.data.map((x) => {
          ClassData.push({ label: x.class_name, value: x.class_name });
        });

        setClasses(ClassData);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getSubjects = () => {
    axios
      .post("http://krishma.webcodice.com/react-native/axios.php", {
        request: 14,
      })
      .then((response) => {
        let SubjectData = [];
        response.data.map((x) => {
          SubjectData.push({ label: x.subject_name, value: x.subject_name });
        });

        setSubjects(SubjectData);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
      Alert.alert("No work");
    }
  };
  const camerapic = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
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
      Alert.alert("No work");
    }
  };

  const uploadimage = async (image) => {
    const response = await ImageManipulator.manipulateAsync(image.uri, [], {
      base64: true,
    });
    setPicture(response.base64);
    setModal(false);
  };

  const showDateTimePicker = () => {
    setDate(true);
  };

  const hideDateTimePicker = () => {
    setDate(false);
  };

  const handleDatePicked = (dob) => {
    setDob(moment(dob).format("DD/MM/YYYY"));
    hideDateTimePicker();
  };

  const validate = () => {
    setLoading(true);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (
      name == "" ||
      classname == "Class" ||
      classname == "" ||
      subject == "" ||
      subject == "Subject" ||
      phone == "" ||
      picture == "" ||
      email == "" ||
      password == ""
    ) {
      alert("All Field are required to field");
      setLoading(false);
    } else if (reg.test(email) === false) {
      alert("Invalid email");
      return false;
    } else {
      // alert("Your Data Saved:  " + gender + "Image :" + picture);
      axios
        .post("http://krishma.webcodice.com/react-native/axios.php", {
          request: 5,
          name: name,
          email: email,
          phone_no: phone,
          password: password,
          image: picture,
          username: username,
          gender: gender,
          dob: dob,
          class_name: classname.label,
          subject: subject,
          qualification: qualification,
        })
        .then(function (response) {
          setLoading(false);
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  var x = selectedItems;
  const onSelectedItemsChange = (aa) => {
    x.push(aa[0]);
  };

  return (
    <ScrollView>
      <HeaderComp navigation={navigation} />
      <View style={styles.container}>
        <Title style={styles.welcome}>Add Teacher</Title>
        <Loader loading={loading} />

        <TextInput
          style={styles.inputstyle}
          label="Name"
          value={name}
          mode="outlined"
          onChangeText={(text) => setName(text)}
          theme={mytheme}
        />
        <TextInput
          style={styles.inputstyle}
          label="Email"
          value={email}
          keyboardType="email-address"
          mode="outlined"
          onChangeText={(text) => setEmail(text)}
          theme={mytheme}
        />

        <TextInput
          style={styles.inputstyle}
          label="Phone"
          value={phone}
          keyboardType="number-pad"
          mode="outlined"
          onChangeText={(text) => setPhone(text)}
          theme={mytheme}
        />

        <TextInput
          style={styles.inputstyle}
          label="Password"
          value={password}
          mode="outlined"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          theme={mytheme}
        />
        <TextInput
          style={styles.inputstyle}
          label="Username"
          value={username}
          mode="outlined"
          secureTextEntry={false}
          onChangeText={(text) => setUsername(text)}
          theme={mytheme}
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
        <Text
          style={styles.datetextstyle}
          onPress={() => showDateTimePicker()}
          theme={mytheme}
        >
          {dob ? dob : "Date of Brith"}
        </Text>
        <DateTimePicker
          date={new Date()}
          theme={mytheme}
          isVisible={showDate}
          mode="date"
          onConfirm={(e) => handleDatePicked(e)}
          onCancel={() => hideDateTimePicker()}
        />
        <DropDownPicker
          style={styles.multiDropDown}
          items={classes}
          containerStyle={{ height: 60, width: "98%" }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={(item) => setClassname(item)}
        />
        <DropDownPicker
          style={styles.multiDropDown}
          items={subjects}
          multiple={true}
          multipleText="%d items have been selected."
          min={0}
          max={10}
          // defaultValue={this.state.countries}
          containerStyle={{ height: 60, width: "98%" }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          onChangeItem={(item) => setSubject(JSON.stringify(item))}
        />
        <TextInput
          style={styles.inputstyle}
          label="Qualification"
          value={qualification}
          mode="outlined"
          onChangeText={(text) => setQualification(text)}
          theme={mytheme}
        />
        <Button
          style={styles.inputstyle}
          icon={picture == "" ? "upload" : "check"}
          theme={mytheme}
          mode="contained"
          onPress={() => setModal(true)}
        >
          {picture == "" ? "upload Image" : "Image Uploaded"}
        </Button>

        <Button
          mode="contained"
          style={styles.inputstyle}
          theme={mytheme}
          onPress={() => validate()}
        >
          Register
        </Button>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => {
            setModal(false);
          }}
        >
          <View style={styles.modalView}>
            <View style={styles.modalstyle}>
              <Button
                style={styles.inputstyle}
                icon="content-save"
                mode="contained"
                theme={mytheme}
                onPress={() => gallerypic()}
              >
                Gallery
              </Button>
              <Button
                style={styles.inputstyle}
                icon="camera"
                theme={mytheme}
                mode="contained"
                onPress={() => camerapic()}
              >
                Camera
              </Button>
            </View>

            <Button
              mode="contained"
              theme={mytheme}
              onPress={() => setModal(false)}
            >
              Cancel
            </Button>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const mytheme = {
  colors: {
    primary: "#05c5f5",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: "center",
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
  welcome: {
    fontWeight: "bold",
    textAlign: "center",
    margin: 20,
    padding: 20,
    fontSize: 28,
  },
  inputstyle: {
    margin: 5,
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
  datestyle: {
    margin: 5,
    padding: 15,
    borderRadius: 5,
    borderColor: "grey",
    borderWidth: 1,
    color: "grey",
    backgroundColor: "#f2f2f2",
  },
  modalstyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  modalView: {
    width: "100%",
    position: "absolute",
    backgroundColor: "white",
    bottom: 5,
  },
  multiDropDown: {
    marginTop: 10,
    marginLeft: 5,
    borderRadius: 5,
    borderColor: "grey",
    borderWidth: 1,
    color: "grey",
    backgroundColor: "#f2f2f2",
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
});

export default Add_Teacher;
