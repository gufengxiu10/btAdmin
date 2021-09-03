import React from "react";
import { Row, Col, Tabs, Table, Button, Tag, Tooltip } from "antd";
import "@/static/css/Index.scss";
import axios from "axios";
import moment from "moment";
const { TabPane } = Tabs;
export default class Index extends React.Component<any, any>{

    public state: {
        systemTableLoading: boolean;
        dataSource: Array<any>;
    }

    constructor(props: any) {
        super(props);
        this.state = {
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
            render: (value: number, row: any) => {
                return <>{moment.unix(value).format('YYYY-MM-DD HH:mm')}&nbsp;<Button size="small" type="primary" onClick={() => this.sync(row.id)}>同步</Button></>
            }
        },
        {
            title: '原因',
            dataIndex: 'reason_msg',
            key: 'reason_msg',
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
        const { data } = await axios.get('http://127.0.0.1:83/bt/system/ipList');
        this.setState({
            dataSource: data.data,
            systemTableLoading: false
        });
    }


    sync = async (id: number) => {
        const data = await axios.post('http://127.0.0.1:83/bt/system/sync', { id: id });
        console.log(data)
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
                        <Table dataSource={this.state.dataSource} columns={this.columns} loading={this.state.systemTableLoading} />;
                    </TabPane>
                    <TabPane tab="网站" key="2">
                        {/* <Table dataSource={this.dataSource} columns={this.columns} />; */}
                    </TabPane>
                </Tabs>
            </div>
        </>
    }
}