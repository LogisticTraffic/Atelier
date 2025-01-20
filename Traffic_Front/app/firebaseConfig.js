import { initializeApp} from'firebase/app';
 import { getMessaging, getToken, onMessage} from'firebase/messaging';
 import * as Notifications from'expo-notifications';
 const firebaseConfig= {
 apiKey: "AIzaSyA-2yl7lt5gOKIGsC7wQUM4fpIyW5NWpI8",
 authDomain: "notification-ea157.firebaseapp.com",
 projectId: "notification-ea157",
 storageBucket: "notification-ea157.firebasestorage.app",
 messagingSenderId: "304845803113",
 appId: "1:304845803113:android:325e8941ef99fbc31e9cf8",
 };
 const app = initializeApp(firebaseConfig);
 const messaging = getMessaging(app);
 export const requestPermissionAndGetToken= async() => {
 // Requestpermission in orderto sendnotifications
 const permission = await Notifications.requestPermissionsAsync();
 if (permission.granted) {
 const token= await getToken(messaging, { vapidKey: 'BGNHJ36hBnZYvOmu_f3pf0fEEwViy26OB27Px_qLAqj7ljfP6KQStjKlvFwuemqPtT-FgGNC3dt4cRhFIvsIZPQ' });
 console.log('Firebase Token:', token);
 return token;
 } else{
 console.log('Permission not granted');
 return null;
 }
 }
 export const onNotificationReceived = () => {
    onMessage(messaging, (payload) => {
    console.log('Notification received:', payload);
    Notifications.setNotificationHandler({
    handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    }),
    });
    Notifications.presentNotificationAsync({
    title: payload.notification.title,
    body: payload.notification.body,
    });
    });
    }