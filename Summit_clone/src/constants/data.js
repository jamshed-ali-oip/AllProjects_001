import {faker} from '@faker-js/faker';

export const homescreenFlatListData = [
  {
    id: 1,
    imageSource: require('../images/home/preperation.jpg'),
    text: 'Preperation',
  },
  {
    id: 2,
    imageSource: require('../images/home/resources.jpg'),
    text: 'Resources',
  },
];

export const homescreenInitialSession = [
  {
    date: '0',
    time: 'WKS',
  },
  {
    date: '0',
    time: 'DYS',
  },
  {
    date: '0',
    time: 'HRS',
  },
  {
    date: '0',
    time: 'MIN',
  },
  {
    date: '0',
    time: 'SEC',
  },
];

export const agendaScreenData = [
  {
    id: 0,
    date: null,
    timestamp: '2021-09-08T10:00:00',
    category: 'Sales',
    imageSource: require('../images/agenda/image3.jpg'),
    title: 'How to get clients to the YES',
    author: 'Susie Carder',
    bookmarked: true,
  },
  {
    id: 1,
    date: null,
    timestamp: '2021-09-08T11:00:00',
    category: 'Mindset',
    imageSource: require('../images/agenda/image2.jpg'),
    title: 'Turn Your Dreams into a Reality',
    author: 'Helice Bridges',
    bookmarked: false,
  },
  {
    id: 2,
    date: null,
    timestamp: '2021-09-08T12:00:00',
    category: 'Funnels',
    imageSource: require('../images/agenda/image4.jpg'),
    title: 'Sales Funnels that Convert',
    author: 'Josie Martinez',
    bookmarked: false,
  },
  {
    id: 3,
    date: null,
    timestamp: '2021-09-08T13:00:00',
    category: 'Mindset',
    imageSource: require('../images/agenda/image5.jpg'),
    title: '10 Ways to Clear',
    author: 'Melanie Clark',
    bookmarked: true,
  },
  {
    id: 4,
    date: null,
    timestamp: '2021-09-08T14:00:00',
    category: 'Mindset',
    imageSource: require('../images/agenda/image3.jpg'),
    title: 'VIP Only Afterparty',
    author: 'Susie Carder',
    bookmarked: false,
  },
];

export const agendaScreenCalendarData = [
  {
    id: 0,
    dayOfWeek: 'W',
    day: 6,
    isSelected: false,
  },
  {
    id: 1,
    dayOfWeek: 'T',
    day: 7,
    isSelected: false,
  },
  {
    id: 2,
    dayOfWeek: 'F',
    day: 8,
    isSelected: true,
  },
  {
    id: 3,
    dayOfWeek: 'S',
    day: 9,
    isSelected: false,
  },
  {
    id: 4,
    dayOfWeek: 'S',
    day: 10,
    isSelected: false,
  },
  {
    id: 5,
    dayOfWeek: 'M',
    day: 11,
    isSelected: false,
  },
  {
    id: 6,
    dayOfWeek: 'T',
    day: 12,
    isSelected: false,
  },
];

export const attendeesScreenData = () => {
  var tempArray = [];

  for (let x = 0; x < 20; x++) {
    tempArray.push({
      id: x,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      jobTitle: faker.name.jobTitle(),
      imageSource: faker.image.avatar(),
    });
  }

  return tempArray;
};

export const imageExtensions = [
  "jpg",
  "jpeg",
  "png",
  "svg",
  "webp",
  "apng",
  "gif",
  "jfif",
  "pjpeg",
  "pjp"
];

export const fileTypes = ["pdf", "doc", "xls", "ppt", "pptx", "xlsx", "docx", "zip"];


// [
//   {
//     id: 0,
//     firstName: 'Amanda',
//     lastName: 'Chan',
//     jobTitle: 'Motivational Speaker',
//     imageSource: require('../images/agenda/image2.jpg')
//   },
//   {
//     id: 1,
//     firstName: 'Ariel',
//     lastName: 'Winter',
//     jobTitle: 'Fitness Coach',
//     imageSource: require('../images/agenda/image3.jpg')
//   },
//   {
//     id: 2,
//     firstName: 'Armando',
//     lastName: 'Ortega',
//     jobTitle: 'Theta Healer',
//     imageSource: require('../images/agenda/image4.jpg')
//   },
//   {
//     id: 3,
//     firstName: 'Astrid',
//     lastName: 'Jenkins',
//     jobTitle: 'Relationship Specialist',
//     imageSource: require('../images/agenda/image2.jpg')
//   },
//   {
//     id: 4,
//     firstName: 'Ava Wilkins',
//     lastName: 'Chan',
//     jobTitle: 'Motivational Speaker',
//     imageSource: require('../images/agenda/image2.jpg')
//   },
//   {
//     id: 5,
//     firstName: 'Amanda',
//     lastName: 'Chan',
//     jobTitle: 'Motivational Speaker',
//     imageSource: require('../images/agenda/image2.jpg')
//   },
//   {
//     id: 6,
//     firstName: 'Amanda',
//     lastName: 'Chan',
//     jobTitle: 'Motivational Speaker',
//     imageSource: require('../images/agenda/image2.jpg')
//   },
//   {
//     id: 7,
//     firstName: 'Amanda',
//     lastName: 'Chan',
//     jobTitle: 'Motivational Speaker',
//     imageSource: require('../images/agenda/image2.jpg')
//   },
//   {
//     id: 8,
//     firstName: 'Amanda',
//     lastName: 'Chan',
//     jobTitle: 'Motivational Speaker',
//     imageSource: require('../images/agenda/image2.jpg')
//   },
// ]
