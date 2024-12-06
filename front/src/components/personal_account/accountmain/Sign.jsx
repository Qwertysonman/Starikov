import React from 'react';
import { IoCloseCircleSharp, IoHammerSharp } from 'react-icons/io5';
import './Signs.css';
import EditForm from './Modal/EditForm';

class Sign extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editForm: false
        };
    }

    render() {
        const { sign, prepods, userData, onEditSign, availableSlots } = this.props;
        return (
            <div className="signs-item">
                <IoCloseCircleSharp onClick={() => this.props.onDelete(sign.id)} className="delete-icon" />
                <IoHammerSharp
                    onClick={() => {
                        this.setState({
                            editForm: !this.state.editForm
                        });
                    }}
                    className="edit-icon"
                />
                <h3>{sign.type}</h3>
                <p>Дата: {sign.date}</p>
                <p>Время: {sign.time}</p>
                <p>Место: {sign.place}</p>
                <p>Преподаватель: {sign.prepod}</p>

                {this.state.editForm && (
                    <EditForm
                        onEditSign={onEditSign} // Передаем обработчик
                        userData={userData}
                        availableSlots={availableSlots}
                        initialData={sign}
                        onClose={() => this.setState({ editForm: false })}
                        prepods={prepods}
                    />
                )}
            </div>
        );
    }
}

export default Sign;