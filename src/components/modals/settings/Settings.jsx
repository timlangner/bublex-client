import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import './settings.scss';

const Settings = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            contentClassName="settings-modal-content"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Settings
                </Modal.Title>
            </Modal.Header>
            <Modal.Body
                style={{minHeight: 'calc(100vh - 400px)', overflowY: 'auto'}}
            >
            <div className="label-group">
                <input type="checkbox" id="settings-input" />
                <label htmlFor="settings-input">Hide Hats</label>
            </div>
            </Modal.Body>
        </Modal>
    );
};

export default Settings;
