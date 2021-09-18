interface ModelInterface {
    ip: string | undefined;
    port: number | undefined;
    ak: string | undefined;
    id: number | undefined;
}

interface sourceInterface {
    key: number;
    ip: string;
    system: string;
    id: number;
    mem_total: number;
    panel_version: string;
    status: number;
    port: number;
    ak: string;
    deleteLoading: any;
    testing_time: null | number;
    // update: {
    //     status: boolean;
    //     msg: any
    // };
}

interface stateInterface {
    ipList?: Array<any>,
    loading: {
        search: boolean;
    }
    pagination: {
        current: number;
        pageSize: number;
        total?: number;
    }
    ipListLoading: boolean,
    dataSource: Array<sourceInterface>,
    addModel: {
        title?: string;
        okText?: string;
        okLoading: boolean;
        visible: boolean;
        form?: ModelInterface;
    }
}

interface paramsPostInterface {
    //服务器ID
    id?: number;
    port: number;
    ak: string;
    ip: string;
}

export { sourceInterface, stateInterface, ModelInterface, paramsPostInterface }