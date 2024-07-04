import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ChatPage, Loading, LoginPage } from "./pages";
import { supabase } from "./supabase";

const App = () => {
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (sessionError || userError) {
        console.error(
          "Error fetching session or user:",
          sessionError || userError
        );
        setLoading(false);
        return;
      }

      setSession(session);
      if (session) {
        setUser(session?.user?.user_metadata);
      } else {
        setUser(user?.user_metadata);
      }
      setLoading(false);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        setUser(session?.user?.user_metadata);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <Loading />;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            session && user ? (
              <ChatPage user={user} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={session && user ? <Navigate to="/" /> : <LoginPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
