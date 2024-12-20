import './Arrivals.css'
import Cards from "../cards/Cards";
import prepod1 from './../../../images/Преподы/Препод1.jpg';
import prepod2 from './../../../images/Преподы/Препод2.jpg';
import prepod3 from './../../../images/Преподы/Препод3.jpg';

const Arrivals = () => {
    
    return(
        <section className="arrivals">
            <div className="container">
                <div className="arrivals_header">
                    <h2 className='title-2'>Наши профессионалы</h2>
                </div>
                <div className="arrivals_cards">
                    <Cards title = "Позов Константин Викторович" img = {prepod2} explore = "Стаж: 10 лет" 
                        addinfo = "Константин имеет более 10 лет опыта в обучении вождению. Он известен своим терпением и способностью объяснять сложные маневры простыми словами. Его ученики отмечают его профессионализм и умение создавать комфортную атмосферу на занятиях. Константин всегда готов помочь и поддержать своих учеников на пути к получению водительских прав."/>
                    <Cards title = "Клявляев Дамир Ренатович" img = {prepod1} explore = "Стаж: 12 лет"
                        addinfo = "Дамир — сертифицированный инструктор с 12-летним стажем. Он обладает отличными навыками коммуникации и умеет находить индивидуальный подход к каждому ученику. Дамир часто проводит дополнительные занятия для тех, кто нуждается в дополнительной практике, и всегда рад ответить на любые вопросы. Его ученики ценят за внимательность и стремление к совершенству."/>
                    <Cards title = "Шишкин Илья Климович" img = {prepod3} explore = "Стаж: 9 лет"
                        addinfo = "Илья — опытный инструктор, который работал в различных автошколах по всей стране. Он известен своим строгим, но справедливым подходом к обучению. Дмитрий уделяет большое внимание безопасности на дороге и учит своих учеников не только водить, но и правильно реагировать в различных дорожных ситуациях. Его ученики отмечают его высокий уровень профессионализма и глубокие знания правил дорожного движения."/>
                </div>
            </div>
        </section>
    )
}
export default Arrivals;