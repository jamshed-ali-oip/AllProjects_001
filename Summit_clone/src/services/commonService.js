import { auth, db } from "../firebase";

export const getAllAttendees = (setAttendees) => {
  db.ref("Users/")
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        let dbUsers = [];
        snapshot.forEach((shot) => {
          dbUsers.push({ id: shot.key, ...shot.val() });
        });
        const sortedUsers = dbUsers.sort((a, b) => {
          let fa = a.firstName.toLowerCase(),
            fb = b.firstName.toLowerCase();
          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
        setAttendees(
          sortedUsers.filter((user) => user.id !== auth.currentUser.uid)
        );
      }
    })
    .catch((error) => {
      logAxiosError(error);
    });
};
