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
            <div>
                <Header />
                <div className="content">
                    <Title name="Dividendos lançados">
                        <FcMoneyTransfer size={25} />
                    </Title>


                        <Link to="/dividendos" className="dividendos">
                            <FcPlus size={25} color="#FFF" />
                            Novo dividendo
                        </Link>

                            
                            {dividendos.map((item, index) => {
                                return(
                                    <option key={item.id} value={index}>
                                        {item.ativo}
                                        {item.dataPagamento}
                                        {item.qtd}
                                        {item.valor}
                                        {item.status}
                                    </option>
                                )
                            })}

                </div>

                {showPostModal && (
                    <Modal
                        conteudo={detail}
                        close={togglePostModal}
                    />
                )}
            </div>
        )
    }
}
