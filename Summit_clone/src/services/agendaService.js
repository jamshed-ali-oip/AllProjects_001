import dayjs from "dayjs";
import * as Calendar from "expo-calendar";
import { auth, db } from "../firebase";
import { logAxiosError } from "../helpers/axios";

async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
}

async function createCalendar() {
  const defaultCalendarSource = Platform.OS === "ios" ? await getDefaultCalendarSource() : { isLocalAccount: true, name: "Summit App Calendar" };
  const newCalendarID = await Calendar.createCalendarAsync({
    title: "Summit App Calendar",
    color: colors.primary,
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    ownerAccount: "personal",
    name: "internalCalendarName",
    isVisible: true,
    accessLevel: Calendar.CalendarAccessLevel.OWNER
  });
  return newCalendarID;
}

export const checkCalendar = async (setCalendarId) => {
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  if (status === "granted") {
    const phoneCalendars = await Calendar.getCalendarsAsync(
      Calendar.EntityTypes.EVENT
    );
    const summitCalendar = phoneCalendars.find(
      (calendar) => calendar.title === "Summit App Calendar"
    );
    if (summitCalendar) {
      setCalendarId(summitCalendar.id);
    } else {
      const newSummitCalendarId = await createCalendar();
      setCalendarId(newSummitCalendarId);
    }
  }
};

export const getAllEvents = (setEvents, setLoading) => {
  if(setLoading){
    setLoading(true);
  }
  const dbEvents = [];
  return db
    .ref("Events")
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((shot) => {
          let dbSessions = [];
          if (shot?.val()?.sessions) {
            Object.keys(shot?.val()?.sessions).forEach((key, index) => {
              dbSessions.push({ id: key, ...shot.val().sessions[key] });
            });
          }
          dbEvents.push({ ...shot.val(), sessions: dbSessions, id: shot.key });
        });
        setEvents(dbEvents);
      } else {
        setEvents([])
        console.log("No data available");
      }
    })
    .catch((error) => {
        logAxiosError(error);
    })
    .finally(() =>{
    if(setLoading){
      setLoading(false)
    }}
     );
};

export const getUsersSessions = (setBookmarkedSessions) => {
  return db
    .ref("UsersSessions/" + auth.currentUser.uid)
    .on("value", (snapShot) => {
      let dbBookmarkedSessions = [];
      if (snapShot.exists()) {
        snapShot.forEach((shot) => {
          dbBookmarkedSessions.push({
            id: shot.key,
            calendarEventId: shot.val().calendarEventId
          });
        });
      }
      setBookmarkedSessions(dbBookmarkedSessions);
    });
};

const handleAddCalenderEvent = async (item, events, calendarId) => {
  const event = events.find((event) =>
    event.sessions.some((session) => session.id === item.id)
  );
  let endDate = item.sessionTime.toString().split(" ")[0];
  const sessionDate = dayjs(item.sessionTime, "YYYY-MM-DD HH:mm");
  endDate = dayjs(`${endDate} 23:59`, "YYYY-MM-DD HH:mm");
  const year = sessionDate.year();
  const month = sessionDate.month();
  const day = sessionDate.date();
  const hours = sessionDate.hour();
  const minutes = sessionDate.minute();
  const startingDate = new Date(year, month, day, hours, minutes);
  endDate = new Date(year, month, day, 23, 59);
  const eventData = {
    alarms: [{ relativeOffset: -10, method: Calendar.AlarmMethod.ALERT }],
    calendarId: 1,
    startDate: startingDate,
    endDate: Date.parse(endDate),
    id: item.id,
    location: `${event.state} ${event.city}`,
    notes: item.sessionKeyNote,
    title: item.sessionTitle
  };
  const calenderEvent = await Calendar.createEventAsync(calendarId, eventData);
  return calenderEvent;
};

const handleRemoveCalenderEvent = async (id) => {
  await Calendar.deleteEventAsync(id);
};

export const handleSessionBookmark = async (
  item,
  bookmarkedSessions,
  events,
  calendarId,
  updating,
  setUpdating
) => {
//   console.log("This is the bookmarkedSessions ", bookmarkedSessions);
//   console.log("This is the auth.currentUser.uid ", auth.currentUser.uid);
//   console.log("This is the item.id ", item.id);
  let data = null;
  try {
    const bookmarkedSession = bookmarkedSessions.find(
      (session) => session.id === item.id
    );
    if (!bookmarkedSession && !updating) {
      setUpdating(true);
      const calendarEventId = await handleAddCalenderEvent(
        item,
        events,
        calendarId
      );
      data = { title: item.sessionTitle, calendarEventId };
      await db
        .ref("UsersSessions/" + auth.currentUser.uid + "/" + item.id)
        .set(data);
    } else if (!updating) {
      await handleRemoveCalenderEvent(bookmarkedSession.calendarEventId);
      await db
        .ref("UsersSessions/" + auth.currentUser.uid + "/" + item.id)
        .set(data);
    }
    setUpdating(false);
  } catch (error) {
    logAxiosError(error);
    setUpdating(false);
  }
};
