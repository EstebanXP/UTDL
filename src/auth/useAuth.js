import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as React from "react";

const authContext = React.createContext();

function useAuth() {
  const [authed, setAuthed] = React.useState(false);
  const auth=getAuth()

  React.useEffect(() => {
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setAuthed(true);
      }else{
        setAuthed(false);
      }
    })
  })

  return {
    authed,
    login() {
      return new Promise((res) => {
        setAuthed(true);
        res();
      });
    },
    logout() {
      return new Promise((res) => {
        setAuthed(false);
        res();
      });
    }
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}