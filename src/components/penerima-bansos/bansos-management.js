import { Table, Space, Button, Form, Input, Modal } from 'antd';
import React, {useState, useEffect} from 'react';
import './bansos-management.css';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";


const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
};
export default function BansosManagement(){

    const reasons = [{
        id: 0,
        title: 'Kehilangan pekerjaan'
    },
    {
        id: 1,
        title: 'Kepala keluarga terdampak atau korban Covid'
    },
    {
        id: 2,
        title: 'Tergolong fakir/miskin semenjak sebelum Covid'
    },
    {
        id: 3,
        title: 'lainnya...'
    }
    ];

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
            title: 'Nama',
            dataIndex: 'nama'
        },
        {
            title: 'NIK',
            dataIndex: 'nik'
        },
        {
            title: 'Kartu Keluarga',
            dataIndex: 'kk'
        },
        {
            title: 'Alamat',
            dataIndex: 'alamat'
        },
        {
            title: 'RT',
            dataIndex: 'rt',
            render: (val) =>(
                val === '' ? <span>-</span>: val
            )
        },
        {
            title: 'RW',
            dataIndex: 'rw',
            render: (val) =>(
                val === '' ? <span>-</span>: val
            )
        },
        {
            title: 'Alasan',
            dataIndex: 'alasan',
            render: (val)=>(
                <span>{reasons.find(el =>el.id === parseInt(val)).title}</span>
            )
        },
        
    ];

    const [dataTable, setDataTable] = useState([]);
    const [isDetail, setIsDetail] = useState(false);
    const [isModalActionVisible, setModalAction] = useState(false);
    const [form] = Form.useForm();

    const dataTableState = useSelector(state => state.bansosDataTable)
    const history = useHistory();

    useEffect(() => {
        setDataTable(dataTable=>dataTable = dataTableState);
    }, [dataTableState]);
        
    const onClickDetail = (val) =>{
        setIsDetail(isDetail => isDetail = true);
        setModalAction(isModalActionVisible => isModalActionVisible = true);
        form.setFieldsValue(
            {
                nama: val.nama,
                nik: val.nik,
                kk: val.kk,
                alamat: val.alamat,
                rt: val.rt,
                rw: val.rw,
                alasan: val. alasan
            })
    }

    const onActionUser = () =>{
        history.push('/add-bansos-receiver');
    }

    const onSubmitForm = () =>{
        setModalAction(isModalActionVisible => isModalActionVisible = false);
    }
    
    return(
        <div>
            <Modal forceRender title='Detail User' closable={false} visible={isModalActionVisible}
                footer={
                    [
                    <Button key="save" htmlType="submit" type="primary" onClick={onSubmitForm}>Close</Button>
                    ]}>
                    <div style={{padding: '10 0'}}>
                        <Form
                        {...layout}
                        name="basic"
                        form={form}
                        onFinish={onSubmitForm}
                        >
                        <Form.Item
                            label="Nama"
                            name="nama"
                        >
                            <Input disabled={true} />
                        </Form.Item>
                        <Form.Item
                            label="NIK"
                            name="nik"
                        >
                            <Input disabled={true} />
                        </Form.Item>
                        <Form.Item
                            label="KK"
                            name="kk"
                        >
                            <Input disabled={true} />
                        </Form.Item>
                        <Form.Item
                            label="Alamat"
                            name="alamat"
                        >
                            <Input disabled={true} />
                        </Form.Item>
                        <Form.Item
                            label="RT"
                            name="rt"
                        >
                            <Input disabled={true} />
                        </Form.Item>
                        <Form.Item
                            label="RW"
                            name="rw"
                        >
                            <Input disabled={true} />
                        </Form.Item>
                        <Form.Item
                            label="Alasan"
                            name="alasan"
                        >
                            <Input disabled={true} />
                        </Form.Item>
                        </Form>
                    </div>
                    
            </Modal>
            <Button style={{float: 'right', margin: '12px 0'}} onClick={onActionUser} type="primary" >Add Penerima Bansos</Button>
            <Table columns={columns} rowKey={(val)=>val.id} dataSource={dataTable} />
        </div>
    )
}