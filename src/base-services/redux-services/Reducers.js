const GlobalState = {
    collapsed: false,
    dataTable: [
        {
            id: 1,
            username:'admin',
            name: 'super admin',
            role: 'admin',
            desc: 'admin',
            email: '',
            RT: '',
            RW: '',
            address: '',
            phone: '',
            password: ''
        },
        {
            id: 2,
            username:'pakrw',
            name: 'pak rw',
            role: 'rw',
            desc: 'rw cipadung kulon',
            email: 'pakrw@gmail.com',
            RT: '001',
            RW: '006',
            address: 'jalan panutan raya',
            phone: '0812343542343',
            password:''
        }
    ],
    bansosDataTable: [
        {
            id: 1,
            nama: 'Renaldy',
            nik: '123445678789',
            kk:'12334543545646',
            alamat: 'Jalan Panutan Raya',
            rt: '001',
            rw: '006',
            alasan: '0'
        }
    ]
}

export const Reducers = (state = GlobalState, action) => {
    const { type, payload } = action;
    switch(type){
        case 'COLLAPSE_SIDER':{
            state.collapsed = payload;
            return{
                ...state,
                collapsed: state.collapsed
            }
        }
        case 'DATA_TABLE':{
            state.dataTable = [...state.dataTable, payload]
            return{
                ...state,
                dataTable: state.dataTable
            }
        }
        case 'BANSOS_DATA_TABLE':{
            state.bansosDataTable = [...state.bansosDataTable, payload]
            return{
                ...state,
                bansosDataTable: state.bansosDataTable
            }
        }
        default:
            return state;
    }
}

export default Reducers;