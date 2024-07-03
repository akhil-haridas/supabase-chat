import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ChatPage, LoginPage } from "./pages";
import { supabase } from "./supabase";

const App = () => {
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) setUser(session?.user?.user_metadata);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={session ? <ChatPage user={user} /> : <Navigate to={'/login'} />} />
        <Route path="/login" element={session ? <Navigate to={'/'} /> : <LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
