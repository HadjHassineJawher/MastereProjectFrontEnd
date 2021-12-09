import axios from 'axios'

export async function getEvents() {
    return new Promise((resolve, reject) => {
        axios
            .get("http://localhost:4000/Api/events/")
            .then((response) => {
                if (response) {
                    resolve(response.data.EventsList)
                }

            }).catch(error => {
                reject(error)
            })
    })
}

export async function getEventById(eventId) {
    return new Promise((resolve, reject) => {
        axios
            .get("http://localhost:4000/Api/events/" + eventId)
            .then((response) => {
                if (response) {
                    // console.log("response.data.event", response)
                    resolve(response.data.event)
                }
            }).catch(error => {
                reject(error)
            })
    })
}