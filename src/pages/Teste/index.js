import { useEffect, useState, useContext } from 'react'
import firebase from '../../services/firebaseConnection';
import { AuthContext } from '../../contexts/auth';

import Header from '../../components/Header';
import Title from '../../components/Title';

import { FcExternal } from 'react-icons/fc';


export const Teste = () => {
  const { user } = useContext(AuthContext);

  const [dividendos, setDividendos] = useState([]);
  const [idUser, setIdUser] = useState(user.uid);

  useEffect(() => {

    console.log('userId: ', idUser);
    async function loadChamados() {

      await firebase.firestore().collection('dividendos')
      .where("userId", "==", idUser)
      .get()
      .then((snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            ativo: doc.data().ativo,
            ativoId: doc.data().ativoId,
            criacao: doc.data().criacao,
            dataPagamento: doc.data().dataPagamento,
            qtd: doc.data().qtd,
            status: doc.data().status,
            userId: doc.data().userId,
            valor: doc.data().valor
          })
        })

        console.log(lista.userId);
        console.log(lista);
        setDividendos(lista);


      })
      .catch((error) => {
        console.log('DEU ALGUM ERRO', error);        
      })

    }

    loadChamados();

  },[]) 

  return (
    <div>
      <Header/>

      <div className="content">
            <Title name="Teste">
            <FcExternal size={25} />
            </Title>

          <select>
            {dividendos.map((item, index) => {
              return(
                <option key={item.id} value={index}>
                  {item.ativo}
                </option>
              )
            })}
          </select>

        </div>
    </div>    
  )
}
