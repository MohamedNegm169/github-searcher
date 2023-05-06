import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

axios.interceptors.response.use(null, async (error) => {
  const expectedError =
    error.response && error.response.status >= 400 && error.response.status < 500;
  if (!expectedError) {
    toast.error("An unexpected error occured");
  } else {
    toast.error(error.response.data.message);
  }
});

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
export default http;
