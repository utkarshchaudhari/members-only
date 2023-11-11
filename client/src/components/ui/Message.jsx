function Message({ message }) {
  return (
    <>
      <div className="message_container">
        <h3 className="message_title">{message.title}</h3>
        <p className="message_detail">{message.message}</p>
        <p className="message_note">
          <span>Note: </span>Become a member to know who wrote this message and
          when.
        </p>
      </div>
    </>
  );
}

export default Message;
