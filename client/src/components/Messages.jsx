import { useEffect, useState } from 'react';
import Message from './ui/Message';
import Spinner from './ui/Spinner';
import Pagination from './ui/Pagination';

function Messages({ member, refreshMessages }) {
  const [messages, setMessages] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 3;

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
  }, [refreshMessages]);

  return (
    <>
      <main>
        <div className="main_title">
          <h1>Messages</h1>
        </div>
        <div className="all_messages">
          {messages ? (
            messages
              .slice(page * pageSize - pageSize, page * pageSize)
              .map((message) => (
                <Message message={message} key={message._id} member={member} />
              ))
          ) : (
            <Spinner />
          )}
        </div>
        {messages && (
          <Pagination
            page={page}
            setPage={setPage}
            totalCount={messages.length}
            pageSize={pageSize}
          />
        )}
      </main>
    </>
  );
}

export default Messages;
