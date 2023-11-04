import { useState } from 'react';
import ReactDOM from 'react-dom';

function NewMessageModal({ setNewMessageModal }) {
  const [formData, setFormData] = useState({ title: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/newmessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      credentials: 'include',
    });
    const serverResponse = await response.json();
    console.log(response, serverResponse);
  };

  return ReactDOM.createPortal(
    <>
      <div
        className="modal_overlay"
        onClick={() => setNewMessageModal(false)}
      />
      <div className="modal_container">
        <div className="modal_close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 384 512"
            onClick={() => setNewMessageModal(false)}
          >
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </div>
        <form className="modal_form" onSubmit={handleSubmit}>
          <div className="form_divs">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title of your message..."
              autoFocus
            />
          </div>
          <div className="form_divs">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message..."
              rows="5"
              cols="30"
            ></textarea>
          </div>
          <input type="submit" value="Submit" className="button" />
        </form>
      </div>
    </>,
    document.getElementById('portal')
  );
}

export default NewMessageModal;
