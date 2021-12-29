import React, { useState } from "react";

function useAuthExample(){
    const [authed2,setAuthed2] = useState(false);

    const changeAuthState = () => {
        setAuthed2(!authed2);
    }

    return [authed2,changeAuthState];
}

export default useAuthExample;