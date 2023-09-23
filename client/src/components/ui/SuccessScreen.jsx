import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

function SuccessScreen({ message, closeModal }) {
  return (
    <div className="successScreen__container">
      <FontAwesomeIcon
        icon={faCircleCheck}
        size="2xl"
        style={{ color: '#6366f1' }}
      />
      <p className="successScreen__message">{message}</p>
      <button className="button" onClick={closeModal}>
        Close
      </button>
    </div>
  );
}

export default SuccessScreen;
