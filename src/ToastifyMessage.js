import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-toastify/dist/ReactToastify.min.css";

toast.configure();
class ToastifyMessage
{
    Success(message)
    {
      toast.success(message, {
        toastId: "onlyone",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    Error(message, noDuplicate)
    {
      toast.error(message, {
        toastId: noDuplicate,
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
}

export default new ToastifyMessage();