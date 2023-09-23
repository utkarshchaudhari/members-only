import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

function ErrorScreen({ message, closeModal }) {
  return (
    <div className="errorScreen__container">
      <FontAwesomeIcon
        icon={faCircleXmark}
        size="2xl"
        style={{ color: '#6366f1' }}
      />
      <p className="errorScreen__message">{message}</p>
      <button className="button" onClick={closeModal}>
        Close
      </button>
    </div>
  );
}

export default ErrorScreen;
