import { useState } from 'react';
import ReactDOM from 'react-dom';
import Spinner from './Spinner';
import SuccessScreen from './SuccessScreen';
import ErrorScreen from './ErrorScreen';

function NewMessageModal({ setNewMessageModal, setRefreshMessages }) {
  const [formData, setFormData] = useState({ title: '', message: '' });
  const [userError, setUserError] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3000/newmessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      const serverResponse = await response.json();
      console.log(response, serverResponse);
      if (response.ok) {
        setSuccess(serverResponse);
        setRefreshMessages(serverResponse);
        setIsLoading(false);
      } else if (response.status === 422 || response.status === 401) {
        setUserError(serverResponse);
        setIsLoading(false);
      }
    } catch (err) {
      setServerError(true);
      setIsLoading(false);
    }
  };

  return ReactDOM.createPortal(
    <>
      <div
        className="modal_overlay"
        onClick={() => setNewMessageModal(false)}
      />
      <div className="modal_container">
        {isLoading ? (
          <Spinner />
        ) : success ? (
          <SuccessScreen
            message={success.message}
            closeModal={() => setNewMessageModal(false)}
          />
        ) : userError.err ? (
          <ErrorScreen
            message={userError.err}
            closeModal={() => setNewMessageModal(false)}
          />
        ) : serverError ? (
          <ErrorScreen
            message="Server Error, Try Again!"
            closeModal={() => setNewMessageModal(false)}
          />
        ) : (
          <>
            <div className="modal_close">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 384 512"
                onClick={() => setNewMessageModal(false)}
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>
            <form className="modal_form" onSubmit={handleSubmit}>
              <div className="form_divs">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Title of your message..."
                  autoFocus
                />
                {userError && userError.error.title && (
                  <p className="red_text">{userError.error.title.msg}</p>
                )}
              </div>
              <div className="form_divs">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  rows="5"
                  cols="30"
                ></textarea>
                {userError && userError.error.message && (
                  <p className="red_text">{userError.error.message.msg}</p>
                )}
              </div>
              <input type="submit" value="Submit" className="button" />
            </form>
          </>
        )}
      </div>
    </>,
    document.getElementById('portal')
  );
}

export default NewMessageModal;
