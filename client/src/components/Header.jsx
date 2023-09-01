import { useState } from 'react';
import SignupModal from './ui/SignupModal';

function Header() {
  const [signupModal, setSignupModal] = useState(false);

  return (
    <header>
      <div className="header_container">
        <h1>
          <span className="indigo">Members</span>Only
        </h1>
        <div className="header_buttons">
          <button className="button">Log In</button>
          <button
            className="button sign-up_btn"
            onClick={() => setSignupModal(!signupModal)}
          >
            Sign Up
          </button>
        </div>
      </div>
      {signupModal && <SignupModal setSignupModal={setSignupModal} />}
    </header>
  );
}

export default Header;
