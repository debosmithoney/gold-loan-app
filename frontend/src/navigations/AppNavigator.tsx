import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import screens
import LoginScreen from "../screens/LoginScreen";
import CustomerKYCVerificationScreen from "../screens/Customer/KYCVerificationScreen";
import GoldDepositRequestScreen from "../screens/Customer/GoldDepositRequestScreen";
import ApplicationStatusScreen from "../screens/Customer/ApplicationStatusScreen";
import EmployeeVerificationScreen from "../screens/Employee/VerificationScreen";
import GoldEvaluationScreen from "../screens/Employee/GoldEvaluationScreen";
import GovernmentKYCVerificationScreen from "../screens/Government/KYCVerificationScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CustomerTabs = () => (
  <Tab.Navigator>
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

const EmployeeTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Verification" component={EmployeeVerificationScreen} />
    <Tab.Screen name="Gold Evaluation" component={GoldEvaluationScreen} />
  </Tab.Navigator>
);

const GovernmentTabs = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="KYC Verification"
      component={GovernmentKYCVerificationScreen}
    />
  </Tab.Navigator>
);

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
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
