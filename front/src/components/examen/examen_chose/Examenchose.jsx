import './Examenchose.css';
import choseImg1 from './../../../images/Лоси/Лосьвмашине.jpg'
import choseImg2 from './../../../images/Лоси/Лосьэкзамен.jpg'

const Examenchose  = () => {
    return (
        <div className="image-buttons-container">
            <div className="image-button left">
                <img src={choseImg1} alt="Left Image" className="image-button-img" />
            </div>
            <div className="image-button right">
                <img src={choseImg2} alt="Right Image" className="image-button-img" />
            </div>
        </div>
    );
};

export default Examenchose;
