import './../../personal_account/account_header/Accountheader.css'
import logoImg from './../../../images/Лого/Vector.jpg' ;

const Examenheader = () => {
    return(
        <header className="header">
            <div className="container">
                <div className="header_row">
                    <div className="header_logo">
                        <img src = {logoImg} alt = "Logo" />
                        <span>Лось</span>
                    </div>
                    <nav className="header_nav">
                        <ul>
                            <li><a href="#!">Главная</a></li>
                            <li><a href="#!">Материалы</a></li>
                            <li><a href="#!">Профиль</a></li>
                            <li><a href="#!" className = "header_nav-btn">Выйти</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}
export default Examenheader;