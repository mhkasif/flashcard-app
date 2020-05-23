import { AsyncStorage } from "react-native";

import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
export const Data = {
  React: {
    title: "React",
    questions: [
      {
        question: "What is React?",
        answer: "A library for managing user interfaces",
      },
      {
        question: "Where do you make Ajax requests in React?",
        answer: "The componentDidMount lifecycle event",
      },
    ],
  },
  JavaScript: {
    title: "JavaScript",
    questions: [
      {
        question: "What is a closure?",
        answer:
          "The combination of a function and the lexical environment within which that function was declared.",
      },
    ],
  },
};
// export const setData =async () => {
//   try {
//     Object.entries(Data).forEach((d) => {
//       // console.log(d[0]);
//      await AsyncStorage.setItem(d[0], JSON.stringify(d[1]));
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
export const getDecks = async () => {
  const cardsData = [];
  const keys = await AsyncStorage.getAllKeys();
  const dataAll = await AsyncStorage.multiGet(keys);
  dataAll.forEach((data) => {
    if(data[0]!==NOTIFICATION_KEY)
    cardsData.push({ [data[0]]: JSON.parse(data[1]) });
  });
  return cardsData;
};
export const getDeck = async (id) => {
  try {
    const data = await AsyncStorage.getItem(id);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const saveDeckTitle = async (title, source) => {
  try {
    await AsyncStorage.setItem(
      title,
      JSON.stringify({ source, title, questions: [] })
    );
  } catch (error) {
    console.log(error);
  }
};
export const addCardToDeck = async (title, card) => {
  try {
    var item = await AsyncStorage.getItem(title);
    item = JSON.parse(item);
    const questions = [...item.questions, { ...card }];

    await AsyncStorage.mergeItem(title, JSON.stringify({ questions }));
  } catch (error) {
    console.log(error);
  }
};
export const deleteDeck = async (id) => {
  try {
    await AsyncStorage.removeItem(id);
  } catch (error) {
    console.log(error);
  }
};

//notification

const NOTIFICATION_KEY = "FLASHCARD_APP";
export const getDailyReminderValue = () => {
  return {
    today: "👋 Don't forget to play today!",
  };
};
export const clearLocalNotification = () => {
return AsyncStorage.removeItem(NOTIFICATION_KEY).then(Notifications.cancelAllScheduledNotificationsAsync)

};
export const createNotification = () => {
  return {
    title: "Start your quiz now",
    body: "👋 Don't forget to play today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true,
    },
  };
};
export const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();
            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(22);
            tomorrow.setMinutes(0);
            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: "day",
            });
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
};
