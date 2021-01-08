import React, { Component, useState } from 'react';
import { Layout, Menu, Icon } from 'antd';
import AddForm from '../pages/order-manage/page_add';
import ModifyForm from '../pages/order-manage/page_modify';

import OrderTable from '../pages/order-manage/page_order';
import { Switch, Route, NavLink } from 'react-router-dom';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LaptopOutlined,
} from '@ant-design/icons';
const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

export default (props) => {
  let [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          inlineCollapsed={collapsed}
          subMenuCloseDelay={0}
        >
          <SubMenu
            key="sub1"
            icon={<LaptopOutlined />}
            title={
              <span>
                <span>OMS订单系统</span>
              </span>
            }
          >
            <Menu.Item key="1">
              <NavLink to="/manage/send">发货管理</NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink to="/manage/order">订单管理</NavLink>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ background: '#eee', padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            },
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            // margin: '24px 16px',
            padding: 24,
            minHeight: '98vh',
          }}
        >
          <Switch>
            <Route path="/manage/order/single/add" component={AddForm} />
            <Route path="/manage/order/single/modify" component={ModifyForm} />
            <Route path="/manage/order" component={OrderTable} />
          </Switch>
        </Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  );
};
