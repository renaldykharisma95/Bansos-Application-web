import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Base from "../../components/base-layout/Base";
import Login from "../../components/Login/Login";
import UserManagement from "../../components/user-management/UserManagement";
import BansosManagement from "../../components/penerima-bansos/bansos-management";
import AddPenerima from "../../components/add-penerima/AddPenerima";

export default function RootApp(){
    return(
        <Router>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route>
                    <Base>
                        <Switch>
                            <Route exact path="/user-management" component={UserManagement} />
                            <Route path="/bansos-receiver" component={BansosManagement} />
                            <Route path="/add-bansos-receiver" component={AddPenerima} />
                        </Switch>
                    </Base>
                </Route>
            </Switch>
        </Router>
    )
}