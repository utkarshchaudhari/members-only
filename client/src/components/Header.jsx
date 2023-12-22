import { useState } from 'react';
import SignupModal from './ui/SignupModal';
import LoginModal from './ui/LoginModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import NewMessageModal from './ui/NewMessageModal';
import AccountModal from './ui/AccountModal';
import JoinClubModal from './ui/JoinClubModal';

function Header({ user, setUser, setRefreshMessages }) {
  const [signupModal, setSignupModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [newMessageModal, setNewMessageModal] = useState(false);
  const [accountModal, setAccountModal] = useState(false);
  const [joinClubModal, setJoinClubModal] = useState(false);

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
              {!user.user.member && (
                <button
                  className="button"
                  onClick={() => setJoinClubModal(true)}
                >
                  Join Club
                </button>
              )}
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
                <AccountModal
                  user={user}
                  setUser={setUser}
                  setAccountModal={setAccountModal}
                />
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
      {signupModal && (
        <SignupModal
          setSignupModal={setSignupModal}
          user={user}
          setUser={setUser}
        />
      )}
      {newMessageModal && (
        <NewMessageModal
          setNewMessageModal={setNewMessageModal}
          setRefreshMessages={setRefreshMessages}
        />
      )}
      {joinClubModal && (
        <JoinClubModal setJoinClubModal={setJoinClubModal} setUser={setUser} />
      )}
    </header>
  );
}

export default Header;
