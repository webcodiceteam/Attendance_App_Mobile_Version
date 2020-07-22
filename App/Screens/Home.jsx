import React, { useState } from "react";
import { Title } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, Text, View, Linking } from "react-native";

export default function HomeNew({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  useFocusEffect(
    React.useCallback(() => {
      if (isLoading) {
        setIsLoading(false);
        setTimeout(() => {
          navigation.navigate("Login");
        }, 1000);
      } else {
        navigation.navigate("Login");
      }
      return () => {};
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
        <Title>WELCOME TO OUR</Title>
        <Text style={styles.paragraph}>
          <Text style={{ color: "#333" }}>ATTENDANCE APP</Text>
        </Text>
      </View>
      <View>
        <Text style={{ textAlign: "center" }}>
          Design & Develop by{" "}
          <Text
            style={{ color: "#025098" }}
            onPress={() => Linking.openURL("https://google.com")}
          >
            Webcodice
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
});
