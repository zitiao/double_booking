import { Layout, Menu, Icon } from 'antd';
import { Link } from 'umi';
import './index.css';

const { Header, Content, Footer, Sider } = Layout;

function BasicLayout(props) {
  return (
    <Layout>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Icon type="dashboard" />
            <span className="nav-text">
              <Link to='kanban'>
                看板
              </Link>
            </span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="book" />
            <span className="nav-text">
              <Link to='booking'>
                记账
              </Link>
            </span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          {props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}

export default BasicLayout;
