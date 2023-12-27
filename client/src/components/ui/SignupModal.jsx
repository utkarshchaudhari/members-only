import { useState } from 'react';
import ReactDOM from 'react-dom';
import Spinner from './Spinner';
import SuccessScreen from './SuccessScreen';
import ErrorScreen from './ErrorScreen';

function SignupModal({ setSignupModal, user, setUser }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
  });
  const [userError, setUserError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [signupError, setSignupError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      const serverResponse = await response.json();
      if (response.ok) {
        setUser(serverResponse);
        setIsLoading(false);
      } else {
        setUserError(serverResponse);
        setIsLoading(false);
      }
    } catch (error) {
      setSignupError(true);
      setIsLoading(false);
    }
  };

  return ReactDOM.createPortal(
    <>
      <div className="modal_overlay" onClick={() => setSignupModal(false)} />
      <div className="modal_container">
        {isLoading ? (
          <Spinner />
        ) : user ? (
          <SuccessScreen
            message="Signed Up Successfully!"
            closeModal={() => setSignupModal(false)}
          />
        ) : userError.err ? (
          <ErrorScreen
            message={userError.err}
            closeModal={() => setSignupModal(false)}
          />
        ) : signupError ? (
          <ErrorScreen
            message="Server Error, Try Again!"
            closeModal={() => setSignupModal(false)}
          />
        ) : (
          <>
            <div className="modal_close">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 384 512"
                onClick={() => setSignupModal(false)}
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>
            <form className="modal_form" onSubmit={handleSubmit}>
              <div className="form_divs">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  autoFocus
                />
                {userError && userError.error.name && (
                  <p className="red_text">{userError.error.name.msg}</p>
                )}
              </div>
              <div className="form_divs">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
              <div className="form_divs">
                <label htmlFor="cpassword">Confirm Password</label>
                <input
                  type="password"
                  id="cpassword"
                  name="cpassword"
                  value={formData.cpassword}
                  onChange={handleChange}
                />
                {userError && userError.error.cpassword && (
                  <p className="red_text">{userError.error.cpassword.msg}</p>
                )}
              </div>
              <input type="submit" value="Sign Up" className="button" />
            </form>
          </>
        )}
      </div>
    </>,
    document.getElementById('portal')
  );
}

export default SignupModal;
