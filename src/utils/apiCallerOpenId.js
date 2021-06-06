import axios from 'axios';
import * as Config from '../constants/Config';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
toast.configure()

export default async function callApiOpenId(endpoint, method = 'GET', body) {
  try {
    const data = await axios({
      method: method,
      url: `${Config.API_OPEN_ID_URL}/${endpoint}`,
      data: body
    });
    return data;
  }
  catch (err) {
    if (err.response && err.response.data) {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${err.response.data.message}`
      })
    } else {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Can not connect to server!'
      })
    }
  }
}