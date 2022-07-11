import React, { useContext, createContext, useState } from "react";

const snackbarContext = createContext();

export const SnackbarContextProvider = ({ children }) => {
  const [snackbarData, setSnackbarData] = useState({
    type: "",
    message: "",
    isOpen: false,
  });
  const setAlert = (type, message, isOpen) => {
    return setSnackbarData({ type, message, isOpen });
  };
  const closeAlert = () => {
    return setSnackbarData({
      type: "",
      message: "",
      isOpen: false,
    });
  };
  return (
    <snackbarContext.Provider value={{ setAlert, closeAlert, snackbarData }}>
      {children}
    </snackbarContext.Provider>
  );
};

export function useSnackbar() {
  return useContext(snackbarContext);
}
