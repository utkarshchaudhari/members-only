import { useState } from 'react';
import Messages from './components/Messages';
import Header from './components/Header';
import './style.css';

function App() {
  const [user, setUser] = useState(null);
  const [refreshMessages, setRefreshMessages] = useState(null);

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
    </>
  );
}

export default App;
