import  connect  from 'mqtt';
const client  = connect('mqtt://iec.topstarltd.com:9011');

export function tl_Subscribe_Handle(t_topic, cb) {

  const morkData = {
    task: {
          task_no: 'T201470812554',  // 工单号
          task_name: '华为P9外壳',  // 生产内容
          task_progress: 90,  // 生产进度:90%
          task_finish: '2017-09-03 10:15:33',  // 结束时间
    },
    data: {
          machine_id: "88542154", // 机器识别号
          model: "TSR090", // 机器型号
          version: "K1.2017.05.10.B", // 设备版本
          machine_type: 2, // 机器类型
          run_status : 1, // 0:停止, 1:运行中  127:故障
          alarm_no : 0, // 报警代码, 0 表示无故障
          fault_count : 19, // 故障次数
          run_speed : 10.5, // 运行速度
          sys_gpi : 1, // 通用输入,共16路
          sys_gpo : 6, // 通用输出,共16路
          power_on_datetime : "2017-08-27 8:10:33",  // 本次开机时间
          total_time_run : 0,  // 系统运行总时间
          total_time_power_on : 1105.0 , // 通电总时间 ?
          cycle_period : 10.0, // 单次循环周期
          cycle_count : 984,  // 循环次数
          alarm_no:0,
          temp_in:57,
          temp_out:59,
          temp_set:60
        }
  }


  client.on('connect', function() {
    client.subscribe(t_topic)
  })

  client.on("message", function(topic, payload) {
    cb(JSON.parse(payload))
  })
}

export function tl_Unsubscribe_Handle(t_topic) {
  console.log('unsubscribe  '+t_topic+'=的消息');
  client.unsubscribe(t_topic)
}

export default tl_Subscribe_Handle
