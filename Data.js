import { AsyncStorage } from "react-native";

import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
/**
 * @description Get All the decks from local storage
 */
export const getDecks = async () => {
  const cardsData = [];
  const keys = await AsyncStorage.getAllKeys();
  const dataAll = await AsyncStorage.multiGet(keys);
  dataAll.forEach((data) => {
    if (data[0] !== NOTIFICATION_KEY)
      cardsData.push({ [data[0]]: JSON.parse(data[1]) });
  });
  return cardsData;
};
/**
* @description Get the deck of particular id
* @param {string} id - id to fetch particular book

*/
export const getDeck = async (id) => {
  try {
    const data = await AsyncStorage.getItem(id);
    return data;
  } catch (error) {
    console.log(error);
  }
};
/**
 * @description Save the new Deck by its title
 * @param {string} title - The title of the Deck
 * @param {number} source - Image source
 */
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
/**
 * @description Add question/card to particular deck
 * @constructor
 * @param {string} title - The title of the deck
 * @param {object} card - contains card details
 */
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
/**
* @description To delete particular deck
* @constructor
* @param {string} id - The id of the book

*/
export const deleteDeck = async (id) => {
  try {
    await AsyncStorage.removeItem(id);
  } catch (error) {
    console.log(error);
  }
};

//notification

const NOTIFICATION_KEY = "FLASHCARD_APP";
/**
 * @description Value to be shown daily in notification
 */
export const getDailyReminderValue = () => {
  return {
    today: "👋 Don't forget to play today!",
  };
};
/**
 * @description clears  the notification
 */
export const clearLocalNotification = () => {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
};
/**
 * @description Creates Notification
 */
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
/**
 * @description Setting up notification
 */
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
