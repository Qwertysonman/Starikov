import React, { useContext } from 'react';
import Footer from "./components/main/footer/Footer";
import Accountheader from './components/personal_account/account_header/Accountheader';
import Adminmain from './components/admin_account/adminmain/Adminmain';
import ChoiseForm from './components/admin_account/admin_choise/ChoiseForm';
import { UserContext } from './UserContext';

const AdminPage = () => {
    const { userData } = useContext(UserContext);

    return (
        <div>
            <Accountheader data={userData} />
            <Adminmain data={userData} />
            <ChoiseForm />
            <Footer />
        </div>
    );
};

export default AdminPage;
