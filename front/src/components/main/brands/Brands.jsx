import './Brands.css'
import kia from './../../../images/Логотипы/kia.jpg'
import volkswagen from './../../../images/Логотипы/volkswagen.jpg'
import skoda from './../../../images/Логотипы/skoda.jpg'
import nissan from './../../../images/Логотипы/nissan.jpg'
import ford from './../../../images/Логотипы/ford.jpg'
import hyundai from './../../../images/Логотипы/hyundai.jpg'

const Brands = () => {
    return(
        <section className="brands">
            <div className="container">
                <ul className="brands_list">
                    <li><a href = "#!"><img src={kia} alt=""/></a></li>
                    <li><a href = "#!"><img src={volkswagen} alt=""/></a></li>
                    <li><a href = "#!"><img src={hyundai} alt=""/></a></li>
                    <li><a href = "#!"><img src={nissan} alt=""/></a></li>
                    <li><a href = "#!"><img src={skoda} alt=""/></a></li>
                    <li><a href = "#!"><img src={ford} alt=""/></a></li>
                </ul>
            </div>
        </section>
    )
}
export default Brands;