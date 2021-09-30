import React from "react";
import "@/static/css/blog/cate.scss";
import { Input, Space, Table, PageHeader, Button, Popconfirm, message, Form } from 'antd';
import ModalFrom from "@/components/modal/ModalForm"
export default class index extends React.Component<any, any>{

    public state: any;
    formSubmitRef: any;
    formRef: any;

    constructor(props: any) {
        super(props);
        this.state = {
            model: {
                visible: false,
                okLoading: false,
                title: '编辑',
                cancelText: '取消',
                okText: '保存',
                default: {
                    name: '123'
                },
            },
            table: {
                deleteButton: false,
                selectedRowKeys: [],
                data: [
                    {
                        key: 1,
                        name: 'John Brown',
                        age: 32,
                        address: 'New York No. 1 Lake Park',
                    }
                ]
            }
        }

        this.formSubmitRef = React.createRef();
        this.formRef = React.createRef();
        this.tableDeleteButton = this.tableDeleteButton.bind(this);
        this.formFinish = this.formFinish.bind(this);
        this.modelVisible = this.modelVisible.bind(this);
    }

    componentDidMount = () => {
        let data: any = [];
        const { table } = this.state;
        for (let i = 0; i < 10; i++) {
            data.push({
                key: i,
                name: 'John Brown' + i,
                age: 32,
                address: 'New York No. 1 Lake Park',
                loading: false,
            });
        }

        this.setState({
            table: Object.assign(table, { data: data })
        })
    }

    modelVisible = (row: any = {}) => {
        let model = Object.assign(this.state.model, {
            visible: true,
            title: '添加',
            okLoading: false,
            default: {
                name: ""
            }
        })

        if (Object.keys(row).length > 0) {
            model.default.name = row.name
            model.title = '编辑'
            model.default.id = row.key
        }

        this.setState({ model: model });

    }

    onSelectChange = (selectedRowKeys: any) => {
        this.setState({ table: Object.assign(this.state.table, { selectedRowKeys, deleteButton: selectedRowKeys.length > 0 ? true : false }) });
    };

    tableDeleteButton = () => {
        this.setState({
            table: {
                selectedRowKeys: [],
                deleteButton: false,
                data: this.state.table.data.filter((item: any) => this.state.table.selectedRowKeys.indexOf(item.key) !== -1 ? false : true)
            }
        })
    }

    formFinish = (param: any) => {
        console.log(param)
        setTimeout(() => {
            let { table } = this.state
            table.data.push({ key: table.data.length + 1, name: param.name, age: 32, address: 'London No. 2 Lake Park' });
            this.setState({
                table: Object.assign(table, {
                    data: table.data.map((item: any) => {
                        item.key = (item.key + Date.now())
                        return item;
                    })
                }),
                model: {
                    visible: false,
                    okLoading: false,
                }
            });
        }, 2000);
    }

    formChange = () => {

    }

    formRowDangerDel = (row: any) => {
        const { table } = this.state;
        this.setState({
            table: Object.assign(table, {
                data: table.data.map((item: any) => {
                    if (item.key === row.key) {
                        item.loading = true;
                    }
                    return item;
                })
            })
        })

        setTimeout(() => {
            this.setState({
                table: Object.assign(table, {
                    data: table.data.filter((item: any) => item.key === row.key ? false : true)
                })
            })
            message.success('删除成功');
        }, 2000);
    }

    render = () => {
        const columns = [
            {
                title: '分类名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '创建时间',
                dataIndex: 'address',
                key: 'address',
                width: 300,
            },
            {
                title: '操作',
                dataIndex: 'address',
                key: 'address',
                width: 150,
                render: (value: any, row: any) => {
                    return <Button.Group>
                        <Button size="small" type="primary" onClick={() => this.modelVisible(row)}>编辑</Button>
                        <Popconfirm title="是否要删除当前选项?" onConfirm={() => this.formRowDangerDel(row)}>
                            <Button size="small" type="primary" danger loading={row.loading} >删除</Button>
                        </Popconfirm>
                    </Button.Group>
                }
            }
        ];

        const { table } = this.state;
        const rowSelection = {
            selectedRowKeys: table.selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return <>
            <div>
                <div className="layout-content-header">
                    <PageHeader
                        className="site-page-header"
                        title="标签管理"
                    />
                </div>
                <div className="layout-content-padding">
                    <div className="table">
                        <div className="action">
                            <div>
                                <Space>
                                    <Button type="primary" onClick={() => this.modelVisible()}>新建</Button>
                                    <Popconfirm title="是否删除指定分类？" onConfirm={this.tableDeleteButton} okText="确定" cancelText="取消">
                                        <Button type="primary" danger style={{ display: this.state.table.deleteButton === true ? "block" : "none" }}>删除</Button>
                                    </Popconfirm>
                                </Space>
                            </div>
                        </div>
                        <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.table.data} />
                        <ModalFrom {...this.state.model} finish={this.formFinish} loading={true}>
                            <Form.Item name="name" label="分类名" rules={[{ required: true, message: '分类名不能为空' }]}>
                                <Input autoComplete="off" />
                            </Form.Item>
                            <Form.Item name="id" style={{ display: 'none' }}>
                                <Input autoComplete="off" />
                            </Form.Item>
                        </ModalFrom>
                    </div>
                </div>
            </div>
        </>
    }
}