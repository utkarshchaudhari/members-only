import { useState } from 'react';
import Messages from './components/Messages';
import Header from './components/Header';
import './style.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <Header user={user} setUser={setUser} />
      <Messages member={user && user.user.member} />
    </>
  );
}

export default App;
