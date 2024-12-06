import React, {useState} from 'react';
import './Cards.css';
import arrowImg from './../../../images/Элементы оформления/Стрелочка.png';

const Cards = (props) => {

    const [isModalOpen, setIsModelOpen] = useState(false);
    const openModal = () => {
        setIsModelOpen(true);
    };
    const closeModal = () => {
        setIsModelOpen(false);
    };
    return (
        <div className="card">
            <a href="#!" className="card_link" aria-label="Link to card details"></a>
            <img className="card_img" src={props.img} onClick = {openModal} />
            <div className="card_body">
                <div className="card_text">
                    <div className="card_title">{props.title}</div>
                    <div className="card_muted">{props.explore}</div>
                </div>
                <div className="card_icon">
                    <img src={arrowImg} alt="Open" onClick = {openModal}/>
                </div>
            </div>
            {isModalOpen && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                        <span className="modal_close" onClick = {closeModal}>&times;</span>
                        <p>{props.addinfo}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cards;
