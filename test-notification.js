

const admin = require('firebase-admin');

const serviceAccount = {
  "type": "service_account",
  "project_id": "push-notification-b741f",
  "private_key_id": "your-private-key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@push-notification-b741f.iam.gserviceaccount.com",
  "client_id": "your-client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function sendTestNotification(fcmToken) {
  const message = {
    notification: {
      title: 'SK Bakery Special!',
      body: 'Fresh cakes available now! Order your favorite treats.',
      image: 'https://liliyum.com/cdn/shop/products/Chocolate-Ganache-Cake-1_720x.jpg'
    },
    data: {
      click_action: 'FLUTTER_NOTIFICATION_CLICK',
      sound: 'default'
    },
    token: fcmToken
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('Successfully sent message:', response);
  } catch (error) {
    console.log('Error sending message:', error);
  }
}

const testToken = 'YOUR_FCM_TOKEN_HERE';
sendTestNotification(testToken);