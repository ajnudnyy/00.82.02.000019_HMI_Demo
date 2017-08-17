import React, { Componnet } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'dva';
import { Link } from 'dva/router';
import config from '../config';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Sider from '../components/sider/Sider';
import Main from '../components/main/Main';
import Login from '../components/login/Login';

//const components = config.main.components;
const headerInfo = {
    ...config.header,
    name: config.userInfo.name,
    aver: config.userInfo.aver
}

const siderInfo = { ...config.sider };

const mainInfo = {
    style: config.sider.style
}

const IndexInfo = {
    permission: config.userInfo.permission,
    loginUrl: config.userInfo.loginUrl
}

const App = (props) => {

        let featureId = props.params.FeatureId || config.sider.selectedKey;

        let featureInfo = {
            featureId: featureId,
            params: props.params.params,
            feature: config.main.components[featureId].component,
            title: config.main.components[featureId].title,
        }

        if (IndexInfo.permission) {
            return  <div style={{height: '100%'}}>
                      <Sider {...siderInfo} selectedKey={featureId}/>
                      <Header {...headerInfo}/>
                      <Main {...mainInfo} {...featureInfo}/>
                      <Footer />
                    </div>
        } else {
            return  <div className="nopermission">
                        <Login loginUrl={IndexInfo.loginUrl}/>
                    </div>
        }
}

export default App;
