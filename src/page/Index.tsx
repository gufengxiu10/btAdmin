import React from "react";
import { Row, Col, Tabs, Table, Button, Tag, Tooltip } from "antd";
import "@/static/css/Index.scss";
import axios from "axios";
import moment from "moment";
import { CaretRightOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;
export default class Index extends React.Component<any, any>{

    public state: {
        systemTableLoading: boolean;
        dataSource: Array<any>;
        testingTimeButtonLoading: any
    }

    constructor(props: any) {
        super(props);
        this.state = {
            testingTimeButtonLoading: {},
            systemTableLoading: true,
            dataSource: []
        }
    }

    columns = [
        {
            title: 'IP',
            dataIndex: 'ip',
            key: 'ip',
        },
        {
            title: '最后同步时间',
            dataIndex: 'testing_time',
            key: 'testing_time',
            width: 200,
            align: 'center' as 'center',
            render: (value: number, row: any) => <><div style={{ textAlign: 'center' }}>{moment.unix(value).format('YYYY-MM-DD HH:mm')}&nbsp;<Button icon={<CaretRightOutlined />} size="small" type="primary" loading={this.state.testingTimeButtonLoading[row.id] === undefined ? false : this.state.testingTimeButtonLoading[row.id]} onClick={() => this.sync(row.id)}>同步</Button></div></>

        },
        {
            title: '原因',
            dataIndex: 'reason_msg',
            key: 'reason_msg',
            width: 100,
            align: 'center' as 'center',
            render: (value: string, row: any) => {
                if (row.reason_status === 1) {
                    return <Tag color="green">成功</Tag>
                } else {
                    return <Tooltip title={value} color="red" style={{ cursor: "pointer" }}><Tag color="red">失败</Tag></Tooltip>
                }
            }
        }
    ];

    componentDidMount = async () => {
        this.list();
    }

    list = async () => {
        const { data } = await axios.get('http://127.0.0.1:83/bt/system/ipList');
        this.setState({
            dataSource: data.data,
            systemTableLoading: false
        });
    }

    sync = async (id: number) => {
        let loading: any = {};
        loading[id] = true;
        this.setState({
            testingTimeButtonLoading: Object.assign(this.state.testingTimeButtonLoading, loading)
        })
        const data = await axios.post('http://127.0.0.1:83/bt/system/sync?time', { id: id });
        console.log(data)
        loading[id] = false;
        this.setState({
            testingTimeButtonLoading: Object.assign(this.state.testingTimeButtonLoading, loading)
        })

        this.list();
    }

    render = () => {
        return <>
            <div className="card">
                <Row gutter={16}>
                    <Col span={12} >
                        <div className="card-item">
                            <div className="title">服务器数</div>
                            <div className="con">
                                50
                            </div>
                        </div>
                    </Col>
                    <Col span={12} >
                        <div className="card-item">
                            <div className="title">网站总数</div>
                            <div className="con">
                                160
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="list">
                <Tabs defaultActiveKey="1" >
                    <TabPane tab="服务器" key="1">
                        <Table dataSource={this.state.dataSource} columns={this.columns} loading={this.state.systemTableLoading} bordered />;
                    </TabPane>
                    <TabPane tab="网站" key="2">
                        {/* <Table dataSource={this.dataSource} columns={this.columns} />; */}
                    </TabPane>
                </Tabs>
            </div>
        </>
    }
}