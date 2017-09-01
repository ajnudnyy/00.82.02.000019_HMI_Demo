import React, {Component} from 'react'

import PropTypes from 'prop-types'
import  connect  from 'mqtt';

import  tl_Subscribe_Handle  from '../../utils/top_mqtt'
import  tl_Unsubscribe_Handle  from '../../utils/top_mqtt'

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
  Card,
  Spin
} from 'antd'
import {Link} from 'dva/router';
import ReactSVG from 'react-svg'
import f1 from './assets/1.jpg'
import f2 from './assets/2.jpg'
import f3 from './assets/3.jpg'
import jxs from './assets/jxs.jpg'
let seft
const client  = connect('mqtt://iec.topstarltd.com:9011');
const {Sider} = Layout;

{ /* 测试数据 */}
const config = [
  //第一台机器配置, 测试数据默认为模温机
  {
    info: {
      model: 'TTW1210 低温水式模温机', // 型号
      mid: 'm_v9573514624', // 机器编号
      did: 't_v9573514624', // 终端采集设备编号
      brand: 'TOPSTAR', // 品牌
      tags: [
        'tag1', 'tag2'
      ], // 标签
      station_id: '80', // 机台号
      image: './assets/3.jpg', // 照片
    },
    datasource: {
      mqtt: {
        server: 'mqtt://iec.topstarltd.com', // 服务器
        port: 9011, // 端口
        topic: 'topstarltd/iec/app/10003', // 订阅 appid:10001 位置的数据源
      }
    },
    svg: ["./assets/mtptcll.svg"], // SVG文件路径
    fields: [
      {
        id: "svg_txt_model",
        attr: "html",
        key: "model"
      }, {
        id: "svg_txt_deviceid",
        attr: "html",
        key: "machine_id"
      }, {
        id: "svg_txtTempIn",
        attr: "html",
        key: "temp_in"
      },{
        id: "svg_txtTempOut",
        attr: "html",
        key: "temp_out"
      },, {
        id: "svg_txtTempIn2",
        attr: "html",
        key: "temp_in"
      },{
        id: "svg_txtTempOut2",
        attr: "html",
        key: "temp_out"
      },{
        id: "svg_txtTempSet",
        attr: "html",
        key: "temp_set"
      },{
        id: "svg_rectWaterLevelLow",
        attr: "fill",
        key: "run_status",
        render : function(val){
          if(0 == val)
          {
            return "blue";
          } else {
            return "red";
          }
        }
      },{
        id: "svg_rectInWaterPressureLow",
        attr: "fill",
        key: "total_time_power_on"
      }, {
        id: "svg_rectSystemPressureHigh",
        attr: "fill",
        key: "cycle_count"
      }
    ]
  }, //第二台机器配置
  {
    info: {
      model: '六自由度工业机器人', // 型号
      mid: 'm_v9582414624', // 机器编号
      did: 't_v9582414624', // 终端采集设备编号
      brand: 'TOPSTAR', // 品牌
      tags: [
        'tag1', 'tag2'
      ], // 标签
      station_id: '80', // 机台号
      image: './assets/2.jpg', // 照片
    },
    datasource: {
      mqtt: {
        server: 'mqtt://iec.topstarltd.com', // 服务器
        port: 9011, // 端口
        topic: 'topstarltd/iec/app/10002', // 订阅 appid:10001 位置的数据源
      }
    },
    svg: ["./assets/TSR-050-A.svg"], // SVG文件路径
    fields: [
      {
        id: "svg_txtMachineModel",
        attr: "html",
        key: "model"
      },
      {
        id: "svg_txtMachineID",
        attr: "html",
        key: "machine_id"
      },{
        id: "svg_txtCyclePeriod",
        attr: "html",
        key: "cycle_period"
      },
      {
        id: "svg_txtRunSpeed",
        attr: "html",
        key: "run_speed"
      },
      {
        id: "svg_txtErrorCount",
        attr: "html",
        key: "fault_count"
      },
      {
        id: "svg_txtCycleCount",
        attr: "html",
        key: "cycle_count"
      },
      {
        id: "svg_txtPowerOnTime",
        attr: "html",
        key: "total_time_power_on"
      },
      {
        id: "svg_txtRunTime",
        attr: "html",
        key: "total_time_run"
      }
    ]
  }
]

export default class Manipulator extends Component {

  constructor(props) {
    super(props)
    seft = this;

    this.state = {
      values: [
        96, 2, 2
      ],
      loading: true,
      cru_model: 'TTW1210 低温水式模温机',
      cru_mid: '',
      cru_did: '',
      cru_brand: '',
      cru_tags: [],
      cru_station_id: '',
      cru_image: './assets/3.jpg',
      task_no: 'T201470812554',  // 工单号
      task_name: '华为P9外壳',  // 生产内容
      task_progress: 90,  // 生产进度:90%
      task_finish: '2017-09-03 10:15:33',  // 结束时间
      cru_server: '',
      cru_port: '',
      cru_topic: '',
      cru_svg: './assets/mtptcll.svg',
      cru_fields: [],
      listItems: []
    }
  }

  componentWillMount() {
    this.setState({loading: true})
  }

  componentDidMount() {
    var dat = {
      strParam: "aa"
    }
    var url = 'http://iec.top-link.me/iec/Handler_MachineData_V1.ashx'
    {/* DoPost(url, 'iec_machine_config', dat, function(){

    }) */}

    const listItems = []
    config.forEach(function(item){
      listItems.push({
        cru_model: item.info.model,   // 型号
        cru_mid: item.info.mid,   // 机器编号
        cru_did: item.info.did,   // 终端采集设备编号
        cru_brand: item.info.brand, // 品牌
        cru_tags: item.info.tags,   // 标签
        cru_station_id: item.info.station_id,   // 机台号
        cru_image: item.info.image,   // 照片
        cru_server: item.datasource.mqtt.server,  // 服务器
        cru_port : item.datasource.mqtt.port,  // 端口
        cru_topic : item.datasource.mqtt.topic,   // 订阅 appid:10001 位置的数据源
        cru_svg: item.svg,  // SVG文件路径
        cru_fields: item.fields
      })
    })

    seft.setState({
      loading: false,
      cru_model: listItems[0].cru_model,
      cru_mid: listItems[0].cru_mid,
      cru_did: listItems[0].cru_did,
      cru_brand: listItems[0].cru_brand,
      cru_tags: listItems[0].cru_tags,
      cru_station_id: listItems[0].cru_station_id,
      cru_image: listItems[0].cru_image,
      cru_server: listItems[0].cru_server,
      cru_port: listItems[0].cru_port,
      cru_topic: listItems[0].cru_topic,
      cru_svg: listItems[0].cru_svg,
      cru_fields: listItems[0].cru_fields,
      listItems: listItems
    })

    //初始化, 默认订阅
    client.on('connect', function() {
      client.subscribe(listItems[0].cru_topic)
    })

    client.on("message", function(topic, payload) {
      var mqdat = JSON.parse(payload).data || {}
      var mqdatTask = JSON.parse(payload).task  || {}
      console.log('来自'+topic+'的payload=====', JSON.parse(payload))
      seft.setState({
        task_no: mqdatTask.task_no,  // 工单号
        task_name: mqdatTask.task_name,  // 生产内容
        task_progress: mqdatTask.task_progress,  // 生产进度:90%
        task_finish: mqdatTask.task_finish,  // 结束时间
      })

      seft.state.cru_fields.forEach(function(item){
        for(var _key in mqdat){
          if (mqdat.hasOwnProperty(_key)) { //filter
            if (item.key == _key) {

              if (
                (typeof item.render != 'undefined')
                 && (typeof item.render != null)
                 && (typeof item.render == 'function')
                )
              {
                $('#'+item.id).attr(item.attr, item.render(mqdat[_key]))
              }
              else
              {
                $('#'+item.id).html(mqdat[_key])
              }
            }
          }
        }
      })
    })
  }

  componentWillUnmount() {
    client.end()  //关闭mqtt连接, 释放服务器资源
  }

  equipHandleClick (cru_mid) {
    if (seft.state.cru_mid == cru_mid) return
    seft.state.listItems.map(function(item, index) {
      if(item.cru_mid == cru_mid){
        seft.setState({
          loading: false,
          cru_model: item.cru_model,
          cru_mid: item.cru_mid,
          cru_did: item.cru_did,
          cru_brand: item.cru_brand,
          cru_tags: item.cru_tags,
          cru_station_id: item.cru_station_id,
          cru_image: item.cru_image,
          cru_server: item.cru_server,
          cru_port: item.cru_port,
          cru_topic: item.cru_topic,
          cru_svg: item.cru_svg,
          cru_fields: item.cru_fields
        })

        client.unsubscribe(seft.state.cru_topic, function(err, df){

        })

        client.subscribe(item.cru_topic)
        return;
      }
    })
  }

  render() {

    const TabPane = Tabs.TabPane
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="#">{text}</a>
      }, {
        title: '报警代号',
        dataIndex: 'alarmCode',
        key: 'alarmCode'
      }, {
        title: '可能原因',
        dataIndex: 'cause',
        key: 'cause'
      }, {
        title: '处理结果',
        dataIndex: 'proResult',
        key: 'proResult'
      }, {
        title: '报警时间',
        key: 'alarmTimeStamping',
        render: (text, record) => (
          <span>
            <a href="#">Action 一 {record.name}</a>
            <span className="ant-divider"/>
            <a href="#">Delete</a>
            <span className="ant-divider"/>
            <a href="#" className="ant-dropdown-link">
              More actions
              <Icon type="down"/>
            </a>
          </span>
        )
      }
    ];

    const data = [
      {
        key: '1',
        name: '运转不顺',
        alarmCode: 32,
        cause: '堵塞',
        proResult: '进水开关没有打开',
        alarmTimeStamping: '2017-05-12'
      }, {
        key: '2',
        name: '运转不顺',
        alarmCode: 32,
        cause: '堵塞',
        proResult: '进水开关没有打开',
        alarmTimeStamping: '2017-05-12'
      }, {
        key: '3',
        name: '运转不顺',
        alarmCode: 32,
        cause: '堵塞',
        proResult: '进水开关没有打开',
        alarmTimeStamping: '2017-05-12'
      }, {
        key: '4',
        name: '运转不顺',
        alarmCode: 32,
        cause: '堵塞',
        proResult: '进水开关没有打开',
        alarmTimeStamping: '2017-05-12'
      }, {
        key: '5',
        name: '运转不顺',
        alarmCode: 32,
        cause: '堵塞',
        proResult: '进水开关没有打开',
        alarmTimeStamping: '2017-05-12'
      }, {
        key: '6',
        name: '运转不顺',
        alarmCode: 32,
        cause: '堵塞',
        proResult: '进水开关没有打开',
        alarmTimeStamping: '2017-05-12'
      }
    ]

    return (
      <div className="HomeView">
        <Spin spinning={this.state.loading} style={{
          position: 'fixed',
          zIndex: '1000000000',
          top: '46%',
          left: '52%'
        }}/>
        <Layout style={{
          backgroundColor: 'white'
        }}>
          <Layout style={{
            backgroundColor: 'white',
            border: 'solid 1px #eeeeee',
            borderRadius: '3px'
          }}>
            <Row  gutter={8}
                  style={{
                    margin: '0 0.2%'
                  }}>
              <Col span={6}>
                <img src={require(this.state.cru_image)} style={{
                  width: '100%',
                  height: '179px'
                }}/>
              </Col>
              <Col span={6} style={{paddingTop: '10px'}}>
                <ul style={{
                  padding: '1% 4%'
                }}>
                  <li style={{
                    fontSize: 'x-large',
                    fontWeight: '800'
                  }}>{ this.state.cru_model }</li>
                  <li style={{
                    color: '#108ee9',
                    fontSize: 'medium',
                    margin: '4% 0px'
                  }}>编号：T2201554587
                  </li>
                  <li style={{
                    margin: '4% 0px',
                    fontSize: 'medium',
                    fontWeight: '900'
                  }}>品牌：拓斯达 &nbsp;&nbsp; 型号：TTW1210</li>
                  <li style={{
                    margin: '4% 0px'
                  }}>
                    {
                      this.state.cru_tags.map(function (item, index) {
                        return (
                          <Tag color="orange" key={index}>{item}</Tag>
                        )
                      })
                    }
                  </li>
                </ul>
              </Col>
              <Col span={6} style={{paddingTop: '10px'}}>
                <ul style={{
                  fontSize: 'xx-large',
                  fontWeight: '500',
                  padding: '4% 2%'
                }}>
                  <li>机台: 80</li>
                  <li style={{
                    fontSize: 'larger',
                    color: '#00a854'
                  }}>运行中</li>
                </ul>
              </Col>
              <Col span={6} style={{paddingTop: '18px'}}>
                <ul style={{
                  padding: '1% 4%'
                }}>
                  <li style={{
                    fontSize: 'medium',
                    fontWeight: '500'
                  }}>工单：{ seft.state.task_no }</li>
                  <li style={{
                    color: '#108ee9',
                    fontSize: 'medium',
                    fontWeight: '500',
                    margin: '4% 0px'
                  }}>产品：{ seft.state.task_name }</li>
                  <li style={{
                    margin: '4% 0px',
                    fontSize: 'medium',
                    fontWeight: '900'
                  }}>
                    <Progress percent={seft.state.task_progress} status="active"/>
                  </li>
                  <li style={{
                    margin: '4% 0px',
                    fontSize: 'large'
                  }}>
                    预计完成时间: { seft.state.task_finish }
                  </li>
                </ul>
              </Col>
            </Row>
            <Tabs defaultActiveKey="1" style={{
              padding: '0 1%', borderTop: 'solid 1px rgb(243, 239, 236)'
            }}>
              <TabPane tab={< span > <Icon type="eye-o"/>实时画面 < /span>} key="1">
                <div style={{
                  margin: '0 2% 0 1.5%'
                }}>
                  <ReactSVG
                    path={require(this.state.cru_svg)}
                    //callback={(svg) => console.log(svg)}
                    className="example"
                    evalScript="always"/>
                </div>
              </TabPane>
              <TabPane tab={< span > <Icon type="edit"/>报警历史 < /span>} key="2">
                <div>
                  <Table columns={columns} dataSource={data}/>
                </div>
              </TabPane>
              <TabPane tab={< span > <Icon type="picture"/>维护保养 < /span>} key="3">
                <div>
                  <Table columns={columns} dataSource={data}/>
                </div>
              </TabPane>
            </Tabs>
          </Layout>
          <Sider className="siderScroll" style={{
            flex: '0 0 247px !important',
            backgroundColor: 'white',
            overflow: 'auto',
            marginLeft: '1%',
            borderLeft: '3px solid rgba(16, 142, 233, 0.24)',
            borderRight: 'solid 1px #eeeeee',
            borderRadius: '5px',
            height: '812px',
            padding: '0 0.51%'
          }}>
            {
                this.state.listItems.map(function (item, index) {
                  console.log('item========', item)
                  return (
                    <Card key={index}
                          bodyStyle={{
                            padding: '0'
                          }}
                          onClick={ () => { seft.equipHandleClick( item.cru_mid ) } }>
                      <div className="custom-image" style={{ marginTop: '4%' }}>
                        <img alt="example" width="100%" height="150" src={require(item.cru_image)}/>
                      </div>
                      <div className="custom-card" style={{position: 'absolute', top: '63%', left: '3%'}}>
                        <ul>
                          <li><span>机台号:{item.cru_station_id}</span></li>
                          <li><span>设备编号:{item.cru_did}</span></li>
                          <li><span>型号:{item.cru_model}</span></li>
                        </ul>
                      </div>
                  </Card>
                )})
            }
          </Sider>
        </Layout>
      </div>
    )
  }
}
