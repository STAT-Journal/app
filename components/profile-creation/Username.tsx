import { Input } from "antd";
import { Button } from "antd";
import { useState, useEffect } from "react";
import { useMutation } from "urql";
import { graphql } from "../../gql/codegen";
import { StepProps } from "./Utils";


export function UsernameInput(props: StepProps) {
    const currentUserContext = props.currentUserContext;
    const addUsernameMutation = graphql(`mutation addUsername($username: String!) {\n  addUsername(username: $username) {\n    username\n  }\n}`);
    const [ _result, executeMutation ] = useMutation(addUsernameMutation);
    const [username, setUsername] = useState(currentUserContext.me?.public?.username || "");

    const isDisabled = Boolean(currentUserContext?.me?.public?.username);
    
    useEffect(() => {
        setUsername(currentUserContext.me?.public?.username || "");
        
        if (currentUserContext.me?.public?.username) {
            console.log("Username already set");
            props.notifyStatus("finish");
        }

    }, [currentUserContext.me?.public?.username]);

    const createProfile = () => {
        executeMutation({ username: username })
        .then((result) => {
            if (result.error) {
                console.error(result.error);
            }
            else {
                currentUserContext.reExecuteResult();
            }})};


    return (
        <div style={{width: "80%"}}>
            <Input disabled={isDisabled} value={username} onChange={(e) => setUsername(e.target.value)} />
            <Button disabled={isDisabled} onClick={createProfile}>Create Profile</Button>
        </div>
    )
}