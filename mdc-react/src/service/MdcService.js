import axios from 'axios'

const MDC_API_URL = 'http://localhost:8080/mdc'

class MdcService {

    sendForm(payload) {
        return axios.post(`${MDC_API_URL}/process/`, payload);
    }

    validateLogin(payload){
        return axios.post(`${MDC_API_URL}/login/`, payload);
    }
}

export default new MdcService()