function Header() {
  return (
    <header>
      <div className="header_container">
        <h1>
          <span className="indigo">Members</span>Only
        </h1>
        <div className="header_buttons">
          <button className="button">Log In</button>
          <button className="button sign-up_btn">Sign Up</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
