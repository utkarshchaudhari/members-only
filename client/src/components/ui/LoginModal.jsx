import { useState } from 'react';
import ReactDOM from 'react-dom';
import Spinner from './Spinner';
import ErrorScreen from './ErrorScreen';
import SuccessScreen from './SuccessScreen';

function LoginModal({ setLoginModal, user, setUser }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [userError, setUserError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const serverResponse = await response.json();
      console.log(response, serverResponse);
      if (response.ok) {
        setUser(serverResponse);
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
      <div className="modal_overlay" onClick={() => setLoginModal(false)} />
      <div className="modal_container">
        {isLoading ? (
          <Spinner />
        ) : user ? (
          <SuccessScreen
            message={user.message}
            closeModal={() => setLoginModal(false)}
          />
        ) : userError.err ? (
          <ErrorScreen
            message={userError.err}
            closeModal={() => setUserError(false)}
          />
        ) : serverError ? (
          <ErrorScreen
            message="Server Error, Try Again!"
            closeModal={() => setLoginModal(false)}
          />
        ) : (
          <>
            <div className="modal_close">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 384 512"
                onClick={() => setLoginModal(false)}
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>
            <form className="modal_form" onSubmit={handleSubmit}>
              <div className="form_divs">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoFocus
                />
                {userError && userError.error.email && (
                  <p className="red_text">{userError.error.email.msg}</p>
                )}
              </div>
              <div className="form_divs">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {userError && userError.error.password && (
                  <p className="red_text">{userError.error.password.msg}</p>
                )}
              </div>
              <input type="submit" value="Log In" className="button" />
            </form>
          </>
        )}
      </div>
    </>,
    document.getElementById('portal')
  );
}

export default LoginModal;
