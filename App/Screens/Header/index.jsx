import React from "react";
import { View, AsyncStorage } from "react-native";
import { Body, Header, Icon, Left, Right, Text } from "native-base";
import axios from "axios";

export default function HeaderComponent({ navigation }) {
  const logout = () => {
    AsyncStorage.getItem("id")
      .then((id) => {
        axios
          .post("http://krishma.webcodice.com/react-native/axios.php", {
            request: 35,
            id: id,
          })
          .then((response) => {
            AsyncStorage.removeItem("token");
            navigation.navigate("Login");
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const openDrawer = () => {
    navigation.openDrawer();
  };
  return (
    <View>
      <Header>
        <Left>
          <Icon
            onPress={openDrawer}
            ios="ios-menu"
            android="md-menu"
            style={{ fontSize: 30, color: "#fff" }}
          />
        </Left>
        <Body>
          <Text style={{ color: "#fff" }}>{/*Student Screen*/}</Text>
        </Body>
        <Right>
          <Text style={{ textAlign: "right", color: "#fff" }} onPress={logout}>
            LOG OUT
          </Text>
        </Right>
      </Header>
    </View>
  );
}
