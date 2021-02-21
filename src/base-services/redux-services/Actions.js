export const COLLAPSE_SIDER = 'COLLAPSE_SIDER';
export const DATA_TABLE = 'DATA_TABLE';
export const BANSOS_DATA_TABLE = 'BANSOS_DATA_TABLE';


export const collapseSider = data =>{
    return{
        type: COLLAPSE_SIDER,
        payload: data
    }
}

export const DataTable = data =>{
    return{
        type: DATA_TABLE,
        payload: data
    }
}


export const BansosDataTable = data =>{
    return{
        type: BANSOS_DATA_TABLE,
        payload: data
    }
}