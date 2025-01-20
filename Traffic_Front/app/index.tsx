import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from './Auth/SignUpScreen';
import SignIn from './Auth/SignInScreen';
import Welcome from './Auth/Welcome';
import Driver from './Driver/Driver';
import Notification from './Messagerie/Notification';
import Chat from './Messagerie/Chat';
import Info from './Responsable/Info';
import Status from './Responsable/Status ';
import Loading from './Loading';
import { NotificationProvider } from './NotificationContext';
import * as Notifications from 'expo-notifications';
import HomeScreen from './Test';
import AllRes from './Admin/AllRes';
import ResDriver from './Admin/ResDriver'
import ChatAppx from './Responsable/Chatx';
import All from './Responsable/All';
const Stack = createStackNavigator(); // Create the stack navigator

export default function App() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  return (
    <NotificationProvider>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Test"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Driver"
            component={Driver}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Notifier"
            component={Notification}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Chatx"
            component={ChatAppx}
            options={{ headerShown: false }}
          />
          
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Loading"
            component={Loading}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Info"
            component={Info}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="drivers"
            component={All}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Status"
            component={Status}
            options={{ headerShown: false }}
          />
           <Stack.Screen
            name="admin"
            component={AllRes}
            options={{ headerShown: false }}
          />
            <Stack.Screen
            name="resdriver"
            component={ResDriver}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
    </NotificationProvider>
  );
}
