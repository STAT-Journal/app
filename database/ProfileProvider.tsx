import { createContext, useEffect, useState } from "react";
import { AppProfile } from "./models";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

function loadUserFromAsyncStorage(): Promise<AppProfile | undefined> {
    return AsyncStorage.getItem("user").then((user) => {
        if (user) {
            let parsedUser = JSON.parse(user) as AppProfile;
            if (parsedUser.Username && parsedUser.AvatarSVG) {
                return parsedUser;
            }
            else {
                return undefined;
            }
        } else {
            return undefined;
        }
    });
}

function saveUserToAsyncStorage(user: AppProfile | undefined) {
    if (user) {
        return AsyncStorage.setItem("user", JSON.stringify(user));
    } else {
        return AsyncStorage.removeItem("user");
    }
}

interface ProfileContextType {
    profile: AppProfile | undefined;
    setProfile: (user: AppProfile | undefined) => void;
}

const ProfileContext = createContext<ProfileContextType>({
    profile: undefined,
    setProfile: () => {
        throw new Error("setProfile function must be overridden");
    }
});

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
    const [profile, testSetProfile] = useState<AppProfile | undefined>(undefined);

    useEffect(() => {
        loadUserFromAsyncStorage().then((user) => {
            if (user) {
                testSetProfile(user);
            }
        });
    }, []);

    return (
        <ProfileContext.Provider value={{
            profile: profile,
            setProfile:  (profile: AppProfile | undefined) => {
                console.log("Test");
                testSetProfile(profile);
                saveUserToAsyncStorage(profile);
                console.log("Saved user to async storage");
                console.log(profile);
            }
        }}>
            {children}
        </ProfileContext.Provider>
    );
}

export const useProfileContext = () => {
    const user = React.useContext(ProfileContext);
    if (!user) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return user;
}