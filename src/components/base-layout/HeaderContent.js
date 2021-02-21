import { Row, Col, Button, Avatar, Menu, Dropdown, Modal, Space } from "antd";
import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import {collapseSider} from '../../base-services/redux-services/Actions';
import { useDispatch } from 'react-redux';
import './HeaderContent.css';
import {withRouter} from 'react-router-dom';

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    BellOutlined,
    UserOutlined,
    LogoutOutlined
  } from '@ant-design/icons';

function HeaderContent({props}){

    const [collapsed, setCollapsed] = useState(false);
    const [email, setEmail] = useState('');
    const [isLogOutVisible, setLogout] = useState(false);
    const history = useHistory();

    const dispatch = useDispatch();

    useEffect(() => {
        const emailStorage = localStorage.getItem('EMAIL');
        setEmail(email => email = emailStorage);
    }, []);

    const onClickSignOut = ()=>{
        setLogout(isLogOutVisible => isLogOutVisible = true);
    }

    const onSignOutAuth = ()=>{
        localStorage.clear();
        history.push('/');
    }

    const handleCancelSignOut = () =>{
        setLogout(isLogOutVisible => isLogOutVisible = false);
    }

    const menu = (
        <Menu>
            <Menu.Item onClick={onClickSignOut}>
                <LogoutOutlined />Sign Out
            </Menu.Item>
        </Menu>
    )

    return(
        <div>
            <Modal
                    title="Sign Out"
                    visible={isLogOutVisible}
                    onOk={onSignOutAuth}
                    onCancel={handleCancelSignOut}
                    >
                    <h3>Are you sure want to sign out?</h3>
                </Modal>
            <Row className="header-content">
                <Col xl={18} lg={21}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : 
                    MenuFoldOutlined, { className: 'trigger', onClick: ()=>{
                        setCollapsed(!collapsed);
                        dispatch(collapseSider(!collapsed));
                    },
                    })}
                </Col>
                <Col xs={12} xl={1} lg={1}><Button shape="circle" icon={<BellOutlined />} /></Col>
                <Col xs={12} xl={4} lg={2}>
                    <Space align="center" size={6}>
                    <Avatar icon={<UserOutlined />} />
                    <Dropdown overlay={menu} placement="bottomCenter">
                        <Button type="text">{email}</Button>
                    </Dropdown>
                    </Space>
                </Col>
            </Row>
        </div>
    )
}
export default withRouter(HeaderContent);
