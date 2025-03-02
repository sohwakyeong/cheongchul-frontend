import { toast } from "react-toastify";

export const successToast = (message) => {
  toast.info(message, {
    position: "top-center",
    autoClose: 3000,
  });
};

export const errorToast = (errorMessage) => {
  toast.error(errorMessage, {
    position: "top-center",
    autoClose: 3000,
  });
};