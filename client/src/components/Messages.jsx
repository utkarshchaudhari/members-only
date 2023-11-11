import { useEffect, useState } from 'react';
import Message from './ui/Message';
import Spinner from './ui/Spinner';

function Messages() {
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/messages');
      const serverResponse = await response.json();
      console.log(response, serverResponse);
      if (response.ok) {
        setMessages(serverResponse);
      }
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <>
      <main>
        <div className="main_title">
          <h1>Messages</h1>
        </div>
        <div className="all_messages">
          {messages ? (
            messages.map((message) => (
              <Message message={message} key={message._id} />
            ))
          ) : (
            <Spinner />
          )}
        </div>
      </main>
    </>
  );
}

export default Messages;
