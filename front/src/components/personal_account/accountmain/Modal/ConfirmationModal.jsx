import React from 'react';
import './ConfirmationModal.css';

class ConfirmationModal extends React.Component {
    render() {
        return (
            <div className="modal-backdrop">
                <div className="modal-content">
                    <h2>Подтверждение</h2>
                    <p>Вы уверены, что хотите отменить запись?</p>
                    <div className="modal-buttons">
                        <button onClick={this.props.onConfirm}>Да</button>
                        <button onClick={this.props.onCancel}>Нет</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ConfirmationModal;
