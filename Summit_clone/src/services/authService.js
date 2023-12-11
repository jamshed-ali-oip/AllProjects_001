import { auth, db } from "../firebase";

const signIn = async (email, password) => {
  let loggedInUser;
  let dbUser;
  let token;
  let error;
  try {
    // sing the user into firebase
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password
    );
    loggedInUser = userCredential.user;
    if (loggedInUser) {
      // get the logged in user data from firebase
      const data = await db.ref("Users/" + loggedInUser.uid).get();
      if (data.exists()) {
        // get the user access token
        token = await loggedInUser.getIdToken();
        dbUser = data.val();
      } else {
        // rare sinario - if the user does not exist in firebase db throw an error
        throw new Error("User does not exist");
      }
    }
  } catch (err) {
    error = err;
  }
  // return a promise that resolve or reject according to if the user is authorized or not
  return new Promise((resolve, reject) => {
    if (error) {
      reject(error);
    } else {
      resolve({
        user: { ...dbUser, id: loggedInUser.uid },
        accessToken: token
      });
    }
  });
};

const register = async (user) => {
  let newUser;
  let token;
  let error;
  try {
    // sing up the user
    const userCredential = await auth.createUserWithEmailAndPassword(
      user.email,
      user.password
    );
    newUser = userCredential?.user;
    if (newUser) {
      delete user.password;
      delete user.passwordConfirmation;
      // save the newly created user into firebase using its ID and value
      await db.ref("Users/" + newUser.uid).set(user, async (err) => {
        if (err) {
          error = err;
        }
      });
      // get the newly created user access token
      token = await newUser.getIdToken();
    }
  } catch (err) {
    error = err;
  }

  // return a promise that resolve or reject according to if the user is successfully signed up or not
  return new Promise((resolve, reject) => {
    if (error) {
      reject(error);
    } else {
      resolve({ user: { ...user, id: newUser.uid }, accessToken: token });
    }
  });
};

const isEmailAvailable = async (
  email,
) => {
  let usersEmails = []
 await db.ref("Users").get().then((snapShot) => {
    if(snapShot.exists()){
      snapShot.forEach((shot) => {
        usersEmails.push(shot.val().email)
      })
    }
  }).catch((error) => console.log(error))
  if(usersEmails.includes(email)){
    return false
  }
  else {
    return true
  }
};

const updatePushNotificationToken = async (token) => {
  const user = auth.currentUser;
  if (user && token) {
    const userRef = db.ref(`Users/${user.uid}`);
    await userRef.update({
      pushNotificationToken: token
    })
  } else {
    console.log('missing required data', {
      user,
      token
    })
  }
}


export const authService = {
  signIn,
  register,
  isEmailAvailable,
  updatePushNotificationToken
};
