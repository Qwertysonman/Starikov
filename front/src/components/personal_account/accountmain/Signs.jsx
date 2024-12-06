import React from 'react';
import Sign from './Sign';
import './Signs.css';

class Signs extends React.Component {
    render() {
        const { signs = [], onEditSign, onDelete, availableSlots, prepods, userData } = this.props;

        return (
            <div className="signs-container">
                {signs.length > 0 ? (
                    signs.map((el) => (
                        <Sign
                            key={el.id}
                            sign={el}
                            onEditSign={onEditSign} // Передаем обработчик для редактирования
                            onDelete={onDelete}
                            availableSlots={availableSlots}
                            prepods={prepods}
                            userData={userData}
                        />
                    ))
                ) : (
                    <h3>Записей с такими параметрами еще нет</h3>
                )}
            </div>
        );
    }
}

export default Signs;