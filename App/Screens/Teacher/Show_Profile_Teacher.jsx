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
import { ProfileData } from "../Student/Card";

export default function teacherprofile({ navigation }) {
  let [teacher, setteacher] = useState([]);
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    AsyncStorage.getItem("user")
      .then((data) => {
        axios
          .post("http://krishma.webcodice.com/react-native/axios.php", {
            request: 24, //for single teacher profile show
            username: data,
          })
          .then((response) => {
            let data = response.data[0];
            setteacher(data);
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
              uri: `http://krishma.webcodice.com/react-native/${teacher.image}`,
            }}
          />
          <ProfileData Title="Name" data={teacher.name} />
          <ProfileData Title="Email" data={teacher.email} />
          <ProfileData Title="Username" data={teacher.username} />
          <ProfileData Title="Phone No" data={teacher.phone_no} />
          <ProfileData Title="Gender" data={teacher.gender} />
          <ProfileData Title="D.O.B" data={teacher.dob} />
          <ProfileData Title="Class Name" data={teacher.class_name} />
          <ProfileData Title="Subject" data={teacher.subject} />
          <ProfileData Title="Qualification" data={teacher.qualification} />
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
