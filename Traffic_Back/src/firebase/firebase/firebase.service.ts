import * as admin from 'firebase-admin';
admin.initializeApp({
credential: admin.credential.applicationDefault(), // or use service account credentials
});
export const sendPushNotification = async (token: string, message: string) => {
try {
const messagePayload = {
notification: {
title: 'New Notification',
body: message,
},
token: token,
};
// Send notification to the device
const response = await admin.messaging().send(messagePayload);
console.log('Notification sent successfully:', response);
} catch (error) {
console.error('Error sending notification:', error);
}
};


