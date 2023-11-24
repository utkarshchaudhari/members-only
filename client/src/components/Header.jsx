import { useState } from 'react';
import SignupModal from './ui/SignupModal';
import LoginModal from './ui/LoginModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import NewMessageModal from './ui/NewMessageModal';
import AccountModal from './ui/AccountModal';

function Header() {
  const [signupModal, setSignupModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [newMessageModal, setNewMessageModal] = useState(false);
  const [accountModal, setAccountModal] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <header>
      <div
        className="header_container"
        onClick={() => accountModal && setAccountModal(false)}
      >
        <h1>
          <span className="indigo">Members</span>Only
        </h1>
        <div className="header_buttons">
          {user ? (
            <>
              <button className="button">Join Club</button>
              <button
                className="button btn_margin-left"
                onClick={() => setNewMessageModal(true)}
              >
                New Message
              </button>
              <button
                className="account_btn btn_margin-left"
                onClick={() => setAccountModal(!accountModal)}
              >
                Account
                <FontAwesomeIcon
                  icon={faCaretDown}
                  size="lg"
                  style={{ color: '#9ea3af', marginLeft: '10px' }}
                />
              </button>
              {accountModal && (
                <AccountModal user={user} setAccountModal={setAccountModal} />
              )}
            </>
          ) : (
            <>
              <button
                className="button"
                onClick={() => setLoginModal(!loginModal)}
              >
                Log In
              </button>
              <button
                className="button btn_margin-left"
                onClick={() => setSignupModal(!signupModal)}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
      {loginModal && (
        <LoginModal
          setLoginModal={setLoginModal}
          user={user}
          setUser={setUser}
        />
      )}
      {signupModal && <SignupModal setSignupModal={setSignupModal} />}
      {newMessageModal && (
        <NewMessageModal setNewMessageModal={setNewMessageModal} />
      )}
    </header>
  );
}

export default Header;
