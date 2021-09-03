import React from "react";
import { Table, Input, Badge, Tag, Tooltip, Modal, Row, Col, Button, Form, message } from "antd";
import "@/static/css/Domain.scss";
import Axios from 'axios'
import { Pie } from '@ant-design/charts';
interface sourceInterface {
    key: number;
    ip: string;
    system: string;
    id: number;
    mem_total: number;
    panel_version: string;
    status: number;
    testing_time: null | number;
    update: {
        status: boolean;
        msg: any
    };
}

interface stateInterface {
    ipList?: Array<any>,
    ipListLoading: boolean,
    dataSource: Array<sourceInterface>,
    addModel: {
        okLoading: boolean;
        visible: boolean;
    }
}

export default class Index extends React.Component<any, any>{

    public state: stateInterface
    public addForm: any;

    constructor(props: any) {
        super(props);
        this.state = {
            ipListLoading: true,
            dataSource: [],
            addModel: {
                okLoading: false,
                visible: false
            }
        }
        this.addForm = React.createRef();
        this.onFinish = this.onFinish.bind(this);
    }

    columns = [
        {
            title: 'IP',
            dataIndex: 'ip',
            key: 'ip',
        },
        {
            title: '系统',
            dataIndex: 'system',
            key: 'system'
        },
        {
            title: '磁盘信息',
            dataIndex: 'system',
            key: 'system',
            width: 100,
            render: () => {
                return <div style={{ textAlign: "center" }}><Button type="primary" size="small">查看</Button></div>
            }
        },
        {
            title: '版本',
            dataIndex: 'panel_version',
            key: 'panel_version',
            width: 100,
            render: (value: any, row: any) => {
                return <>
                    <Tooltip title={<>{row.update.status === true ? '' : '更新版本信息：\n'}{row.update.msg.updateMsg}</>} color="geekblue">
                        <Tag color="processing" style={{ cursor: "pointer" }} >
                            {row.update.status === true ? <Badge dot offset={[7, -6]}>{value}</Badge> : value}
                        </Tag>
                    </Tooltip></>
            }
        }
    ];

    DemoPie = (source: any = []) => {
        var data = [
            {
                type: '分类一',
                value: 27,
            },
            {
                type: '分类二',
                value: 25,
            },
            {
                type: '分类三',
                value: 18,
            },
            {
                type: '分类四',
                value: 15,
            },
            {
                type: '分类五',
                value: 10,
            },
            {
                type: '其他',
                value: 5,
            },
        ];
        var config = {
            appendPadding: 10,
            data: data,
            angleField: 'value',
            colorField: 'type',
            radius: 0.9,
            legend: false,
            label: {
                type: 'inner',
                offset: '-30%',
                content: function content(_ref: any) {
                    var percent = _ref.percent;
                    return ''.concat((percent * 100).toFixed(0), '%');
                },
                style: {
                    fontSize: 14,
                    textAlign: 'center',
                },
            },
        };
        return <Pie {...config} />;
    };

    componentDidMount = async () => {
        const data = await Axios.get('http://127.0.0.1:83/bt/system/lists');
        this.setState({
            ipListLoading: false,
            dataSource: data.data.data.map((item: any, index: number) => {
                const value: sourceInterface = {
                    ip: item.ip,
                    key: index,
                    system: item.system,
                    id: item.id,
                    status: item.status,
                    panel_version: item.panel_version,
                    update: item.update,
                    testing_time: item.testing_time,
                    mem_total: item.mem_total
                }
                return value;
            })
        })
    }

    getSiteList = async (id: number | undefined = undefined) => {

    }

    onFinish = async (params: any) => {
        this.setState(Object.assign(this.state.addModel, { okLoading: true }));
        const successData = await Axios.post('http://127.0.0.1:83/bt/system/add', params);
        const sd = successData.data;
        if (sd.code === 400) {
            message.error(sd.msg);
        } else {
            this.setState({ addModel: Object.assign(this.state.addModel, { visible: true }) });
            message.success(sd.msg);
        }

        this.setState({ addModel: Object.assign(this.state.addModel, { okLoading: false }) });

    };
    render = () => {
        return <>
            <div className="domain">
                <div className="search">
                    <Button type="primary" onClick={() => { this.setState({ addModel: Object.assign(this.state.addModel, { visible: true }) }) }}>添加</Button>
                    {/* <Search style={{ width: 200, marginLeft: 10 }} placeholder="input search text" enterButton /> */}
                </div>
                <div className="list">
                    <Table dataSource={this.state.dataSource} columns={this.columns} />;
                    <Modal title="Basic Modal" visible={false} width={800}>
                        <Row>
                            <Col span={8}>{this.DemoPie()}</Col>
                            <Col span={8}>{this.DemoPie()}</Col>
                            <Col span={8}>{this.DemoPie()}</Col>
                        </Row>
                    </Modal>
                </div>
                <div className="model">
                    <Modal title="添加服务器"
                        visible={this.state.addModel.visible}
                        onOk={() => this.addForm.current.click()} okButtonProps={{ loading: this.state.addModel.okLoading }}
                        onCancel={() => this.setState({ addModel: Object.assign(this.state.addModel, { visible: false }) })}
                        okText="添加"
                        cancelText="取消"
                    >
                        <Form labelCol={{ span: 4 }} onFinish={this.onFinish} >
                            <Form.Item name="ip" label="IP" rules={[{ required: true, message: 'IP不能为空' }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                            <Form.Item name="port" label="端口" rules={[{ required: true, message: '端口不能为空' }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                            <Form.Item name="ak" label="密钥" rules={[{ required: true, message: '密钥不能为空' }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                            <Form.Item style={{ display: "none" }}>
                                <Button type="primary" htmlType="submit" ref={this.addForm}>Log in</Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </div>
        </>
    }
}