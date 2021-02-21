import { Table, Space, Button, Modal, Input, Form, Select } from 'antd';
import React, {useState, useEffect} from 'react';
import './UserManagemet.css';
import { useDispatch, useSelector } from 'react-redux';
import {DataTable} from '../../base-services/redux-services/Actions';

const { Option } = Select;

export default function UserManagement(){

    const columns = [
        {
            title: 'No',
            align: 'center',
            render: (text, val, i) =>(
                <p>{i + 1}</p>
            )       
        },
        {
            title: 'Actions',
            align: 'center',
            render: (val) => (
                <Space>
                    <Button type="primary" onClick={onClickDetail.bind(this, val)}>Detail</Button>
                </Space>
            )
        },
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Role',
            dataIndex: 'role'
        },
        {
            title: 'RT',
            dataIndex: 'RT',
            render: (val) =>(
                val === '' ? <span>-</span>: val
            )
        },
        {
            title: 'RW',
            dataIndex: 'RW',
            render: (val) =>(
                val === '' ? <span>-</span>: val
            )
        },
        {
            title: 'Description',
            dataIndex: 'desc'
        }
    ];

    const [title, setTitle] = useState('');
    const [isModalActionVisible, setModalAction] = useState(false);
    const [dataTable, setDataTable] = useState([]);
    const [isAdd, setIsAdd] = useState(false);
    const [isDetail, setIsDetail] = useState(false);

    const [form] = Form.useForm();
    
    const dataTableState = useSelector(state => state.dataTable)
    const dispatch = useDispatch();

    const roleOptions = ['RT', 'RW']

    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    };

    useEffect(() => {
        setDataTable(dataTable=>dataTable = dataTableState);
    }, [dataTableState]);
        
    const onClickDetail = (val) =>{
        setIsDetail(isDetail => isDetail = true);
        setIsAdd(isAdd => isAdd = false);
        setModalAction(isModalActionVisible => isModalActionVisible = true);
        form.setFieldsValue(
            {
                username: val.username,
                fullname: val.name,
                email: val.email,
                role: val.role,
                address: val.address,
                rt: val.RT,
                rw: val.RW,
                desc: val.desc
            })
    }

    const onActionUser = () =>{
        setTitle(title => title = 'Add User');
        setModalAction(isModalActionVisible => isModalActionVisible = true);
        setIsAdd(isAdd => isAdd = true);
        setIsDetail(isDetail => isDetail = false);
    }

    const onCancel = () =>{
        setModalAction(isModalActionVisible => isModalActionVisible = false)
    }

    const onSubmitForm = (isadd) =>{
        if(isadd){
            form.validateFields().then(value =>{
                dispatch(DataTable(
                    {
                        id: dataTable.length + 1,
                        username: value.username,
                        name: value.fullname,
                        role: value.role === 0 ? 'RW' : 'RT',
                        desc: value.desc,
                        email: value.email,
                        RT: value.RT,
                        RW: value.RW,
                        address: value.address,
                        phone: '-',
                        password: value.password
                    }
            ));
            setModalAction(isModalActionVisible => isModalActionVisible = false);
            form.resetFields();
            }).catch((errorInfo) => {
            });
            return;
        }
        setModalAction(isModalActionVisible => isModalActionVisible = false);
        form.resetFields();
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    
    return(
        <div>
            <Modal forceRender title={title} closable={false} visible={isModalActionVisible}
                footer={
                    isAdd ? 
                    [
                    <Button key="cancel" type="danger" onClick={onCancel}>Cancel</Button>,
                    <Button key="save" htmlType="submit" type="primary" onClick={onSubmitForm.bind(this, isAdd)}>Save</Button>
                    ] : <Button key="save" htmlType="submit" type="primary" onClick={onSubmitForm.bind(this, isAdd)}>Close</Button>}>
                    <div style={{padding: '10 0'}}>
                        <Form
                        {...layout}
                        name="basic"
                        form={form}
                        onFinish={onSubmitForm}
                        onFinishFailed={onFinishFailed}
                        >
                        <Form.Item
                            label="username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input disabled={isDetail} />
                        </Form.Item>

                        <Form.Item
                            label="Full Name"
                            name="fullname"
                            rules={[{ required: true, message: 'Please input your Fullname!' }]}
                        >
                            <Input disabled={isDetail} />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your Email!' }]}
                        >
                            <Input disabled={isDetail} />
                        </Form.Item>

                        <Form.Item
                            label="Role"
                            name="role"
                            rules={[{ required: true, message: 'Pick the Role!' }]}
                        >
                            <Select disabled={isDetail} style={{ width: 120 }}>
                                {
                                    roleOptions.map((el, i) => (
                                        <Option key={i}>{el}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[{ required: true, message: 'Please Input Your Address!' }]}
                        >
                            <Input.TextArea disabled={isDetail} />
                        </Form.Item>

                        <Form.Item
                            label="RT"
                            name="rt"
                            rules={[{ required: true, message: 'Please Input Your RT!' }]}
                        >
                            <Input disabled={isDetail} />
                        </Form.Item>

                        <Form.Item
                            label="RW"
                            name="rw"
                            rules={[{ required: true, message: 'Please Input Your RW!' }]}
                        >
                            <Input disabled={isDetail} />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="desc"
                            rules={[{ required: true, message: 'Please Input Your description!' }]}
                        >
                            <Input disabled={isDetail} />
                        </Form.Item>
                        {isAdd ?
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item> : <></>}
                        </Form>
                    </div>
            </Modal>
            <Button style={{float: 'right', margin: '12px 0'}} onClick={onActionUser} type="primary" >Add User</Button>
            <Table columns={columns} rowKey={(val)=>val.id} dataSource={dataTable} />
        </div>
        )
}