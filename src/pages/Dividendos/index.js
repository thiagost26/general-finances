import { useState, useEffect, useContext } from 'react'

import firebase from '../../services/firebaseConnection';
import { useParams, useHistory } from 'react-router-dom';

import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { toast } from 'react-toastify';

import { FcMoneyTransfer  } from 'react-icons/fc';

import './dividendos.css';

export const Dividendos = () => {

    const { id } = useParams();
    const history = useHistory();
    const [loadAtivos, setLoadAtivos] = useState(true);
    const [ativos, setAtivos] = useState([]);
    const [ativoSelected, setAtivoSelected] = useState();

    const [status, setStatus] = useState('');
    const [valor, setValor] = useState('');
    const [qtd, setQtd] = useState('');
    const [dataPagamento, setDataPagamento] = useState('')

    const [idAtivo, setIdAtivo] = useState(false);
    const [ loadingLancamento, setLoadingLancamento ] =useState(false);

    const { user } = useContext(AuthContext);

    
    useEffect(() => {
        async function loadAtivos() {
            await firebase.firestore().collection('ativos')
            .get()
            .then((snapshot) => {
                let lista = [];

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        ativo: doc.data().ativo
                    })
                })

                setAtivos(lista);
                setLoadAtivos(false);
            })
            .catch((error) => {
                console.log('DEU ALGUM ERRO', error);
                setLoadAtivos(false);
                setAtivos([ {id: 1, ativo: ''} ]);
            })
        }

        loadAtivos();
    }, [])
    
    async function handleRegister(e) {
        e.preventDefault();
        setLoadingLancamento(true);

        if(idAtivo) {
            await firebase.firestore().collection('dividendos')
            .doc(id)
            .update({
                ativo: ativos[ativoSelected].ativo,
                ativoId: ativos[ativoSelected].id,
                status: status,
                valor: valor,
                qtd: qtd,
                dataPagamento: dataPagamento,
                userId: user.uid
            })
            .then(() => {
                toast.success('Dividendo atualizado com sucesso!');
                setAtivoSelected(0);
                history.push('/dashboard');
            })
            .catch((error) => {
                toast.error('Ops erro a atualizar, tente novamente mais tarde');
                console.log('Erro: ', error);
            })
        }

        
        await firebase.firestore().collection('dividendos')
        .add({
            created: new Date(),
            ativo: ativos[ativoSelected].ativo,
            ativoId: ativos[ativoSelected].id,
            status: status,
            valor: valor,
            qtd: qtd,
            dataPagamento: dataPagamento,
            userId: user.uid
        })        
        .then(() => {
            toast.success('Dividendo lançado com sucesso!');            
            setQtd('');
            setValor('');
            setStatus('')
            setAtivoSelected(0);
            setDataPagamento('');
            setLoadingLancamento(false);
        })
        .catch((error) => {
            toast.error('Ops erro a registrar, tente mais tarde');
            console.log('Erro: ', error);
        })

    }

    function handleChangeSelect(e) {
        e.preventDefault();
        let value = e.target.value
        setAtivoSelected(value);
        // console.log('index do cliente selecionado', value);
        // console.log('ativo selecionado', ativos[value]);
    }

    function handleOptionChange(e) {
        setStatus(e.target.value);
        console.log(e.target.value);
    }



  return (
    <div>
        <Header />

        <div className='content'>
            <Title name="Lançamento de dividendos">
                <FcMoneyTransfer size={25} />
            </Title>

            <div className='container'>
                <form className="form-profile" onSubmit={handleRegister}>

                    <label>Ativos</label>

                    {loadAtivos ? (
                        <input type="text" disabled={true} value="Carregando ativos..." />
                     ) : ( 

                        <select value={ativoSelected} onChange={handleChangeSelect} >
                            <option value='0'>Selecione o ativo</option>
                            {ativos.map((item, index) => {
                                return(
                                    <option key={item.id} value={index}>
                                        {item.ativo}
                                    </option>
                                )
                            })}
                        </select>

                    )}

                    <label>Quantidade</label>
                    <input type="text" placeholder="Quantidade de ativos" value={qtd} onChange={(e) => setQtd(e.target.value)} />

                    <label>Data pagamento</label>
                    <input type="date" name="data" value={dataPagamento} onChange={(e) => setDataPagamento(e.target.value)}  />

                    <label>Valor</label>
                    <input type="text" placeholder="R$ valor" value={valor} onChange={(e) => setValor(e.target.value)} />

                    <label>Status</label>
                        <div className="status">
                            <input 
                            type="radio"
                            name="radio"
                            value="Aprovado"
                            onChange={handleOptionChange}
                            checked={status === 'Aprovado'}
                            />
                            <span>Aprovado</span>
                            
                            <input 
                            type="radio"
                            name="radio"
                            value="Negado"
                            checked={status === 'Negado'}
                            onChange={handleOptionChange}

                            />
                            <span>Negado</span>
                        </div>

                        {idAtivo ? (
                            <button type='submit'>Atualizar</button>
                        ) : (
                            <button type='submit'>{loadingLancamento ? 'Registrando...' : 'Lançar'}</button>
                        )}
                        

                </form>
            </div>
        </div>
    </div>
  )
}
