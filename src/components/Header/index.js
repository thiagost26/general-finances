import {  useContext } from 'react';
import './header.css';
import { AuthContext } from '../../contexts/auth';
import avatar from '../../assets/avatar.png';

import { Link } from "react-router-dom";
import { 
    FcMoneyTransfer, 
    FcHome, FcSettings, 
    FcCurrencyExchange, 
    FcExternal,
    FcFactory } from "react-icons/fc";

export default function Header() {
    const { user } = useContext(AuthContext);


    return(
        <div className="sidebar">
            <div>
                <img src={user.avatarUrl === null ? avatar : user.avatarUrl } alt="Foto avatar" />
            </div>

            <Link to="/dashboard">
                <FcHome color='#FFF' size={25} />
                Dashboard
            </Link>

            <Link to="/ativos">
                <FcCurrencyExchange size={25} />
                Ativos
            </Link>

            <Link to="/dividendos">
                <FcMoneyTransfer size={25} />
                Dividendos
            </Link>

            <Link to="/cep">                
                <FcExternal size={25} />
                Cep
            </Link>

            <Link to="/localidade">                
                <FcFactory size={25} />
                Localidade
            </Link>

            <Link to="/teste">                
                Teste
            </Link>

            <Link to="/profile">                
                <FcSettings size={25} />
                Configurações
            </Link>
        </div>
    )
}