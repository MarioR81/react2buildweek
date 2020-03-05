import axios from 'axios';


export const axiosWithAuth = () => {
    //get token
    const token = window.localStorage.getItem('token');
    //create new instance of axios with config opj
    return axios.create({ 
        headers: {
            Authorization: token
    },
    baseURL: 'https://comake2.herokuapp.com'
    })
}