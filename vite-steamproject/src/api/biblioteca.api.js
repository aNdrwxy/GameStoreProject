import axios from 'axios'

export const getGamerForId = (id) => {
    return axios.get(`http://127.0.0.1:8000/biblioteca/api/biblioteca/${id}/`);
};
