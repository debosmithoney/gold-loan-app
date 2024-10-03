import React, { useState } from "react";
import { ScrollView, StyleSheet, Alert } from "react-native";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { submitGoldDepositRequest } from '../../services/api' // Assuming you have an api folder for request functions

const GoldDepositRequestScreen: React.FC = () => {
  const [knNumber, setKnNumber] = useState("");
  const [goldType, setGoldType] = useState("");
  const [weight, setWeight] = useState("");
  const [placeBought, setPlaceBought] = useState("");
  const [jewelerName, setJewelerName] = useState("");
  const [jewelerAddress, setJewelerAddress] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [bankName, setBankName] = useState("");
  const [branchName, setBranchName] = useState("");

  const validateForm = () => {
    if (
      !knNumber ||
      !goldType ||
      !weight ||
      !placeBought ||
      !jewelerName ||
      !accountHolderName ||
      !accountNumber ||
      !ifscCode ||
      !bankName ||
      !branchName
    ) {
      Alert.alert("Error", "Please fill in all fields before submitting.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const requestData = {
      knNumber,
      goldType,
      weight,
      placeBought,
      jewelerName,
      jewelerAddress,
      accountHolderName,
      accountNumber,
      ifscCode,
      bankName,
      branchName,
    };

    try {
      const response = await submitGoldDepositRequest(requestData);
      console.log("Gold Deposit Request Submitted:", response);
      Alert.alert(
        "Request Submitted",
        "Your gold deposit request has been submitted successfully."
      );
      clearForm();
    } catch (error) {
      Alert.alert("Error", "Failed to submit request. Please try again later.");
    }
  };

  const clearForm = () => {
    setKnNumber("");
    setGoldType("");
    setWeight("");
    setPlaceBought("");
    setJewelerName("");
    setJewelerAddress("");
    setAccountHolderName("");
    setAccountNumber("");
    setIfscCode("");
    setBankName("");
    setBranchName("");
  };

  return (
    <ScrollView style={styles.container}>
      <Input label="KN Number" value={knNumber} onChangeText={setKnNumber} />
      <Input
        label="Gold Type"
        value={goldType}
        onChangeText={setGoldType}
        placeholder="8/16/24 Carat"
      />
      <Input
        label="Weight (in grams)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      <Input
        label="Place Bought From"
        value={placeBought}
        onChangeText={setPlaceBought}
      />
      <Input
        label="Jeweler's Name"
        value={jewelerName}
        onChangeText={setJewelerName}
      />
      <Input
        label="Jeweler's Address"
        value={jewelerAddress}
        onChangeText={setJewelerAddress}
      />
      <Input
        label="Account Holder Name"
        value={accountHolderName}
        onChangeText={setAccountHolderName}
      />
      <Input
        label="Account Number"
        value={accountNumber}
        onChangeText={setAccountNumber}
        keyboardType="numeric"
      />
      <Input label="IFSC Code" value={ifscCode} onChangeText={setIfscCode} />
      <Input label="Bank Name" value={bankName} onChangeText={setBankName} />
      <Input
        label="Branch Name"
        value={branchName}
        onChangeText={setBranchName}
      />
      <Button title="Submit Request" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default GoldDepositRequestScreen;
