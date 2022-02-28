import axios from "axios";

export async function getEvents() {
  return new Promise((resolve, reject) => {
    axios
      .get("https://mpdam-event-backend.herokuapp.com/Api/events/")
      .then((response) => {
        if (response) {
          resolve(response.data.AllEvents);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function getEventById(eventId) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "https://mpdam-event-backend.herokuapp.com/Api/SingleEvent/" + eventId
      )
      .then((response) => {
        if (response) {
          // console.log("response.data.event", response)
          resolve(response.data.event);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function addEvent(eventObject) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "https://mpdam-event-backend.herokuapp.com/Api/NewEvent",
        eventObject
      )
      .then((response) => {
        if (response) {
          //  console.log(response.data.newEvent)
          resolve(response.data.newEvent);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
