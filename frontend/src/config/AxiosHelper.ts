import axios from "axios";
import { Request } from "../types/type";


const api = axios.create({
    baseURL:"http://localhost:8080/api",
    headers:{
        'Content-Type': 'application/json'
    }
})

export const request = <T>(dados: Request<T>) =>{
    return api({
        method: dados.method,
        url:dados.url,
        data: dados.method.toUpperCase() === "DELETE" ? undefined : dados.data
    })
}