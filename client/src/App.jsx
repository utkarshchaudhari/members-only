import { useState, useEffect, useRef } from 'react';
import Messages from './components/Messages';
import Header from './components/Header';
import './style.css';
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(null);
  const [refreshMessages, setRefreshMessages] = useState(null);
  const appRef = useRef();

  const checkLoggedInUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/check-auth', {
        credentials: 'include',
      });
      const serverResponse = await response.json();
      if (response.ok) {
        setUser(serverResponse);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    // Initial check on component mount
    checkLoggedInUser();

    const handleClick = () => {
      checkLoggedInUser();
    };

    // Attach the click event listener
    appRef.current.addEventListener('click', handleClick);

    // Clean up the event listener when the component unmounts
    return () => {
      appRef.current.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      <div ref={appRef}>
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
      </div>
    </>
  );
}

export default App;
