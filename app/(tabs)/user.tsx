import * as React from "react"
import { Button, TextInput } from "react-native-paper"
import { View } from "@/components/Themed";
import { useAuth } from "../auth";
import { Text } from "react-native";
import { StyleSheet } from "react-native";

interface LoginFormData {
    email: string;
    password: string;
}


interface LoginFormProps {
    formData: LoginFormData;
    setFormData: (formData: LoginFormData) => void;
    logIn: (email: string, password: string) => void;
    logOut: () => void;
}

function UserStatusDisplay({ email }: { email: string | null }) {
    return (
        <Text>{email ? `You are logged in as ${email}` : "You are not logged in"}</Text>
    );
}

function LoginForm(loginFormProps: LoginFormProps) {
    return (
        <View>
            <Text>Email</Text>
            <TextInput
                value={loginFormProps.formData.email}
                onChangeText={(text) => loginFormProps.setFormData({ ...loginFormProps.formData, email: text })}
                placeholder="Email"
            />
            <Text>Password</Text>
            <TextInput
                value={loginFormProps.formData.password}
                onChangeText={(text) => loginFormProps.setFormData({ ...loginFormProps.formData, password: text })}
                placeholder="Password"
            />
            <Button onPress={() => loginFormProps.logIn(loginFormProps.formData.email, loginFormProps.formData.password)}>Log In</Button>
            <Button onPress={() => loginFormProps.logOut()}>Log Out</Button>
        </View>
    );
}

export default function User() {
  const { apiToken, logIn, logOut } = useAuth();
  const [formData, setFormData] = React.useState<LoginFormData>({ email: "", password: "" });

  return (
    <View style={styles.container}>
        <UserStatusDisplay email={apiToken?  : apiToken} />
        <LoginForm
            formData={formData}
            setFormData={setFormData}
            logIn={logIn}
            logOut={logOut} />

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff", // Background color can be from your theme
      padding: 0,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 20,
    },
    separator: {
      marginVertical: 20,
      height: 1,
      width: "100%",
    },
  });