import  { createContext, useContext, useState } from "react";

const RequestContext = createContext();


export const RequestProvider = ({ children }) => {
  const [requestList, setRequestList] = useState([]);

  const addToRequest = (item) => {
    setRequestList((prevList) => {
      if (prevList.some((existingItem) => existingItem === item)) {
        return prevList; // Item already exists, return the current list
      }
      return [...prevList, item]; // Add new item
    });
  };

  const removeFromRequest = (itemToRemove) => {
    setRequestList((prevList) =>
      prevList.filter((item) => item !== itemToRemove)
    );
  };

  return (
    <RequestContext.Provider value={{ requestList, addToRequest, removeFromRequest }}>
      {children}
    </RequestContext.Provider>
  );
};

export const useRequest = () => useContext(RequestContext);