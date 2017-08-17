import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'

import {
  Grid,
  Clearfix,
  ProgressBar,
  Popover,
  OverlayTrigger,
  popoverBottom,
  Label
} from 'react-bootstrap'

import {
  Button,
  Tabs,
  Icon,
  Row,
  Col,
  Tag,
  Progress,
  Table,
  Layout,
  Card
} from 'antd'
import { Link } from 'dva/router';
import ReactSVG from 'react-svg'

import jxs from './assets/jxs.jpg'
import mtptcll from './assets/mtptcll.svg'

const { Sider } = Layout;

export default class Manipulator extends Component {

  constructor(props) {
    super(props)
    this.state = {
      values: [96, 2, 2],
      uMID: '',
      uDateTime64_UTC: '',
      strMoldName: '',
      nProductCount: '',
      nSuccessRate: '',
      nFailedRate: '',
      uEstimateFinishDateTime64_UTC: '',
      nOneTimeProductCount: '',
      nPopCount: 32,
      nFetchCount: '',
      arrForceInSignal: [],
      arrForceOutSignal: []
    }
  }

  componentDidMount() {
    var dat = {
      strParam: "aa"
    }
  }

  componentWillUnmount() {
    //clearInterval(this.interval)
  }

  render() {
    const {
      uMID,
      uDateTime64_UTC,
      strMoldName,
      nProductCount,
      nSuccessRate,
      nFailedRate,
      uEstimateFinishDateTime64_UTC,
      nOneTimeProductCount,
      nPopCount,
      nFetchCount,
      arrForceInSignal,
      arrForceOutSignal
    } = this.state
    const TabPane = Tabs.TabPane

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="#">{text}</a>,
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="#">Action 一 {record.name}</a>
          <span className="ant-divider" />
          <a href="#">Delete</a>
          <span className="ant-divider" />
          <a href="#" className="ant-dropdown-link">
            More actions <Icon type="down" />
          </a>
        </span>
      ),
    }];

    const data = [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }];

    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
      <div className= "HomeView">
        <Layout style={{ backgroundColor: 'white' }}>
          <Layout style={{ backgroundColor: 'white' }}>
            <Row gutter={8} style={{ margin: '0 0.2%', border: 'solid 1px #eeeeee', borderRadius: '2px' }}>
              <Col span={6} > <img src={jxs} style={{ width: '100%', height: '179px' }}/> </Col>
              <Col span={6} >
                <ul style={{padding: '1% 4%'}}>
                  <li style={{fontSize: 'x-large', fontWeight: '800'}}>TTW1210 低温水式模温机</li>
                  <li style={{ color: '#108ee9', fontSize: 'medium', margin: '4% 0px' }}>编号：T2201554587  </li>
                  <li style={{ margin: '4% 0px', fontSize: 'medium', fontWeight: '900' }}>品牌：拓斯达 &nbsp;&nbsp; 型号：TTW1210</li>
                  <li style={{ margin: '4% 0px' }}>
                    <Tag color="orange">标签一</Tag>
                    <Tag color="green">标签二</Tag>
                  </li>
                </ul>
              </Col>
              <Col span={6} >
                <ul style={{fontSize: 'xx-large', fontWeight: '500', padding: '4% 2%'}}>
                  <li>机台: 80</li>
                  <li style={{ fontSize: 'larger', color: '#00a854'}}>运行中</li>
                </ul>
              </Col>
              <Col span={6} >
                <ul style={{padding: '1% 4%'}}>
                  <li style={{fontSize: 'medium', fontWeight: '500'}}>工单：PTN21544521</li>
                  <li style={{ color: '#108ee9', fontSize: 'medium', fontWeight: '500', margin: '4% 0px' }}>产品：华为P9手机后盖</li>
                  <li style={{ margin: '4% 0px', fontSize: 'medium', fontWeight: '900' }}>
                    <Progress percent={50} status="active" />
                  </li>
                  <li style={{ margin: '4% 0px', fontSize: 'large' }}>
                    预计完成时间: 2017-08-20 23:00:00
                  </li>
                </ul>
              </Col>
            </Row>
            <Tabs defaultActiveKey="1" style={{ margin: '0 0.2%', border: 'solid 1px #eeeeee', borderRadius: '2px' }}>
              <TabPane tab={<span><Icon type="eye-o" />实时画面</span>} key="1">
                <div style={{ margin: '0 2% 0 1.5%'}}>
                  <ReactSVG
                   path={mtptcll}
                   callback={(svg) => console.log(svg)}
                   className="example"
                   evalScript="always"/>
                </div>
              </TabPane>
              <TabPane tab={<span><Icon type="edit" />报警历史</span>} key="2">
                <Table columns={columns} dataSource={data} />
              </TabPane>
              <TabPane tab={<span><Icon type="picture" />维护保养</span>} key="3">

              </TabPane>
            </Tabs>
          </Layout>
          <Sider style={{ backgroundColor: 'white', padding: '0.3%', borderLeft: 'solid 1px #eeeeee', borderRight: 'solid 1px #eeeeee', borderRadius: '5px', height: '652px' }}>
            <Card style={{ width: 190 }} bodyStyle={{ padding: 0 }}>
              <div className="custom-image" style={{margin: '0 auto', width: '100%', border: 'solid 1px #eeeeee'}}>
                <img alt="example" width="100%" src={jxs} />
              </div>
              <div className="custom-card">
                <h3>机械手</h3>
              </div>
            </Card>
            <Card style={{ width: 190 }} bodyStyle={{ padding: 0 }}>
              <div className="custom-image">
                <img alt="example" width="100%" src={jxs} />
              </div>
              <div className="custom-card">
                <h3>机械手</h3>
              </div>
            </Card>
            <Card style={{ width: 190 }} bodyStyle={{ padding: 0 }}>
              <div className="custom-image">
                <img alt="example" width="100%" src={jxs} />
              </div>
              <div className="custom-card">
                <h3>推送机</h3>
              </div>
            </Card>
          </Sider>
        </Layout>
      </div>
    )
  }
}
