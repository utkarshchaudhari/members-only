function AccountModal({ user, setUser }) {
  const logOut = async () => {
    const response = await fetch('http://localhost:3000/logout', {
      method: 'DELETE',
      credentials: 'include',
    });

    if (response.ok) {
      setUser(null);
    } else {
      alert('Server Error, Try Again!');
    }
  };

  return (
    <>
      <div className="account__modal">
        <div className="border__bottom">
          <div className="user__details">
            <p className="text__gray">Signed in as</p>
            <p className="font__medium truncate capitalize">{user.user.name}</p>
            <p className="user__details-email truncate">{user.user.email}</p>
          </div>
        </div>
        <div className="border__bottom">
          <div className="user__membership">
            <p className="text__gray">Membership status</p>
            <p className="font__medium">Member</p>
          </div>
        </div>
        <div className="button__wrapper">
          <button className="button" onClick={logOut}>
            Log Out
          </button>
        </div>
      </div>
    </>
  );
}

export default AccountModal;
