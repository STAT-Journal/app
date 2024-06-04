import * as React from 'react';
import { useState, useEffect } from 'react';
import { Drawer, Button } from 'react-native-paper';
import * as AuthSession from 'expo-auth-session';

const UserSwipeMenu = ({ visible, setVisible, request, response, promptAsync }: { visible: boolean, setVisible: (visible: boolean) => void, request: any, response: any, promptAsync: () => void }) => {
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    
    useEffect(() => {
        setIsDrawerVisible(visible);
    }, [visible]);
    
    return (
        <Drawer.Section>
            response && response.accessToken && (
                <Drawer.Item
                    label="Logout"
                    onPress={() => {
                        setVisible(false);
                    }}
                />
            )
            !response || !response.accessToken && (
                <Drawer.Item
                    label="Login"
                    onPress={() => {
                        promptAsync();
                        setVisible(false);
                    }}
                />
            )
        </Drawer.Section>
    );
    
}