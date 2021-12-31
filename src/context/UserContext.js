import { createContext } from "react";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const data = {}

  return (<UserContext.Provider>{children}</UserContext.Provider>);
};

export {UserProvider};
export default UserContext;
