import './Advert.css'
import advertImg from './../../../images/Лоси/Лосьвмашине.jpg'
const Advert = () => {
    return(
        <section className="advert">
            <div className="container">
                <div className="advert_content">
                    <div className="advert_text">
                        <div className='advert_title'>
                            ДАЖЕ ЛОСЬ УМЕЕТ 
                            <span className='highlight'>
                            <span>ВОДИТЬ...</span> 
                            </span>
                            А ТЫ?
                        </div>
                        <div className="advert_desc">
                             Не переживай, и ты научишься, главное захотеть! А дальше - наша работа.
                        </div>
                        <div className="advert_btn-wrapper"></div>
                    </div>
                    <div className="advert_img">
                        <img src = {advertImg} alt = "Advert" />
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Advert;