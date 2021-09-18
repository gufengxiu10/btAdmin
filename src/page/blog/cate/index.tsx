import React from "react";
import "@/static/css/blog/cate.scss";
import { Input, Space, Table, PageHeader, Button, Popconfirm, Modal, Form } from 'antd';
const { Search } = Input
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
                default: {
                    name: ''
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
                    },
                    {
                        key: 2,
                        name: 'Joe Black',
                        age: 42,
                        address: 'London No. 1 Lake Park',
                    },
                    {
                        key: 3,
                        name: 'Jim Green',
                        age: 32,
                        address: 'Sidney No. 1 Lake Park',
                    },
                    {
                        key: 4,
                        name: 'Jim Red',
                        age: 32,
                        address: 'London No. 2 Lake Park',
                    },
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
    }

    modelVisible = (row: any = {}) => {
        const model = {
            visible: true,
            okLoading: false,
            default: {
                name: ""
            }
        }

        if (Object.keys(row).length === 0) {
        } else {
        }

        this.formRef.current?.setFieldsValue(model.default);
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

    modelOk = () => {
        this.formSubmitRef.current.click();
    }

    formFinish = (param: any) => {
        this.setState((state: any, props: any) => {
            return Object.assign(state, {
                model: {
                    visible: true,
                    okLoading: true,
                }
            })
        }, () => {
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
            console.log(this.state)
        })
    }

    formChange = () => {

    }

    render = () => {
        const columns = [
            {
                title: '分类名',
                dataIndex: 'name',
                key: 'name',
                width: '30%',
            },
            {
                title: '创建时间',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '操作',
                dataIndex: 'address',
                key: 'address',
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
                        title="分类管理"
                    />
                </div>
                <div className="layout-content-padding">
                    <div className="search">
                        <div>
                            <Space>
                                <Search
                                    placeholder="input search text"
                                    allowClear
                                    enterButton="Search"
                                />
                            </Space>
                        </div>
                    </div>
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
                        <Modal visible={this.state.model.visible} title="新建" okButtonProps={{ loading: this.state.model.okLoading }} onOk={this.modelOk}>
                            <Form
                                autoComplete="off"
                                onFinish={this.formFinish}
                                initialValues={this.state.model.default}
                                ref={this.formRef}
                            >
                                <Form.Item name="name" label="分类名" rules={[{ required: true, message: '分类名不能为空' }]}><Input autoComplete="off" /></Form.Item>
                                <Button type="primary" style={{ display: 'none' }} htmlType="submit" ref={this.formSubmitRef}>Submit</Button>
                            </Form>
                        </Modal>
                    </div>
                </div>
            </div>
        </>
    }
}