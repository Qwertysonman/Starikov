import React from 'react';
import './MapModel.css';

const MapModal = ({ onClose }) => {
    return (
        <div className="map-modal" onClick={onClose}>
            <div className="map-modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="map-modal-close" onClick={onClose}>&times;</span>
                <h2 className="map-pader">Главный филиал нашей автошколы - Рязанский проспект в Москве</h2>
                <div className="map-container">
                    <div style={{ position: 'relative', overflow: 'hidden' }}>
                        <a href="https://yandex.ru/maps/213/moscow/?utm_medium=mapframe&utm_source=maps" style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '0px' }}>Москва</a>
                        <a href="https://yandex.ru/maps/213/moscow/?feedback=object%2Fadd&feedback-context=map.context&ll=37.796169%2C55.718165&utm_medium=mapframe&utm_source=maps&z=16.72" style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '14px' }}>Яндекс Карты</a>
                        <iframe
                            src="https://yandex.ru/map-widget/v1/?feedback=object%2Fadd&feedback-context=map.context&ll=37.796169%2C55.718165&z=16.72"
                            width="560"
                            height="400"
                            frameBorder="1"
                            allowFullScreen="true"
                            style={{ position: 'relative' }}
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapModal;
