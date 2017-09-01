import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import LOGO from './assets/abc.jpg'

const MenuItemCreat  = (items) => {
        return items.map(function(item){
            if( item.items ){
                let title = <span>{item.icon ? (<Icon type={item.icon} />): ''}<span>{item.title}</span></span>;

                return  <Menu.SubMenu key={item.key} title={title}>
                          {
                            MenuItemCreat(item.items)
                          }
                        </Menu.SubMenu>
            } else {
                return  <Menu.Item key={item.key}>
                          <Link to={'/'+item.key}>{item.title}</Link>
                        </Menu.Item>
            }
        });
};

function Sider(props){
    return  <div className="sider" style={props.style}>

              <Menu defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark">
                {/* { MenuItemCreat(props.menu) } */}

                <div style={{ width: '100%', height: '59px', }}>
                  <img src={LOGO} style={{ width: '100%' }} />
                </div>

                <Menu.Item key="1">
                   <Link to={'/Feature1-1'}>
                    <Icon type="home" className="icons"/>
                   </Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to={'/Feature1-2'}>
                   <Icon type="setting" className="icons"/>
                  </Link>
                </Menu.Item>
              </Menu>
            </div>;
};

export default Sider;
