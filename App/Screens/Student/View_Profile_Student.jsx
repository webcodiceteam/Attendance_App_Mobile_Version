import React, { useState, useEffect } from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import axios from "axios";
import {
  Body,
  Header,
  Icon,
  Left,
  Right,
  Card,
  CardItem,
  Text,
  H3,
} from "native-base";
import { Avatar } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import HeaderComp from "../Header";
import { ProfileData } from "./Card";

export default function studentprofile({ navigation }) {
  let [student, setStudent] = useState([]);
  useEffect(() => {
    getUserData();
  }, []);

  const logout = () => {
    AsyncStorage.removeItem("user").then(() => alert("success"));
  };

  const getUserData = () => {
    AsyncStorage.getItem("user")
      .then((data) => {
        axios
          .post("http://krishma.webcodice.com/react-native/axios.php", {
            request: 12,
            username: data,
          })
          .then((response) => {
            let data = response.data[0];
            setStudent(data);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.main}>
      <HeaderComp navigation={navigation} />
      <ScrollView>
        <View style={styles.ProfileContainer}>
          <Avatar.Image
            size={100}
            source={{
              uri: `http://krishma.webcodice.com/react-native/${student.image}`,
            }}
          />
          <ProfileData Title="Name" data={student.name} />
          <ProfileData Title="Roll No" data={student.roll_no} />
          <ProfileData Title="Username" data={student.username} />
          <ProfileData Title="Father Name" data={student.father_name} />
          <ProfileData Title="Phone no" data={student.phone_no} />
          <ProfileData Title="Class Name" data={student.class_name} />
          <ProfileData Title="Section" data={student.section} />
          <ProfileData Title="Email" data={student.email} />
          <ProfileData Title="Gender" data={student.gender} />
          <ProfileData Title="D.O.B" data={student.dob} />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    alignSelf: "center",
    color: "red",
  },
  main: {
    flex: 1,
    textAlign: "center",
    alignContent: "center",
  },
  ProfileContainer: {
    alignItems: "center",
    margin: "4%",
  },
  cardContrainer: {
    marginTop: "2%",
    width: "100%",
  },
});
