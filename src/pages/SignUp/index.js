import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/auth';

// import logo from '../../assets/logo.png';


function SingUp() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //CHAMANDO A FUNÇÃO
    const { singUp, loadingAuth } = useContext(AuthContext);


    function handleSubmit(e) {
        e.preventDefault();

        if(nome !== '' && email !== '' && password !== '') {
            singUp(email, password, nome);
        }
    }


    return(
        <div className="container-center">
            <div className="login">
                <div className="login-area">
                    <img alt="Sistema logo" />
                </div>

                <form onSubmit={handleSubmit}>

                    <h1>Registrar</h1>

                    <input type="text" placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                    <input type="text" placeholder="email@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="************" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">{loadingAuth ? 'Registrando..' : 'Cadastrar'}</button>
                </form>

                <Link to="/">Já possui uma conta? Entre</Link>
            </div>
        </div>
    )
}

export default SingUp;