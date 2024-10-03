import React, { useState } from "react";
import { View, StyleSheet, Alert, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Input from "../components/Input";
import Button from "../components/Button";
import { login } from "../services/api";
import { useAuth } from "../context/AuthContext";

interface User {
  id: number; 
  username: string; 
  role: "CUSTOMER" | "EMPLOYEE" | "GOVERNMENT";
}

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { login: authLogin } = useAuth();

  const handleLogin = async () => {
    // Basic validation
    if (!username || !password) {
      Alert.alert("Error", "Please enter both username and password");
      return;
    }

    setIsLoading(true);
    try {
      const user = (await login(username, password)) as User;

      if (!user.role) {
        Alert.alert("Error", "User role is invalid or not found");
        return;
      }

      authLogin(user);

      // Navigate based on user role
      switch (user.role) {
        case "CUSTOMER":
          navigation.navigate("CustomerDashboard");
          break;
        case "EMPLOYEE":
          navigation.navigate("EmployeeDashboard");
          break;
        case "GOVERNMENT":
          navigation.navigate("GovernmentDashboard");
          break;
        default:
          Alert.alert("Error", "Invalid user role");
      }
    } catch (error) {
      console.error(error); 
      Alert.alert("Error", "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        label="Username"
        value={username}
        onChangeText={setUsername}
        placeholder="Enter your username"
      />
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />
      <Button
        title={isLoading ? "Logging in..." : "Login"}
        onPress={handleLogin}
        disabled={isLoading}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text>Want to Register?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
});

export default LoginScreen;
