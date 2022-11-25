import { useState } from 'react'
import Header from '../../components/Header';
import Title from '../../components/Title';

import { FcCurrencyExchange } from 'react-icons/fc';

import firebase from '../../services/firebaseConnection';
import { toast } from 'react-toastify';

export const Ativos = () => {

  const [ tipoAtivo, setTipoAtivo ] = useState('');
  const [ ativo, setAtivo ] = useState('');
  const [ loadingLancamento, setLoadingLancamento ] =useState(false);


  function handleChangeTipoAtivo(e) {
    const valorTipoAtivo = e.target.value;
    setTipoAtivo(valorTipoAtivo);
  }

  async function handleRegister(e) {
    e.preventDefault();
    setLoadingLancamento(true);

    if(tipoAtivo !== '' && ativo !== '') {
      await firebase.firestore().collection('ativos')
        .add({
          tipoAtivo: tipoAtivo,
          ativo: ativo
        })
        .then(() => {
          setTipoAtivo('');
          setAtivo('');
          toast.success('Ativo cadastrado com sucesso!');
          setLoadingLancamento(false);
        })
        .catch((error) => {
          console.log('erro: ', error);
          toast.error('Ops, erro ao cadastrar Ativo!');
          setLoadingLancamento(false);
        })
    }
  }


  return (
    <div>
      <Header/>

      <div className="content">
        <Title name="Lançamento de ativos">
            <FcCurrencyExchange size={25} />
        </Title>

        <div className="container">
                    <form className="form-profile" onSubmit={handleRegister}>
                        <label>Tipo do ativo</label>
                        <select value={tipoAtivo} onChange={handleChangeTipoAtivo}>
                            <option value="">Selecione</option>
                            <option value="FII">REITS</option>
                            <option value="ACAO">STOCK</option>
                            <option value="ETF">ETF</option>
                        </select>


                        <label>Nome do ativo</label>
                        <input type="text" placeholder="Nome do ativo" value={ativo} onChange={(e) => setAtivo(e.target.value)} />

                        <button type="submit">{loadingLancamento ? 'Lançando ativo...' : 'Lançar'}</button>

                        
                    </form>

                </div>

      </div>
    </div>
  )
}
