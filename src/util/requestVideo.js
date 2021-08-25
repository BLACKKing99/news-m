import axios from "axios";


const requestVideo = axios.create({
    baseURL: "http://127.0.0.1:8080/day8/"
})



export default requestVideo