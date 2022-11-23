import { React } from 'react'
import { useForm } from 'react-hook-form';

import Header from '../../components/Header';
import Title from '../../components/Title';

import { FcExternal } from 'react-icons/fc';

import './cep.css';

export const Cep = () => {

    const {register, handleSubmit, setValue, setFocus} = useForm();

    const onSubmit = (e) => {
        console.log(e)
        setValue('cep', '');
        setValue('rua', '');
        setValue('bairro', '');
        setValue('cidade', '');
        setValue('estado', '');
        setValue('numero', '');
    }

    const checkCep = (e) => {
        const cep = e.target.value.replace(/\D/g, '');
        console.log(cep);
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(res => res.json()).then(data => {
                console.log(data);
                setValue('rua', data.logradouro);
                setValue('bairro', data.bairro);
                setValue('cidade', data.localidade);
                setValue('estado', data.uf);
                setFocus('numero');
            });
    }

  return (

    <div>
        <Header />

        <div className="content">
            <Title name="Cep">
            <FcExternal size={25} />
            </Title>

            <div className="container">
                <form className="form-profile" onSubmit={handleSubmit(onSubmit)}>
                    <label>CEP:</label>
                    <input type="text" {...register('cep')} onBlur={checkCep} />

                    <label>Rua:</label>
                    <input type="text" {...register('rua')}/>

                    <label>Número:</label>
                    <input type="text" {...register('numero')}/>

                    <label>Bairro:</label>
                    <input type="text" {...register('bairro')}/>

                    <label>Cidade:</label>
                    <input type="text" {...register('cidade')}/>

                    <label>Estado:</label>
                    <input type="text" {...register('estado')}/>

                    <button className="enviar">Enviar</button>
                </form>
            </div>
        </div>
    </div>
        
  )
}