import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import CustomerKYCVerificationScreen from "../screens/Customer/KYCVerificationScreen";
import GoldDepositRequestScreen from "../screens/Customer/GoldDepositRequestScreen";
import ApplicationStatusScreen from "../screens/Customer/ApplicationStatusScreen";
import EmployeeVerificationScreen from "../screens/Employee/VerificationScreen";
import GoldEvaluationScreen from "../screens/Employee/GoldEvaluationScreen";
import GovernmentKYCVerificationScreen from "../screens/Government/KYCVerificationScreen";
import LogoutButton from "../components/LogoutButton";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Customer Tab Navigator
const CustomerTabs = () => (
  <Tab.Navigator
    screenOptions={({ navigation }) => ({
      headerRight: () => <LogoutButton />, // Adding the Logout button to the header
    })}
  >
    <Tab.Screen
      name="KYC Verification"
      component={CustomerKYCVerificationScreen}
    />
    <Tab.Screen
      name="Gold Deposit Request"
      component={GoldDepositRequestScreen}
    />
    <Tab.Screen name="Application Status" component={ApplicationStatusScreen} />
  </Tab.Navigator>
);

// Employee Tab Navigator
const EmployeeTabs = () => (
  <Tab.Navigator
    screenOptions={({ navigation }) => ({
      headerRight: () => <LogoutButton />, // Adding the Logout button to the header
    })}
  >
    <Tab.Screen name="Verification" component={EmployeeVerificationScreen} />
    <Tab.Screen name="Gold Evaluation" component={GoldEvaluationScreen} />
  </Tab.Navigator>
);

// Government Tab Navigator
const GovernmentTabs = () => (
  <Tab.Navigator
    screenOptions={({ navigation }) => ({
      headerRight: () => <LogoutButton />, // Adding the Logout button to the header
    })}
  >
    <Tab.Screen
      name="KYC Verification"
      component={GovernmentKYCVerificationScreen}
    />
  </Tab.Navigator>
);

// Main App Navigator
const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="CustomerDashboard"
          component={CustomerTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EmployeeDashboard"
          component={EmployeeTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GovernmentDashboard"
          component={GovernmentTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
