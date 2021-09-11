import React from "react";
import '@/static/css/layout/Layout.scss';
import LayoutSider from '@/layout/Sider';
import Index from "@/page/Index";
import Domain from "@/page/Domain"
import BtSystem from "@/page/System"
import { mysql as BtMysql } from "@/page/bt"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
const { Header, Sider, Content } = Layout;

export default class BaseLayout extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {}
    }

    render = () => {
        return <>
            <Router>
                <Layout id="layout">

                    <Header id="layout-header">123</Header>
                    <Layout id="layout-body">
                        <Sider id="layout-sider"><LayoutSider /></Sider>
                        <Content id="layout-content">
                            <Switch>
                                <Route path="/bt/index">
                                    <Index />
                                </Route>
                                <Route path="/bt/domain">
                                    <Domain />
                                </Route>
                                <Route path="/bt/system">
                                    <BtSystem />
                                </Route>
                                <Route path="/bt/mysql">
                                    <BtMysql />
                                </Route>
                            </Switch>
                        </Content>
                    </Layout>

                </Layout>
            </Router>
        </>
    }
}