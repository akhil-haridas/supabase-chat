import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ChatPage, Loading, LoginPage } from "./pages";
import { supabaseClient } from "./supabase/supabaseClient";
import { useDispatch } from "react-redux";
import { setUserData } from "./context/slices/userSlice";
... ... ... ... ...
const App = () => {
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session }, error } = await supabaseClient.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
      } else {
        setSession(session);
        setUser(session?.user?.user_metadata || null);
        dispatch(setUserData(session?.user));
      }
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user?.user_metadata || null);
        dispatch(setUserData(session?.user));
      }
    );

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
