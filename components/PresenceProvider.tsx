import React, { useContext, useEffect } from "react";
import { Portal } from "react-native-paper";
import { SvgUri } from "react-native-svg";
import Toast from "react-native-toast-message";
import { useClient, useSubscription } from "urql";

const presenceContext = React.createContext<string[]>([]);


export const PresenceProvider = ({ children }: { children: React.ReactNode }) => {
    const query = "subscription presence { presence }"
    const [result, reexecuteQuery] = useSubscription({ query })
    const [avatarSVGs, setAvatarSVGs] = React.useState<string[]>([])
    const [newSVG, setNewSVG] = React.useState<string>("")

    useEffect(() => {
        console.log(result.data?.presence);
        result.data && setAvatarSVGs((prev) => [...prev, result.data.presence])

        setNewSVG(result.data?.presence??"")
        setTimeout(() => {
            setNewSVG("");
        }, 5000);

    }, [result.data?.presence])

    return (
        <presenceContext.Provider value={avatarSVGs}>
            <Portal>
                {newSVG &&
                    <SvgUri uri={newSVG} style={{ position: "absolute", top: 0, left: 0, width: 5 }} />    
                }
            </Portal>
            {children}
        </presenceContext.Provider>
    )
}

export const usePresence = () => {
    return React.useContext(presenceContext);
}