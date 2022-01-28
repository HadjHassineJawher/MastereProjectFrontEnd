import axios from 'axios'

export async function Login(UserObject) {
    return new Promise((resolve, reject) => {
        axios
            .post("http://localhost:4000/Api/UserLogIn",UserObject)
            .then((response) => {
                if (response) {

                    resolve(response.data)
                }

            }).catch(error => {
                reject(error)
            })
    })
}