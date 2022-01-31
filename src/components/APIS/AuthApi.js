import axios from 'axios'

export async function Login(UserObject) {
    return new Promise((resolve, reject) => {

        axios
            .post("http://localhost:4000/Api/UserLogIn", UserObject)
            .then((response) => {
                if (response) {
                    localStorage.setItem("token", response.data.SecretInfo.token);
                    console.log("svp msg backend", response.data)
                    resolve(response)
                }

            }).catch(error => {
                localStorage.removeItem('token')
                reject(error)
            })
    })
}
export async function Register(UserObject) {
    return new Promise((resolve, reject) => {
        axios
            .post("http://localhost:4000/Api/NewUser", UserObject)
            .then((response) => {
                if (response) {
                    console.log("new", response.data.newUser)
                    resolve(response.data.newUser)
                }

            }).catch(error => {
                reject(error)
            })
    })
}