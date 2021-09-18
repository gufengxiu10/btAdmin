import React from "react";
import { Table, Input, Popconfirm, Modal, Button, Form, message } from "antd";
import "@/static/css/Domain.scss";
import Axios from 'axios'
import { sourceInterface, stateInterface, ModelInterface, paramsPostInterface } from "@/types/bt/System";
const { Search } = Input;
export default class index extends React.Component<any, any>{

    public state: stateInterface
    public addForm: any;
    public ModelForm: any;
    constructor(props: any) {
        super(props);
        this.state = {
            ipListLoading: true,
            dataSource: [],
            loading: {
                search: false
            },
            pagination: { current: 1, pageSize: 10, total: 0 },
            addModel: {
                okLoading: false,
                visible: false,
            }
        }

        this.addForm = React.createRef();
        this.ModelForm = React.createRef();
        this.onFinish = this.onFinish.bind(this);
        this.onModelVisible = this.onModelVisible.bind(this);
    }

    columns = [
        {
            title: 'IP',
            dataIndex: 'ip',
            key: 'ip',
            width: 200
        },
        {
            title: '系统',
            dataIndex: 'system',
            key: 'system'
        },
        // {
        //     title: '磁盘信息',
        //     dataIndex: 'system',
        //     key: 'system',
        //     width: 100,
        //     render: () => {
        //         return <div style={{ textAlign: "center" }}><Button type="primary" size="small">查看</Button></div>
        //     }
        // },
        {
            title: '版本',
            dataIndex: 'panel_version',
            key: 'panel_version',
            width: 100,
            // render: (value: any, row: any) => {
            //     return <></>
            //     return <>
            //         <Tooltip title={<>{row.update.status === true ? '' : '更新版本信息：\n'}{row.update.msg.updateMsg}</>} color="geekblue">
            //             <Tag color="processing" style={{ cursor: "pointer" }} >
            //                 {row.update.status === true ? <Badge dot offset={[7, -6]}>{value}</Badge> : value}
            //             </Tag>
            //         </Tooltip></>
            // }
        },
        {
            title: '操作',
            width: 150,
            dataIndex: 'id',
            key: 'id',
            render: (value: number, row: sourceInterface) => {
                // () => this.onModelVisible(row)
                return <><Button size="small" onClick={() => this.onModelVisible(row)} type="primary">编辑</Button>
                    <Popconfirm
                        title="是否删除当前服务器?"
                        onConfirm={() => this.onDelete(row)}
                        cancelText="取消"
                        okText="确定"
                    >
                        <Button type="primary" size="small" danger loading={row.deleteLoading}>删除</Button>
                    </Popconfirm></>
            }
        }
    ];

    componentDidMount = () => {
        this.getSiteList({ pageSize: 10 });
    }

    getSiteList = async (params: any = {}) => {
        this.setState({ ipListLoading: true })
        const data = await Axios.get('http://127.0.0.1:83/bt/system/lists', {
            params: {
                limit: params.pageSize,
                page: params.current,
            }
        });

        this.setState({
            ipListLoading: false,
            pagination: {
                current: data.data.current,
                pageSize: data.data.size,
                total: data.data.count,
            },
            dataSource: data.data.data.map((item: any, index: number) => {
                const value: sourceInterface = {
                    ip: item.ip,
                    key: index,
                    system: item.system,
                    id: item.id,
                    status: item.status,
                    panel_version: item.panel_version,
                    port: item.port,
                    ak: item.ak,
                    deleteLoading: false,
                    // update: item.update,
                    testing_time: item.testing_time,
                    mem_total: item.mem_total
                }
                return value;
            })
        })
    }

    onDelete = (row: sourceInterface) => {
        this.setState({
            dataSource: this.state.dataSource.map((item: sourceInterface) => {
                if (item.id === row.id) {
                    item.deleteLoading = true;
                }
                return item;
            })
        })

        setTimeout(() => {
            this.setState({
                dataSource: this.state.dataSource.filter((item: sourceInterface) => item.id === row.id ? false : true)
            })
            message.success('删除成功');
        }, 3000);
    }

    onModelVisible = (row: sourceInterface | null = null) => {
        let form: ModelInterface = { ip: undefined, port: undefined, ak: undefined, id: undefined };

        if (row !== null) {
            form.ip = row.ip;
            form.port = row.port;
            form.ak = row.ak;
            form.id = row.id
        }

        this.setState(Object.assign(this.state.addModel, {
            visible: true,
            form,
            title: row === null ? '添加服务器' : '编辑服务器',
            okText: row === null ? '添加' : '保存'
        }))

        this.ModelForm.current?.setFieldsValue(form);
    }

    onFinish = async (params: paramsPostInterface) => {
        console.log(params)
        this.setState(Object.assign(this.state.addModel, { okLoading: true }));
        let addModel: any = { okLoading: false, visible: false }
        if (params.id !== undefined) {
            message.success('更新成功');
        } else {
            message.success('更新成功');
        }

        this.setState({ addModel: Object.assign(this.state.addModel, addModel) })
        // setTimeout(() => this.setState({ addModel: Object.assign(this.state.addModel, addModel) }), 2000)
        // this.setState({ addModel: Object.assign(this.state.addModel, addModel) });
        // this.setState(Object.assign(this.state.addModel, { okLoading: true }));
        // const successData = await Axios.post('http://127.0.0.1:83/bt/system/add', params);
        // const sd = successData.data;
        // if (sd.code === 400) {
        //     message.error(sd.msg);
        // } else {
        //     this.setState({ addModel: Object.assign(this.state.addModel, { visible: true }) });
        //     message.success(sd.msg);
        // }

        // this.setState({ addModel: Object.assign(this.state.addModel, { okLoading: false }) });

    };

    search = () => {
        this.setState({
            loading: {
                search: true
            }
        })

        setTimeout(() => {
            this.setState({
                loading: {
                    search: false
                }
            })
        }, 3000)
    }

    render = () => {
        return <>
            <div className="domain">
                <div className="search">
                    <Button type="primary" onClick={() => this.onModelVisible()}>添加</Button>
                    &nbsp;&nbsp;
                    <Search placeholder="请输入查找的IP" loading={this.state.loading.search} style={{ width: 300 }} onSearch={() => this.search()} />
                </div>
                <div className="list">
                    <Table dataSource={this.state.dataSource} columns={this.columns} pagination={this.state.pagination} onChange={(pagination) => this.getSiteList(pagination)} loading={this.state.ipListLoading} />;
                </div>
                <div className="model">
                    <Modal title={this.state.addModel.title}
                        visible={this.state.addModel.visible}
                        onOk={() => this.addForm.current.click()} okButtonProps={{ loading: this.state.addModel.okLoading }}
                        onCancel={() => this.setState({ addModel: Object.assign(this.state.addModel, { visible: false }) })}
                        okText={this.state.addModel.okText}
                        cancelText="取消"
                    >
                        <Form ref={this.ModelForm} labelCol={{ span: 4 }} onFinish={this.onFinish} initialValues={this.state.addModel.form} >
                            <Form.Item name="ip" label="IP" rules={[{ required: true, message: 'IP不能为空' }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                            <Form.Item name="port" label="端口" rules={[{ required: true, message: '端口不能为空' }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                            <Form.Item name="ak" label="密钥" rules={[{ required: true, message: '密钥不能为空' }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                            <Form.Item style={{ display: "none" }} name="id">
                                <Button type="primary" htmlType="submit" ref={this.addForm}>Log in</Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </div>
        </>
    }
}