import { useState, useEffect } from 'react';
import Messages from './components/Messages';
import Header from './components/Header';
import './style.css';
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(null);
  const [refreshMessages, setRefreshMessages] = useState(null);

  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const response = await fetch('http://localhost:3000/check-auth', {
          credentials: 'include',
        });
        const serverResponse = await response.json();
        if (response.ok) {
          setUser(serverResponse);
        }
      } catch (err) {
        setUser(null);
      }
    };

    checkLoggedInUser();
  }, []);

  return (
    <>
      <Header
        user={user}
        setUser={setUser}
        setRefreshMessages={setRefreshMessages}
      />
      <Messages
        member={user && user.user.member}
        refreshMessages={refreshMessages}
      />
      <Footer />
    </>
  );
}

export default App;
