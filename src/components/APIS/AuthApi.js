import axios from "axios";

export async function Login(UserObject) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "https://mpdam-event-backend.herokuapp.com/Api/UserLogIn",
        UserObject
      )
      .then((response) => {
        if (response) {
          localStorage.setItem("token", response.data.SecretInfo.token);
          localStorage.setItem("ID", response.data.SecretInfo.UserId);
          console.log("svp msg backend", response.data);
          resolve(response);
        }
      })
      .catch((error) => {
        localStorage.removeItem("token");
        reject(error);
      });
  });
}
export async function Register(UserObject) {
  return new Promise((resolve, reject) => {
    axios
      .post("https://mpdam-event-backend.herokuapp.com/Api/NewUser", UserObject)
      .then((response) => {
        if (response) {
          console.log("new", response.data.newUser);
          resolve(response.data.newUser);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function SingleUser(id) {
  return new Promise((resolve, reject) => {
    console.log("Single id func ", id);
    axios
      .get("https://mpdam-event-backend.herokuapp.com/Api/SingleUser/" + id)
      .then((response) => {
        if (response) {
          //localStorage.setItem("token", response.data.SecretInfo.token);
          console.log("svp msg backend Signle user", response.data.user);
          resolve(response.data.user);
        }
      })
      .catch((error) => {
        localStorage.removeItem("token");
        reject(error);
      });
  });
}
