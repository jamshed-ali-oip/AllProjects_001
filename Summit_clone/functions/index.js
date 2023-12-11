import functions from 'firebase-functions'
import { db } from '../src/firebase';

/**
 * Notification for one-on-one chat
 */

exports.chatNotifications = functions
  .database
  .ref('/messages/{user1}/{user2}/{messageId}')
  .onCreate(async (snapshot, context) => {
    const messageId = context.params.messageId;
    const newChatData = snapshot.val();

    if (!messageId.startsWith('-')) {
      // this is a single chat
      try {
        // check if there is an expo push token
        let token = ''
        const recipient = newChatData.to;
        const userSnapshot = await db.ref(`Users/${recipient}`).get()
        if (userSnapshot.exists()) {
          token = userSnapshot.val()?.pushNotificationToken;
        }
        
        if (token) {
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
    
          var raw = JSON.stringify({
            "to": token,
            "title": newChatData?.message ?? 'New message',
            "body": newChatData?.message ?? 'New message'
          });
    
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
    
          return fetch("https://exp.host/--/api/v2/push/send", requestOptions)
            .then(response => response.text())
            .then(result => console.log(`notification sent to `))
            .catch(error => console.log('error', error));
          } else {
            console.log('Expo push token not found on user metadata');
            return;
          }
        } catch (error) {
          console.log('An error occured', error?.message)
          return;
        }
    } else {
      // group chat ids starts with a dash
      // this is a group chat

      try {
        const recipientsIds = Object.keys(newChatData.to);
        let tokens = []
        recipientsIds.map(id => {
          let token = ''
          const userSnapshot = await db.ref(`Users/${id}`).get()
          if (userSnapshot.exists()) {
            token = userSnapshot.val()?.pushNotificationToken;
          }
          if (token) tokens.push(token)
        })
  
        if (tokens.length > 0) {
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
        
          var raw = JSON.stringify(tokens.map(token => ({
            "to": token,
            "title": newChatData?.message ?? 'New message',
            "body": newChatData?.message ?? 'New message'
          })))
    
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
    
          return fetch("https://exp.host/--/api/v2/push/send", requestOptions)
            .then(response => response.text())
            .then(result => console.log(`notification sent to `))
            .catch(error => console.log('error', error));
          
        } else {
          console.log('Expo push token not found on user metadata');
          return;
        }
      } catch (error) {
        console.log('An error occured', error?.message)
        return;
      }
    }
  })
