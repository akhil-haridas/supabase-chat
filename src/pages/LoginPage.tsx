// src/pages/LoginPage.js
import React from "react";

import { supabase } from "../supabase";

const LoginPage = () => {
    const signInWithGoogle = async () => {
        // await supabase.auth.signIn({
        //   provider: 'google',
        // });
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    );
};

export default LoginPage;
