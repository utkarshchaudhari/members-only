import { DateTime } from 'luxon';

function Message({ message, member }) {
  return (
    <>
      <div className="message_container">
        <h3 className="message_title">{message.title}</h3>
        {member && (
          <div className="club_members">
            <p>
              by <span className="member_name">{message.user}</span>
            </p>
            <p>
              {DateTime.fromMillis(Date.parse(message.date)).toLocaleString({
                ...DateTime.DATETIME_HUGE,
                timeZoneName: 'short',
              })}
            </p>
          </div>
        )}
        <p className="message_detail">{message.message}</p>
        {!member && (
          <p className="message_note">
            <span>Note: </span>Become a member to know who wrote this message
            and when.
          </p>
        )}
      </div>
    </>
  );
}

export default Message;
