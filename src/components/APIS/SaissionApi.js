import axios from 'axios'


export async function addSaission(saissionObject){
    return new Promise ((resolve,reject)=>{
        axios.post("https://mpdam-event-backend.herokuapp.com/Api/NewSession",saissionObject)
        .then((response=>{
            if(response){
                console.log(response.data.newSession)
                resolve(response.data.newSession)
            }
        })).catch(error=>{
            reject(error)
        })
    })
}