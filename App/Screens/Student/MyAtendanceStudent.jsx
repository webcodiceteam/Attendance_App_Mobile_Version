import React, { useEffect, useState } from "react";
import { AsyncStorage, SafeAreaView, StyleSheet } from "react-native";
import HeaderComp from "../Header";
import axios from "axios";
import { AttendanceViewCard } from "./Card";
import Loader from "../Admin/QR_Loader";
import { ScrollView } from "react-native-gesture-handler";

export default function MyAtendanceStudent({ navigation }) {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStudentAttendance();
  }, []);

  const getStudentAttendance = () => {
    setLoading(true);
    AsyncStorage.getItem("user")
      .then((AsyncData) => {
        axios
          .post("http://krishma.webcodice.com/react-native/axios.php", {
            request: 12,
            username: AsyncData,
          })
          .then((response) => {
            let UserData = response.data[0];
            axios
              .post("http://krishma.webcodice.com/react-native/axios.php", {
                request: 32,
                class_name: UserData.class_name,
              })
              .then((AllGenratedQR) => {
                response.data.push({ status: "0" });
                axios
                  .post("http://krishma.webcodice.com/react-native/axios.php", {
                    request: 33,
                    username: AsyncData,
                  })
                  .then((AllUserScanedQR) => {
                    let All = AllGenratedQR.data;
                    let Scaned = AllUserScanedQR.data;
                    All.map((x) => {
                      Scaned.map((y) => {
                        if (x.qrlink === y.qrlink) {
                          x.Status = 1;
                        }
                      });
                    });
                    setAttendanceData(All);
                    setLoading(false);
                  })
                  .catch(function (error) {
                    setLoading(false);
                    console.log(error);
                  });
              })
              .catch(function (error) {
                setLoading(false);
                console.log(error);
              });
          })
          .catch(function (error) {
            setLoading(false);
            console.log(error);
          });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <SafeAreaView>
      <HeaderComp navigation={navigation} />
      <Loader loading={loading} />
      <ScrollView style={styles.container}>
        {attendanceData.map((x) => {
          return (
            <AttendanceViewCard
              key={x.id}
              ID={x.id}
              Title={x.date_time}
              TeacherName={x.teacher}
              Data={x.subject}
              Status={x.Status === 1 ? "Present" : "Absent"}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: "18%",
  },
});
