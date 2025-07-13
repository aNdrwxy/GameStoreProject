import axios from 'axios'

export const createUser = (user) => { 
    return axios.post(`http://127.0.0.1:8000/accounts/api/v1/user/`, user);
};

export const getAllProfiles = () => {
    return axios.get('http://127.0.0.1:8000/accounts/api/v1/profile/');
};

export const getProfile = (id) => { 
    return axios.get(`http://127.0.0.1:8000/accounts/api/v1/profile/${id}/`);
};


export const updateProfile = (id, profile) => {
    return axios.put(`http://127.0.0.1:8000/accounts/api/v1/profile/${id}/`, profile)
};

