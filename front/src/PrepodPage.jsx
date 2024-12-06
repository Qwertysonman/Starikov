import React, { useContext } from 'react';
import Footer from "./components/main/footer/Footer";
import Accountheader from './components/personal_account/account_header/Accountheader';
import PrepodSigns from './components/prepod_account/prepod_signs/PrepodSigns';
//import PrepodRecords from './components/prepod_account/prepod_practice/PrepodRecords';
import Prepodmain from './components/prepod_account/prepodmain/Prepodmain';


import { UserContext } from './UserContext';

const PrepodPage = () => {
    const { userData } = useContext(UserContext);

    return (
        <div>
            <Accountheader data={userData} />
            <Prepodmain data={userData} />
            <PrepodSigns prepod={userData} />
            <Footer />
        </div>
    );
};

export default PrepodPage;
