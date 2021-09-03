import React from "react";
import { Select, Table, Input, Tag } from "antd";
import "@/static/css/Domain.scss";
import Axios from 'axios'
const { Search } = Input;
const { Option } = Select;

interface sourceInterface {
    key: number;
    ip: string;
    name: string;
    status: boolean;
    ps: string;
    version: string;
    domain: Array<any>;
}

interface stateInterface {
    ipList?: Array<any>,
    ipListLoading: boolean,
    dataSource: Array<sourceInterface>
}

export default class Index extends React.Component<any, any>{

    public state: stateInterface

    constructor(props: any) {
        super(props);
        this.state = {
            ipListLoading: true,
            dataSource: []
        }
    }

    columns = [
        {
            title: '网站名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (value: any) => {
                return value === true ? <Tag color="green">运行中</Tag> : <Tag color="red">已停止</Tag>;
            }
        },
        {
            title: '备注',
            dataIndex: 'ps',
            key: 'ps',
        },
        {
            title: 'PHP',
            dataIndex: 'version',
            key: 'version',
        },
        {
            title: '域名',
            dataIndex: 'domain',
            key: 'domain',
            width: 100,
            render: (value: any) => {
                return <Select style={{ width: "100%" }} defaultValue={value[0]['id']}>{value.map((item: any, index: number) => <Option key={index} value={item.id}>{item.name}</Option>)}</Select>
            }
        }
    ];

    componentDidMount = async () => {
        const ipData = await Axios.get('http://127.0.0.1:83/bt/system/lists');
        this.getSiteList();
        // const { data } = await Axios.get('http://127.0.0.1:83/bt/domain/all');
        this.setState({
            ipList: ipData.data.data,
            ipListLoading: false,
        })
    }

    getSiteList = async (id: number | undefined = undefined) => {
        const domainData = await Axios.get('http://127.0.0.1:83/bt/domain/site', {
            params: {
                id: id === undefined ? "" : id
            }
        });
        this.setState({
            dataSource: domainData.data.data.map((item: any, index: number) => {
                const value: sourceInterface = {
                    key: index,
                    ip: '119.29.77.178',
                    name: item.name,
                    status: parseInt(item.status) === 1 ? true : false,
                    ps: item.ps,
                    version: item.php_version,
                    domain: item.domain
                };
                return value;
            })
        })
    }

    render = () => {
        return <>
            <div className="domain">
                <div className="search">
                    <Select
                        showSearch
                        loading={this.state.ipListLoading}
                        style={{ width: 200 }}
                        placeholder="选择IP"
                        optionFilterProp="children"
                        onChange={(e: number) => this.getSiteList(e)}
                    >
                        {(() => {
                            if (this.state.ipList !== undefined) {
                                return this.state.ipList.map((item: any, index: number) => {
                                    const text = item.ip + '----' + (item.status === 1 ? '运行中' : '无法访问');
                                    return <Option value={item.id} key={index}>{text}</Option>
                                });
                            }

                            return <></>
                        })()}
                    </Select>
                    <Search style={{ width: 200, marginLeft: 10 }} placeholder="input search text" enterButton />
                </div>
                <div className="list">
                    <Table dataSource={this.state.dataSource} columns={this.columns} />;
                </div>
            </div>
        </>
    }
}