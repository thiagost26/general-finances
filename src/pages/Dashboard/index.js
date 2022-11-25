import { useState, useEffect } from 'react';

import './dashboard.css';
import Header from "../../components/Header";
import Title from '../../components/Title';

import { FcMoneyTransfer, FcPlus, FcSearch, FcSupport } from "react-icons/fc"
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';
import { format } from 'date-fns';

import firebase from "../../services/firebaseConnection";

const listRef = firebase.firestore().collection('dividendos').orderBy('created', 'asc');


export default function Dashboard() {
    const [dividendos, setDividendos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [lastDocs, setLastDocs] = useState();

    const [showPostModal, setShowModal] = useState(false);
    const [detail, setDetail] = useState();



    useEffect(() => {
        
        return () => {
            async function loadChamados() {
                await listRef.limit(5)
                .get()
                .then((snapshot) => {
                    updateState(snapshot)
        
                })
                .catch((error) => {
                    console.log('Deu algum erro: ', error);
                    setLoadingMore(false);
                })
        
                setLoading(false);
            }

            loadChamados();
        }

        
    }, []);



    async function updateState(snapshot) {
        const isCollectionEmpty = snapshot.size === 0;

        if(!isCollectionEmpty) {
            let lista = [];

            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    ativo: doc.data().ativo,
                    dataPagamento: doc.data().dataPagamento,
                    qtd: doc.data().qtd,
                    status: doc.data().status,
                    valor: doc.data().valor
                })
            })

            const lastDoc = snapshot.docs[snapshot.docs.length -1]; //PEGANDO O ÚLTIMO DOCUMENTO BUSCADO
            
            console.log(lista);

            setDividendos(dividendos => [...dividendos, ...lista]);
            setLastDocs(lastDoc);
        }else {
            setIsEmpty(true);
        }

        setLoadingMore(false);
    }


    async function handleMore() {
        setLoadingMore(true);
        await listRef.startAfter(lastDocs).limit(5)
        .get()
        .then((snapshot) => {
            updateState(snapshot)
        })
    }


    function togglePostModal(item) {
        setShowModal(!showPostModal);
        setDetail(item);
    }


    if(!loading) {
        return(
            <>
                <Header />
                <div className="content">
                    <Title name="Dividendos lançados">
                        <FcMoneyTransfer size={25} />
                    </Title>


                        <Link to="/dividendos" className="dividendos">
                            <FcPlus size={25} color="#FFF" />
                            Novo dividendo
                        </Link>

                        <>
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">Ativo</th>
                                        <th scope="col">Data Pag</th>
                                        <th scope="col">Qtd</th>
                                        <th scope="col">Dividendo</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dividendos.map((item, index) => {
                                        const qtdInt = parseFloat(item.qtd);
                                        const valor = parseFloat(item.valor);
                                        const total = (qtdInt * valor);
                                        
                                        const valorFormated = `$ ${valor.toFixed(2).replace('.',',')}`;
                                        const totalFormated = `$ ${total.toFixed(2).replace('.',',')}`;
                                        
                                        return(
                                            <tr key={index} >
                                                <td data-label="Ativo">{item.ativo}</td>
                                                <td data-label="Data">{item.dataPagamento}</td>
                                                <td data-label="Qtd">{item.qtd}</td>
                                                <td data-label="Dividendo">{valorFormated}</td>
                                                <td data-label="Status">
                                                    <span className="badge" style={{ backgroundColor: item.status === 'Aprovado' ? '#5cb85c' : '#999'}}>{item.status}</span>
                                                </td>
                                                <td data-label="Total">{totalFormated}</td>
                                                <td>
                                                    <button className="action" style={{backgroundColor: '#3583f6'}} onClick={() => togglePostModal(item)} >
                                                        <FcSearch color='#FFF' size={17} />
                                                    </button>
                                                    <Link className="action" style={{backgroundColor: '#F6a935'}} >
                                                        <FcSupport color='#FFF' size={17} />
                                                    </Link>
                                                </td>
                                            </tr>  
                                        )
                                    })}                                   
                                </tbody>
                            </table>

                            {loadingMore && <h3 style={{textAlign: 'center', marginTop: 15}}>Buscando dados...</h3>}
                            { !loadingMore && !isEmpty && <button className="btn-more" onClick={handleMore} >Buscar mais</button>}
                        </>
                </div>

                {showPostModal && (
                    <Modal
                        conteudo={detail}
                        close={togglePostModal}
                    />
                )}

            </>
        )
    }
}
