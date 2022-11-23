import { useEffect, useState } from 'react'
import axios from 'axios';
import Header from '../../components/Header'
import Title from '../../components/Title'

import { FcFactory } from 'react-icons/fc';


export const Localidade = () => {
  
  const [ufs, setUfs] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedUf, setSelectedUf] = useState();
  const [selectedCity, setSelectedCity] = useState();

  useEffect(() => {
    axios
      .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      )
      .then(res => {
      setUfs(res.data);
    });
  },[]);

  useEffect(() => {
    axios
      .get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then(res => {
        setCities(res.data);
    });
  },[selectedUf]);

  function handleSelectedUf(e) {
    const uf = e.target.value;
    setSelectedUf(uf);
  }

  function handleSelectedCity(e) {
    const city = e.target.value;
    setSelectedCity(city);
  }
  

  return (
    <div>
      <Header />

      <div className="content">
            <Title name="Localidade">
              <FcFactory size={25} />
            </Title>

            <div className="container">
                <form className="form-profile" >
                    <label>Estado:</label>
                    <select 
                      name="uf" 
                      id="uf" 
                      value={selectedUf} 
                      onChange={handleSelectedUf}
                      >
                      <option value="">Selecione a UF</option>
                      {ufs.map((uf) => (
                        <option key={uf.id} value={uf.sigla}>
                          {uf.sigla} - {uf.nome}
                        </option>
                      ))}
                    </select>

                    <label>Cidade:</label>
                    <select 
                      name="city" 
                      id="city" 
                      value={selectedCity} 
                      onChange={handleSelectedCity}
                      >
                      <option value="0">Selecione a cidade</option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.nome}>
                          {city.nome}
                        </option>
                      ))}
                    </select>

                   
                </form>
            </div>
      </div>

    </div>

   
  )
}
