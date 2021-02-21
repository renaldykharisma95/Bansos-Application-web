import React from 'react';
import './Base.css';

import HeaderContent from './HeaderContent';
import SiderContent from './SiderContent';
import { Layout, Avatar, Typography } from 'antd';
import {
  UserOutlined
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {Routes} from '../../Routes';

const { Header, Sider, Content, Footer } = Layout;
const { Title } = Typography;

class Base extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            collapsed: true, 
            isTrigger: null,
            isMobile: false,
        };
    }

    search(nameKey, myArray){
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i].path === nameKey) {
                return myArray[i];
            }
        }
    }

    OnBreakPoint = isMobile => {
        this.isMobile = isMobile;
        this.setState({isTrigger: !isMobile ? this.state.isTrigger : '' })
    }

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    componentDidMount(){
        const emailStorage = localStorage.getItem('EMAIL');
        const roleStorage = localStorage.getItem('ROLE');
        this.setState({email: emailStorage});
        this.setState({role: roleStorage});
    }
    
    render(){
        const currNamePath = this.search(this.props.location.pathname, Routes).name.toString();
        return(
            <Layout>
                <Sider width={250} breakpoint="xs" id="sider" trigger={this.state.isTrigger} 
                onBreakpoint = {this.OnBreakPoint} collapsible collapsed={ this.isMobile ? this.state.collapsed : this.props.collapsed}
                onCollapse={this.onCollapse}>
                <div className="logo">
                    <Avatar size={64} id="sider-logo" icon={<UserOutlined />}></Avatar>
                    <span>
                        <br /><h3 className="text-logo">{this.state.email}</h3>
                        <hr className="hr"/>
                        <h4 className="text-logo">{this.state.role}</h4>
                    </span>
                </div>
                <SiderContent />
                </Sider>
                <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <HeaderContent className="header-content" />
                </Header>
                <Title level={2} style={{paddingLeft:'12px', paddingTop: '12px'}}>{currNamePath}</Title>
                <Content
                    className="content-layout"
                >
                    {this.props.children}
                </Content>
                <Footer className="footer">Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        )
    }
}

const mapStateToProps = state => ({
    collapsed: state.collapsed
});

export default withRouter(connect(mapStateToProps, null)(Base));