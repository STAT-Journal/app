import * as React from "react"
import { Button, TextInput } from "react-native-paper"
import { View } from "@/components/Themed";
import { useAuth } from "../auth";
import { Text } from "react-native";
import { UserStyles } from "@/styles/styles";

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

function UserStatusDisplay({ email }: { email: string | undefined }) {
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
  const { user, logIn, logOut } = useAuth();
  const [formData, setFormData] = React.useState<LoginFormData>({ email: "", password: "" });

  console.log(user);

  return (
    <View style={UserStyles.container}>
        <UserStatusDisplay email={user?.email} />
        <LoginForm
            formData={formData}
            setFormData={setFormData}
            logIn={logIn}
            logOut={logOut} />

    </View>
  );
}