import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCr6Wrw9JzjFa2MJFjh4YxLFD9eRBPxc90",
  authDomain: "push-notification-b741f.firebaseapp.com",
  projectId: "push-notification-b741f",
  storageBucket: "push-notification-b741f.firebasestorage.app",
  messagingSenderId: "785500918542",
  appId: "1:785500918542:web:5dd4b2292a84a4496fbd5f",
  measurementId: "G-SFFD5YZ5CX"
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    console.log("Permission:", permission);

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BBzxSYWQNtC_QJgVmgxOaQFhvxJzsez9DJ89U6s-23UYx7Brnyh6ob8UFYMwIssCBdmZUpk8hMDl1P2SKP1qkqo",
      });

      console.log("FCM TOKEN:", token);
      return token;
    } else {
      console.log("Notification permission denied");
      return null;
    }
  } catch (error) {
    console.error("Error generating token:", error);
    return null;
  }
};

export const setupForegroundListener = () => {
  onMessage(messaging, (payload) => {
    console.log("Foreground message received:", payload);
    
    if (payload.notification) {
      new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: payload.notification.image || '/favicon.ico'
      });
    }
  });
};
