import axios from 'axios';

export function getList(){
    return axios.get('http://localhost:8080/getData')
}