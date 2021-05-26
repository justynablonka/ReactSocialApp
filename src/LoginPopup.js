import React from 'react';
import Modal from 'react-modal';
import LoginForm from './LoginForm';
import './LoginForm.css';
import './LoginPopup.css';

function LoginPopup(props) {

    return (
        <div>
            <Modal className="popup" isOpen={props.modalIsOpen} ariaHideApp={false}>
                {props.modalIsOpen && <button className="exit-btn" onClick={props.setModalIsOpenToFalse}>x</button>}
                <LoginForm />
            </Modal>
        </div>
    );
}

export default React.memo(LoginPopup);