import React from 'react';

import { Menu } from 'antd';
import {Routes} from '../../Routes';
import {Link, withRouter} from 'react-router-dom';

class SiderContent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            role: ''
        }
    }

    search(nameKey, myArray){
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i].path === nameKey) {
                return myArray[i];
            }
        }
    }

    componentDidMount(){
        const emailStorage = localStorage.getItem('EMAIL');
        const roleStorage = localStorage.getItem('ROLE');
        this.setState({email: emailStorage});
        this.setState({role: roleStorage});
    }

    render(){
        return(
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.search(this.props.location.pathname, Routes).key.toString()]}>
                {Routes.map((val) => (
                    val.name !== 'Tambah Penerima Bansos' ?
                    <Menu.Item key={val.key} icon={val.icon}>
                        <Link to={val.path}>{val.name}</Link>
                    </Menu.Item> : ''
                ))}
            </Menu>
        )
    }
}

export default withRouter(SiderContent);