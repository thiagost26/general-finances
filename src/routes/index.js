import { Switch } from "react-router-dom"

import Route from './Route';

import SignIn from '../pages/SingIn';
import SignUp from '../pages/SignUp';

import { Dashboard } from "../pages/Dashboard";

import { Profile } from '../pages/Profile';
import { Dividendos } from "../pages/Dividendos";
import { Ativos } from "../pages/Ativos";
import { Cep } from '../pages/Cep';
import { Localidade } from '../pages/Localidade';


export default function Routes() {
    return(
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/login" component={SignIn} />
            <Route exact path="/register" component={SignUp} /> 
            <Route exact path="/dashboard" component={Dashboard} isPrivate />

            <Route exact path="/profile" component={Profile} isPrivate />
            <Route exact path="/dividendos" component={Dividendos} isPrivate />
            {/* <Route exact path="/dividendos/:id" component={Dividendos}  isPrivate /> */}
            <Route exact path="/ativos" component={Ativos} isPrivate />
            <Route exact path="/cep" component={Cep} isPrivate />
            <Route exact path="/localidade" component={Localidade} isPrivate />

        </Switch>

    )
}