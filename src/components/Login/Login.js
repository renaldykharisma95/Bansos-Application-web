import React from 'react';
import { Form, Input, Button, Card, Row, Col, Modal, Spin } from 'antd';
import './Login.css';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

class Login extends React.Component{

    constructor(){
        super();
        this.state = {
            isLoad: false
        }
        this.onLogin = this.onLogin.bind(this);
    }

    cardStyle={
        width: '650px',
        margin: '0 auto 0',
    }

    onLogin = (value) => {
        this.setState({isLoad: true}, ()=>{
            localStorage.setItem('EMAIL', value.email);
            localStorage.setItem('ROLE', 'RW');
            this.props.history.push('/user-management'); 
            this.setState({isLoad: false})
        });
    }

    render(){
        return(
            <React.Fragment>
                <div className="centered-card">
                <Row justify="center">
                    <Col xs={18} md={10} lg={9} xl={8} xxl={7}>
                        <Spin spinning={this.state.isLoad} size="large">
                            <Card id="card">
                                <h2 style={{textAlign:'center', padding:'20px 0'}}>Login</h2>                            
                                <Row justify="center" align="middle">
                                    <Col xs={24} md={16} lg={16} xl={18} xxl={14}>
                                        <Form
                                            name="login"
                                            initialValues={{ remember: true }}
                                            onFinish={this.onLogin}
                                            >
                                            <Form.Item
                                                name="email"
                                                rules={[{ required: true, message: 'Please input your email!' }]}
                                            >
                                                <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
                                            </Form.Item>
                                            <Form.Item
                                                name="password"
                                                rules={[{ required: true, message: 'Please input your password!' }]}
                                            >
                                                <Input size="large" type="password" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                                            </Form.Item>
                                            <Form.Item>
                                                <Button type="primary" htmlType="submit" style={{width:'100%'}}>Login</Button>     
                                            </Form.Item>
                                        </Form>
                                    </Col>
                                </Row>
                            </Card>
                        </Spin>
                    </Col>
                </Row>
                </div>
            </React.Fragment>
        )    
    }
}

export default Login;
