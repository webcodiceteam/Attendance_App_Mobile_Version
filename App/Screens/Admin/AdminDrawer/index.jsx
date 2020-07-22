import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Admin from "../index";
import AddTeacher from "../Add_Teacher";

const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <Drawer.Navigator initialRouteName="Admin">
      <Drawer.Screen
        name="Admin"
        component={Admin}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="AddTeacher"
        component={AddTeacher}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}
