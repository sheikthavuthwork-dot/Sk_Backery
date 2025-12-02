importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyCr6Wrw9JzjFa2MJFjh4YxLFD9eRBPxc90",
  authDomain: "push-notification-b741f.firebaseapp.com",
  projectId: "push-notification-b741f",
  storageBucket: "push-notification-b741f.firebasestorage.app",
  messagingSenderId: "785500918542",
  appId: "1:785500918542:web:5dd4b2292a84a4496fbd5f",
  measurementId: "G-SFFD5YZ5CX"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Background message:", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
