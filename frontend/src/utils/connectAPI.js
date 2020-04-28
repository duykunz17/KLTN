import axios from 'axios';

// call constant
import * as Config from '../constants/parameterConfig';

const callAPI = async (endpoint, method, body) => {
    return axios({
        method: method,
        url: `${Config.API_URL_NODEJS_SERVER}/${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
    });
}

export default callAPI;