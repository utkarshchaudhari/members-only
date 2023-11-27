import { useState } from 'react';
import ReactDOM from 'react-dom';
import Spinner from './Spinner';
import ErrorScreen from './ErrorScreen';
import SuccessScreen from './SuccessScreen';

function JoinClubModal({ setJoinClubModal }) {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3000/joinclub', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secretCode: e.target.secret.value }),
        credentials: 'include',
      });
      const serverResponse = await response.json();
      if (response.ok) {
        setSuccess(serverResponse.message);
        setIsLoading(false);
      } else {
        setError(serverResponse.err);
        setIsLoading(false);
      }
    } catch (err) {
      setError('Server Error, Try Again!');
      setIsLoading(false);
    }
  };

  return ReactDOM.createPortal(
    <>
      <div
        className="modal_overlay"
        onClick={() => setJoinClubModal(false)}
      ></div>
      <div className="modal_container">
        {isLoading ? (
          <Spinner />
        ) : success ? (
          <SuccessScreen
            message={success}
            closeModal={() => setJoinClubModal(false)}
          />
        ) : error ? (
          <ErrorScreen
            message={error}
            closeModal={() => setJoinClubModal(false)}
          />
        ) : (
          <>
            <div className="modal_close">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 384 512"
                onClick={() => setJoinClubModal(false)}
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>
            <form className="modal_form" onSubmit={handleSubmit}>
              <div className="form_divs">
                <label htmlFor="secret" className="secret__label">
                  Enter The Secret
                </label>
                <input type="text" id="secret" name="secret" autoFocus />
              </div>
              <input type="submit" value="Join" className="button" />
            </form>
          </>
        )}
      </div>
    </>,
    document.getElementById('portal')
  );
}

export default JoinClubModal;
