import React, { useState, useEffect } from "react";
import {
  View,
  Picker,
  StyleSheet,
  Text,
  AsyncStorage,
  Image,
} from "react-native";
import { Title, DataTable, List } from "react-native-paper";
import axios from "axios";
import HeaderComp from "../Header";

export default function View_Class({ navigation }) {
  let [students, setStudents] = useState([]);

  useEffect(() => {
    getClasses();
  }, []);

  const getClasses = () => {
    axios
      .post("http://krishma.webcodice.com/react-native/axios.php", {
        request: 11,
      })
      .then((response) => {
        // console.log(response.data);
        setStudents(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);
  const [name, setName] = useState("");

  AsyncStorage.getItem("user").then((data) => {
    // let user = data;
    setName(data);
  });

  const logout = () => {
    AsyncStorage.setItem("user", "");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <HeaderComp navigation={navigation} />
      <Text style={styles.welcome}>
        <Text>Welcome</Text>
        <Text> {name} </Text>
      </Text>

      <View style={styles.content}>
        <Title style={styles.welcome}>List of Classes</Title>

        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Id</DataTable.Title>
            <DataTable.Title>Class name</DataTable.Title>
            <DataTable.Title>Section</DataTable.Title>
            <DataTable.Title>Batch</DataTable.Title>
            <DataTable.Title>Subject Code</DataTable.Title>
          </DataTable.Header>
          {students.map((x) => (
            <DataTable.Row key={x.class_id}>
              <DataTable.Cell>{x.class_id}</DataTable.Cell>
              <DataTable.Cell>{x.class_name}</DataTable.Cell>
              <DataTable.Cell>{x.section}</DataTable.Cell>
              <DataTable.Cell>{x.batch}</DataTable.Cell>
              <DataTable.Cell>{x.subject_code}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 40,
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
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
  },
});
