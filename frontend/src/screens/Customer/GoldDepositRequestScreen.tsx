import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import Input from "../../components/Input";
import Button from "../../components/Button";

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

  const handleSubmit = () => {
    // In a real app, you would call an API to submit the gold deposit request
    console.log("Submitting Gold Deposit Request:", {
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
    });
    Alert.alert(
      "Request Submitted",
      "Your gold deposit request has been submitted successfully."
    );
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
