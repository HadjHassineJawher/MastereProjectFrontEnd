import axios from 'axios'


export async function addSaission(saissionObject){
    return new Promise ((resolve,reject)=>{
        axios.post("http://localhost:4000/Api/NewSession",saissionObject)
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