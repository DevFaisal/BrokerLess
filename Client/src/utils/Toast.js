import toast, { Toaster } from "react-hot-toast";

export default Toast = (message, type) => {
  toast(message, {
    icon: type,
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });
};
