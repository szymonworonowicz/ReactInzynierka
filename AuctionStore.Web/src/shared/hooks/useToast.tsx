import {toast, ToastOptions} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export type ToastType = 'success' | 'error';

export function useToast() {
    const toastOptions: ToastOptions = {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
    };

    return (message:string, type : ToastType) => {
        switch(type) {
            case 'success':
                return toast.success(message,toastOptions);
            case 'error':
                return toast.error(message, toastOptions);
        };
    };
};