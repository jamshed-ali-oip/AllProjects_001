import { faker } from '@faker-js/faker';
import { auth, db } from '../firebase';
import { logAxiosError } from '../helpers/axios';
import client from './axios';

const getAllCoaches = () => {
  let coachesList = [];

  for (let i = 0; i < 10; i++) {
    coachesList.push({
      id: i,
      firstName: faker.name.firstName(),
      imageSource: faker.image.avatar(),
      isActive: faker.random,
    });
  }

  return coachesList;
};

const getAllActiveUsers = () => {
  let activeUsers = [];

  for (let i = 0; i < 30; i++) {
    activeUsers.push({
      id: i,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      imageSource: faker.image.avatar(),
      isActive: faker.random,
    });
  }

  return activeUsers;
};

const getConversations = () => {
  let conversations = [];
  const numberOfChats = faker.datatype.number({ max: 20 });

  for (let y = 0; y < numberOfChats; y++) {
    let users = [];
    let numberOfUsers = faker.datatype.number({ max: 7, min: 1 });

    for (let x = 0; x < numberOfUsers; x++) {
      users.push({
        firstName: faker.name.firstName(),
        imageSource: faker.image.avatar(),
        lastName: faker.name.lastName(),
      });
    }

    conversations.push({
      id: y,
      isActive: faker.datatype.boolean(),
      message: faker.lorem.lines(1),
      users: users,
      timestamp: faker.datatype.number({ max: 59 }),
    });
  }

  return conversations;
};

const getNotifications = () => {
  let notifications = [];
  const numberOfNotifications = faker.datatype.number({ max: 20 });

  for (let x = 0; x < numberOfNotifications; x++) {
    notifications.push({
      id: x,
      type: faker.datatype.boolean(),
      isUnread: faker.datatype.boolean(),
      message: faker.lorem.lines(1),
      timestamp: faker.datatype.number({ max: 59 }),
    });
  }

  return notifications;
};

const getChatMessages = () => {
  let messages = [];
  const numberOfMessages = faker.datatype.number({ max: 20 });
  const avatar = faker.image.avatar();
  const firstName = faker.name.firstName();

  for (let x = 0; x < numberOfMessages; x++) {
    const id = faker.datatype.number({
      max: 1,
    });
    messages.push({
      _id: x,
      text: faker.lorem.lines(1),
      createdAt: new Date(),
      user: {
        _id: id,
        avatar: id === 1 ? avatar : null,
        name: id === 1 ? firstName : '',
      },
      sent: faker.datatype.boolean(),
    });
  }
  return messages;
};

export const getEventsData = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return client
    .get('events/all', config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      logAxiosError(error);
      return null;
    });
};


export const getAllAttendees = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return client
    .get('attendees/all', config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      logAxiosError(error);
      return null;
    });
};




export {
  getAllCoaches,
  getAllActiveUsers,
  getConversations,
  getNotifications,
  getChatMessages,
};
