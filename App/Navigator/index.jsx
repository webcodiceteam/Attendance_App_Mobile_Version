import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Screens/Auth/Login";
import Home from "../Screens/Home";
import Admin from "../Screens/Admin/AdminDrawer";
import Teacher from "../Screens/Teacher/TeacherDrawer";
import Student from "../Screens/Student/StudentDrawer";
import Add_Class from "../Screens/Admin/Add_Class";
import Add_Student from "../Screens/Admin/Add_Student";
import View_Student from "../Screens/Admin/View_Student";
import View_Teacher from "../Screens/Admin/View_Teacher";
import Add_Subject from "../Screens/Admin/Add_Subject";
import Genrate_QR from "../Screens/Admin/Genrate_QR";
import Add_Teacher from "../Screens/Admin/Add_Teacher";
import View_Class from "../Screens/Admin/View_Class";
import View_QR from "../Screens/Admin/View_QR";
import View_Subject from "../Screens/Admin/View_Subject";
import Genrate_QR_Teacher from "../Screens/Teacher/Genrate_QR_Teacher";
import View_Student_Teacher from "../Screens/Teacher/View_Student_Teacher";
import QR_Scan from "../Screens/Student/QR_Scan";
import View_Profile_Student from "../Screens/Student/View_Profile_Student";
import AttendanceStudent from "../Screens/Student/Attendance";
import MyAtendanceStudent from "../Screens/Student/MyAtendanceStudent";
import Teacher_profile from "../Screens/Teacher/Show_Profile_Teacher";
import View_Teacher_qr from "../Screens/Teacher/View_QR_List";
import View_Student_QR from "../Screens/Teacher/View_QR_Student";
// import { createDrawerNavigator } from "@react-navigation/drawer";

const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Admin"
          component={Admin}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Teacher"
          component={Teacher}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Student"
          component={Student}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Add_Class"
          component={Add_Class}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Add_Student"
          component={Add_Student}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="View_Student"
          component={View_Student}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Add_Subject"
          component={Add_Subject}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Genrate_QR"
          component={Genrate_QR}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Add_Teacher"
          component={Add_Teacher}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Genrate_QR_Teacher"
          component={Genrate_QR_Teacher}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="View_Student_Teacher"
          component={View_Student_Teacher}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="QR_Scan"
          component={QR_Scan}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="View_Profile_Student"
          component={View_Profile_Student}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="View_Class"
          component={View_Class}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="View_Subject"
          component={View_Subject}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="View_QR"
          component={View_QR}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="View_Teacher"
          component={View_Teacher}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="AttendanceStudent"
          component={AttendanceStudent}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="MyAtendanceStudent"
          component={MyAtendanceStudent}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Teacher_profile"
          component={Teacher_profile}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="View_Teacher_qr"
          component={View_Teacher_qr}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="View_Student_QR"
          component={View_Student_QR}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
