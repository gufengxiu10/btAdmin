import React from "react";
import { Menu } from "antd";
import "@/static/css/layout/Sider.scss";
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom"
const { SubMenu } = Menu;
export default class Sider extends React.Component<any, any>{
    public state: any;
    constructor(props: any) {
        super(props);
        this.state = {
            theme: 'dark',
            current: '1',
        };
    }


    changeTheme = (value: any) => {
        this.setState({
            theme: value ? 'dark' : 'light',
        });
    };

    handleClick = (e: any) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    render = () => {
        return <>
            <Menu
                theme={this.state.theme}
                onClick={this.handleClick}
                defaultOpenKeys={['sub1']}
                selectedKeys={[this.state.current]}
                mode="inline"
            >
                <SubMenu key="sub1" icon={<MailOutlined />} title="宝塔管理">
                    <Menu.Item key="1">
                        <Link to="/bt/index">
                            信息
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/bt/system">
                            服务管理
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/bt/domain">
                            网站管理
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                    <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                </SubMenu>
                <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <Menu.Item key="11">Option 11</Menu.Item>
                    <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
                <SubMenu key="sub5" icon={<SettingOutlined />} title="Navigation Three">
                    <Menu.Item key="13">Option 9</Menu.Item>
                    <Menu.Item key="14">Option 10</Menu.Item>
                    <Menu.Item key="15">Option 11</Menu.Item>
                    <Menu.Item key="16">Option 12</Menu.Item>
                </SubMenu>
            </Menu>
        </>
    }
}