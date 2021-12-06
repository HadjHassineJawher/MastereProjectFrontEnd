import axios from 'axios';

const eventApi = {
    getEvents() {
        axios
            .get(
                "http://localhost:4000/Api/events/"
            )
            .then((response) => {
                console.log("api", response.data.EventsList)
                return response.data.EventsList
            });
    }
}

export default eventApi;