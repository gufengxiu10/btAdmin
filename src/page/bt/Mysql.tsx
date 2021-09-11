import React from "react";
import { Select, Table, Input, Button, Progress, message } from "antd";
import "@/static/css/Domain.scss";
import Axios from 'axios'
const { Search } = Input;
const { Option } = Select;

interface sourceInterface {
    key: number;
    name: string;
    username: string;
    password: string;
    id: number;
    ps: string;
    accept: string;
    backup_count: number;
    add_time: number;
    create_time: number;
    update_time: number;
}

interface stateInterface {
    ipList?: Array<any>,
    ipListLoading: boolean,
    dataSource: Array<sourceInterface>
}

export default class Mysql extends React.Component<any, any>{

    public state: any

    constructor(props: any) {
        super(props);
        this.state = {
            ipListLoading: true,
            timeId: undefined,
            dataSource: [],
            buttonMove: [],
        }

        this.move = this.move.bind(this)
    }

    columns = [
        {
            title: '数据库名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '用户名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '迁移',
            dataIndex: 'id',
            key: 'id',
            width: 200,
            render: (value: number) => {
                const info = this.state.buttonMove.find((item: any) => item.id === value);
                return <><div>
                    <Button onClick={() => this.move(value)} style={{ display: info === undefined ? "block" : info.display }} >{info === undefined ? '迁移' : info.title}</Button>
                    <Progress percent={info === undefined ? 0 : info.percent} style={{ display: info === undefined ? "none" : info.ProgressDisplay }} />
                </div></>
            }
        }
    ];

    componentDidMount = async () => {
        this.getSiteList();
        const domainData = await Axios.get('http://127.0.0.1:83/bt/mysql/moveSync');
        const data = domainData.data.data;
        if (data.length > 0) {
            let buttonMove = this.state.buttonMove;
            data.forEach((item: any, index: number) => {
                buttonMove.push({
                    id: item.id,
                    display: item.status > -1 ? 'none' : 'black',
                    percent: 0,
                    title: item.status > -1 ? '迁移中' : '迁移',
                    ProgressDisplay: item.status > -1 ? 'black' : 'none',
                    done: item.status > -1 ? 'do' : 'compose',
                    status: item.status,
                })
            })

            this.setState({ buttonMove })
        }
        this.moveSyncTime();
    }

    getSiteList = async (id: number | undefined = undefined) => {
        const domainData = await Axios.get('http://127.0.0.1:83/bt/mysql/lists');
        this.setState({
            dataSource: domainData.data.data.map((item: any, index: number) => {
                const value: sourceInterface = {
                    key: index,
                    name: item.name,
                    username: item.username,
                    password: item.password,
                    id: item.id,
                    ps: item.ps,
                    accept: item.accept,
                    backup_count: item.backup_count,
                    add_time: item.add_time,
                    create_time: item.create_time,
                    update_time: item.update
                };
                return value;
            })
        })
    }

    moveSyncTime = () => {
        if (this.state.timeId !== undefined) {
            return;
        }
        this.setState({
            timeId: setInterval(async () => {

                if (this.state.buttonMove.filter((item: any) => item.status >= 0).length === 0) {
                    clearInterval(this.state.timeId);
                    this.setState({ timeId: undefined })
                }

                let buttonMove = this.state.buttonMove;
                const domainData = await Axios.get('http://127.0.0.1:83/bt/mysql/moveSync');
                const data = domainData.data.data
                data.forEach((item: any) => {
                    buttonMove.map((value: any, index: number) => {
                        if (value.id === item.id && value.done === 'do') {
                            if (value.percent >= 100) {
                                value.display = 'block';
                                value.ProgressDisplay = 'none';
                                value.title = "迁移完成";
                                value.done = 'wait';
                                value.status = item.status
                                setTimeout(() => {
                                    this.setState((state: any, props: any) => {
                                        return {
                                            buttonMove: state.buttonMove.map((item: any) => {
                                                if (item.id === value.id) {
                                                    value.done = 'compose';
                                                    return value;
                                                }
                                                return item;
                                            })
                                        }
                                    })
                                }, 3000);
                                return value;
                            }
                            value.percent = Math.floor(item.current / item.count * 100);
                        }

                        return value;
                    });
                });

                buttonMove = buttonMove.filter((value: any) => {
                    if (value.done === 'compose') {
                        return false;
                    }
                    return true;
                })

                this.setState({
                    buttonMove: buttonMove
                })
            }, 1000)
        })
    }

    move = async (id: number) => {
        const response = await Axios.post('http://127.0.0.1:83/bt/mysql/move', { id });
        if (response.data.code === 400) {
            message.error(response.data.msg);
            return;
        }

        let buttonMove = this.state.buttonMove;
        buttonMove.push({
            id: id,
            display: 'none',
            percent: 0,
            title: '迁移中',
            ProgressDisplay: 'block',
            done: 'do',
            status: 0,
        })

        this.setState({ buttonMove })
        this.moveSyncTime();
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
                    <Table dataSource={this.state.dataSource} columns={this.columns} bordered />;
                </div>
            </div>
        </>
    }
}