import React, { ComponentType } from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Breadcrumb, Avatar, Row, Col } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import "./App.css";
import { AppHeader } from "./components/Header/Header";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {
  BrowserRouter,
  Route,
  Switch,
  withRouter,
  Redirect,
  Link,
} from "react-router-dom";
import { UsersPage } from "./components/Users/UsersContainer";
import { LoginPage } from "./components/Login/Login";
import { connect } from "react-redux";
import { initializApp } from "./Redux/App-reducer";
import { compose } from "redux";
import Preloader from "./components/Common/Preloader/Preloader";
import { Provider } from "react-redux";
import store, { AppStateType } from "./Redux/Redux-store";
import { WithSuspense } from "./hoc/withSuspense";

const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

const ProfileContainer = React.lazy(
  () => import("./components/Profile/ProfileContainer")
);
const DialogsContainer = React.lazy(
  () => import("./components/Dialogs/DialogsContainer")
);
const ChatPage = React.lazy(
  () => import("./pages/Chat/ChatPage")
);

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initializApp: () => void;
};

const SuspendedProfile = WithSuspense(ProfileContainer);
const SuspendedDialogs = WithSuspense(DialogsContainer);
const SuspendedChatPage = WithSuspense(ChatPage);

class App extends React.Component<MapPropsType & DispatchPropsType> {
  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    alert("Some error occured");
  };

  componentDidMount() {
    this.props.initializApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  componentWillUnmount() {
    window.removeEventListener(
      "unhandledrejection",
      this.catchAllUnhandledErrors
    );
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Layout>
          <AppHeader />
          <Content style={{ padding: "0 50px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Layout
              className="site-layout-background"
              style={{ padding: "24px 0" }}
            >
              <Sider className="site-layout-background" width={200}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  style={{ height: "100%" }}
                >
                  <SubMenu
                    key="sub1"
                    icon={<UserOutlined />}
                    title="My Profile"
                  >
                    <Menu.Item key="1">
                      <Link to="profile">Profile</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                      <Link to="dialogs">Messages</Link>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub2"
                    icon={<LaptopOutlined />}
                    title="Developers"
                  >
                    <Menu.Item key="5">
                      <Link to="developers">Users</Link>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub3"
                    icon={<NotificationOutlined />}
                    title="Any"
                  >
                    <Menu.Item key="9">
                      <Link to="chat">Chat</Link>
                    </Menu.Item>
                    <Menu.Item key="10">
                      <Link to="news">News</Link>
                    </Menu.Item>
                    <Menu.Item key="11">
                      <Link to="music">Music</Link>
                    </Menu.Item>
                    <Menu.Item key="12">
                      <Link to="settings">Settings</Link>
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <Content style={{ padding: "0 24px", minHeight: 280 }}>
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => <Redirect to={"/profile"} />}
                  />
                  <Route
                    path="/profile:userId?"
                    render={() => <SuspendedProfile />}
                  />
                  <Route path="/dialogs" render={() => <SuspendedDialogs />} />
                  <Route
                    path="/developers"
                    render={() => <UsersPage pageTitle={"Users"} />}
                  />
                  <Route path="/news" render={() => <News />} />
                  <Route path="/music" render={() => <Music />} />
                  <Route path="/settings" render={() => <Settings />} />
                  <Route path="/login" render={() => <LoginPage />} />
                  <Route path="/chat" render={() => <SuspendedChatPage />} />
                  <Route path="*" render={() => <div>404 NOT FOUND</div>} />
                </Switch>
              </Content>
            </Layout>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
});

let AppContainer = compose<ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializApp })
)(App);

const MyApp: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default MyApp;
