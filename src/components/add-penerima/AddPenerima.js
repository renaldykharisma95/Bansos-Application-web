import { Form, Input, InputNumber, Button, Spin, Select, Upload, Modal, Checkbox } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {BansosDataTable} from '../../base-services/redux-services/Actions';
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './AddPenerima.css'
const { Option } = Select;


const layout = {
labelCol: { span: 5 },
wrapperCol: { span: 18, offset: 1 },
};

const tailLayout = {
wrapperCol: { offset: 12, span: 12 },
};  

const dealLayout = {
    wrapperCol: { offset: 4, span: 18 },
};  

export default function AddPenerima(){

    const bansosData = useSelector(state => state.bansosDataTable);
    const dispatch = useDispatch();

    const [alasan, setAlasan] = useState(0);
    const [isLoad, setIsLoad] = useState(false);
    const history = useHistory();


    const onFinish = (values) => {
        setIsLoad(isLoad=> isLoad = true);
        setTimeout(()=>{
            const randResult = Math.random() < 0.5;
            if(!randResult){
                Modal.error({content: 'Internal Server Error: Server is Overload!'});
                setIsLoad(false)
                return;
            }
            dispatch(BansosDataTable({
                id: bansosData.length + 1,
                nama: values.nama,
                nik: values.nik,
                kk: values.kk,
                alamat: values.alamat,
                rt: values.rt,
                rw: values.rw,
                alasan: values.alasan
            }));    
            setIsLoad(isLoad => isLoad = false);
            history.push('/bansos-receiver');
            Modal.success({content: 'Add Data Success'});
        }, 1500);
    };
    
    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };

    useEffect(() => {
    }, [])

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

    const ktpFile = (e) => {
        if(e.file.type !== 'image/jpeg'){
            Modal.error({
                content: 'Only Receive JPG Format'
            });
        return e.file.type === 'image/png';
        }
        return e && e.fileList;
    };

    const kkFile = (e) => {
        if(e.file.type !== 'image/jpeg'){
            Modal.error({
                content: 'Only Receive JPG Format'
            });
        return e.file.type === 'image/png';
        }
        return e && e.fileList;
    };

    const onAlasanChange = e =>{
        setAlasan(alasan => alasan = e);
    }

    return(
        <div className="contents" style={{}}>
            <Spin spinning={isLoad}>
                <Form {...layout} name="control-ref" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <Form.Item name="nama" label="Nama" rules={[{ required: true }]}>
                    <Input style={{width: '400px'}} />
                    </Form.Item>
                    <Form.Item name="nik" label="NIK" rules={[{ required: true }]}>
                    <Input style={{width: '400px'}} />
                    </Form.Item>
                    <Form.Item name="kk" label="Nomor KK" rules={[{ required: true }]}>
                    <InputNumber style={{width: '400px'}} />
                    </Form.Item>
                    <Form.Item name="ktpimage" label="Foto KTP" valuePropName="fileList" getValueFromEvent={ktpFile} rules={[{ required: true }]}>
                    <Upload name="logo" listType="picture" action="">
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                    </Form.Item>
                    <Form.Item name="kkimage" label="Foto KK" valuePropName="fileList" getValueFromEvent={kkFile} rules={[{ required: true }]}>
                    <Upload name="logo" listType="picture" action="">
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                    </Form.Item>
                    <Form.Item name="umur" label="Umur" rules={[{ required: true }]}>
                    <InputNumber />
                    </Form.Item>
                    <Form.Item name="gender" label="Jenis Kelamin" rules={[{ required: true }]}>
                    <Input style={{width: '100px'}} />
                    </Form.Item>
                    <Form.Item name="alamat" label="Alamat" rules={[{ required: true }]}>
                    <Input.TextArea style={{width: '400px'}} />
                    </Form.Item>
                    <Form.Item name="rt" label="RT" rules={[{ required: true }]}>
                    <Input style={{width: '80px'}} />
                    </Form.Item>
                    <Form.Item name="rw" label="RW" rules={[{ required: true }]}>
                    <Input style={{width: '80px'}} />
                    </Form.Item>
                    <Form.Item name="beforePandemic" label="Penghasilan Sebelum Pandemi" rules={[{ required: true }]}>
                    <Input style={{width: '200px'}} />
                    </Form.Item>
                    <Form.Item name="afterPandemic" label="Penghasilan Setelah Pandemi" rules={[{ required: true }]}>
                    <Input style={{width: '200px'}} />
                    </Form.Item>
                    <Form.Item name="alasan" label="alasan" rules={[{ required: true }]}>
                    <Select style={{ width: 400 }} onChange={onAlasanChange}>
                        {
                            reasons.map((el, i) => (
                                <Option key={i}>{el.title}</Option>
                            ))
                        }
                    </Select>
                    </Form.Item>
                    
                    {
                    alasan.toString() === '3' ?
                    <Form.Item name="alasanLain" label="Alasan Lain" rules={[{ required: alasan.toString() === '3' ? true : false }]}>
                    <Input.TextArea style={{width: '400px'}} />
                    </Form.Item> : ''
                    }
                    <Form.Item {...dealLayout} name="remember" valuePropName="checked"
                    rules={[
                        {
                        validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject('Should accept agreement'),
                        },
                    ]}>
                        <Checkbox>Saya menyatakan bahwa data yang diisikan adalah benar dan siap mempertanggungjawabkan apabila ditemukan ketidaksesuaian dalam data tersebut.</Checkbox>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    </Form.Item>
                </Form>
            </Spin>
            
        </div>
    )
}