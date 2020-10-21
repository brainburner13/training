import React from "react";
import { Button, Layout, Menu, Avatar, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsAuth,
  selectCurrentUserLogin,
} from "../../Redux/Auth-selector";
import { logout } from "../../Redux/Auth-reducer";

const { Header } = Layout;

export type MapPropsType = {};

export const AppHeader: React.FC<MapPropsType> = (props) => {
  const isAuth = useSelector(selectIsAuth);
  const login = useSelector(selectCurrentUserLogin);

  const dispatch = useDispatch();

  const logoutCallback = () => {
    dispatch(logout());
  };

  return (
    <Header className="header">
      <div className="logo" />
      <Row>
        <Col span={18}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item key="1">
              <Link to="developers">Developers</Link>
            </Menu.Item>
          </Menu>
        </Col>

        {isAuth ? (
          <>
            <Col span={1}>
              <Avatar
                alt={login || ""}
                style={{ backgroundColor: "#87d068" }}
                icon={<UserOutlined />}
              />
            </Col>
            <Col span={5}>
              <Button onClick={logoutCallback}>Logout</Button>
            </Col>
          </>
        ) : (
          <Col span={6}>
            <Button>
              <Link to={"/login"}>Login</Link>
            </Button>
          </Col>
        )}
      </Row>
    </Header>
  );
};
