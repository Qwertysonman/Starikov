import './Examenmain.css';
import examenImg from './../../../images/Лоси/Лосьэкзамен.jpg'

const Examenmain = () => {
    return (
        <div className="component-container">
            <div className="image-container">
                <img src={examenImg} alt="Description" className="image" />
            </div>
            <div className="text-container">
                <h1 className="title">Запись на теоретический или практический внутренний экзамен</h1>
                <p className="text">
                    Уважаемые ученики для записи через сервис 
                    на экзамен по теории или практике необходимо 
                    пройти минимальное колличество уроков (смотрите в личном кабинете).
                </p>
            </div>
        </div>
    );
};

export default Examenmain;
