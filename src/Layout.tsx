import React from "react";
import '@/static/css/layout/Layout.scss';
import LayoutSider from '@/layout/Sider';
import Domain from "@/page/Domain"
import { mysql as BtMysql, system as BtSystem, base as BtBase } from "@/page/bt"
import { index as BlogIndex, cate as BlogCate, label as BlogLabe } from "@/page/blog"
import { Index as GalleryList } from "@/page/gallery";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
const { System: BtSystemMain, SystemEdit: BtSystemEdit } = BtSystem;
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
                                <Route path="/blog/list">
                                    <BlogIndex />
                                </Route>
                                <Route path="/blog/cate">
                                    <BlogCate />
                                </Route>
                                <Route path="/blog/label">
                                    <BlogLabe />
                                </Route>
                                <Route path="/bt/index">
                                    <BtBase />
                                </Route>
                                <Route path="/bt/domain">
                                    <Domain />
                                </Route>
                                <Route path="/bt/system">
                                    <BtSystemMain />
                                </Route>
                                <Route path="/bt/mysql">
                                    <BtMysql />
                                </Route>
                                <Route path="/bt/system/:id">
                                    <BtSystemEdit />
                                </Route>
                                <Route path="/gallery/list">
                                    <GalleryList />
                                </Route>
                            </Switch>
                        </Content>
                    </Layout>

                </Layout>
            </Router>
        </>
    }
}