import React from "react";
import { StyleSheet, Image } from "react-native";
import { Body, Card, CardItem, Text, H3, Right, View } from "native-base";

export const AttendanceViewCard = ({
  Title,
  TeacherName,
  Data,
  Status,
  ID,
}) => {
  return (
    <Card style={styles.cardContrainer}>
      <CardItem header style={{ height: 0 }}>
        <Text>
          <Text style={styles.Heading}>Date :- </Text>
          {Title}
        </Text>
      </CardItem>
      <CardItem>
        <Body>
          <Text>
            <Text style={styles.Heading}>Teacher :- </Text>
            {TeacherName}
          </Text>
          <Text>
            <Text style={styles.Heading}>Subject :- </Text>
            {Data}
          </Text>
        </Body>
        <Right>
          <Text style={{ color: Status === "Present" ? "green" : "red" }}>
            {Status}
          </Text>
        </Right>
      </CardItem>
    </Card>
  );
};

export const StudentListAttendanceTeacher = ({ Student, Status, S_Image }) => {
  return (
    <Card style={styles.cardContrainer}>
      <CardItem>
        <Body>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{ width: 60, height: 60, borderRadius: 30 }}
              source={
                S_Image
                  ? {
                      uri: `http://krishma.webcodice.com/react-native/${S_Image}`,
                    }
                  : {
                      uri:
                        "https://n8d.at/wp-content/plugins/aioseop-pro-2.4.11.1/images/default-user-image.png",
                    }
              }
            />
            <Text style={{ margin: "9%" }}>{Student}</Text>
          </View>
        </Body>
        <Right>
          <Text style={{ color: Status === "Present" ? "green" : "red" }}>
            {Status}
          </Text>
        </Right>
      </CardItem>
    </Card>
  );
};

export const ProfileData = (props) => {
  return (
    <Card style={styles.cardContrainer}>
      <CardItem header style={{ height: 0 }}>
        <Text>{props.Title}</Text>
      </CardItem>
      <CardItem>
        <Body>
          <H3>{props.data}</H3>
        </Body>
      </CardItem>
    </Card>
  );
};
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
  Heading: {
    color: "gray",
  },
  StudntListContainer: {
    flexDirection: "row",
  },
});
