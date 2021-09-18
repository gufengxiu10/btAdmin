import React from "react";
import "@/static/css/blog/index.scss";
import { Typography, Tag, Button, Spin, Space } from 'antd';
import myImg from '@/static/images/wallhaven-g828k3.jpg';

const { Title } = Typography;
export default class index extends React.Component<any, any>{

    public state: any;
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

    }

    componentDidMount = () => {
        let data = [];
        for (let i = 0; i < 10; i++) {
            data.push({ title: '标题', key: i, loading: true, url: "https://w.wallhaven.cc/full/72/wallhaven-72rxqo.jpg", imgLoading: false })
        }
        fetch("../../images/wallhaven-g828k3.jpg").then((response: any) => {
            console.log(response)
        })
        this.setState({ dataSource: data });
    }

    render = () => {

        return <>
            <div >
                <div className="search">
                    <div>
                        <Space>
                            <div><Button type="primary">搜索</Button></div>
                        </Space>
                    </div>
                    <div><Button type="primary">添加</Button></div>
                </div>
                <div className="item-group">
                    {this.state.dataSource.map((item: any) => {
                        return <div className="item" key={item.key}>
                            <div className="item-img">
                                <div className="loading">
                                    <Spin tip="Loading..." spinning={item.imgLoading}>
                                        <div className="img" style={{ width: "100%", height: 200, background: "url(" + myImg + ")", backgroundSize: 'cover' }} ></div>
                                    </Spin>,
                                </div>
                                <div></div>
                            </div>
                            <div className="item-content">
                                <div className="item-content-title"><Title level={3}>标题</Title></div>
                                <div className="item-content-tag">
                                    <span>时间：2020-20-20</span>
                                    &nbsp;
                                    &nbsp;
                                    <span>分类：
                                        <Tag color="magenta">magenta</Tag>
                                        <Tag color="magenta">magenta</Tag>
                                        <Tag color="magenta">magenta</Tag>
                                    </span>
                                    <span>分类：
                                        <Tag color="magenta">magenta</Tag>
                                        <Tag color="magenta">magenta</Tag>
                                        <Tag color="magenta">magenta</Tag>
                                    </span>
                                </div>
                                <div className="item-content-desc">
                                    描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述
                                </div>
                                <div className="item-content-action">
                                    <Button.Group>
                                        <Button type="primary">编辑</Button>
                                    </Button.Group>
                                </div>
                            </div>
                        </div>
                    })}

                </div>
            </div>
        </>
    }
}