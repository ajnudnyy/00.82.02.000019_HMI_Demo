config = {
    name: "test_config",
    fields: [
        {
            id: "svg_txtTempIn2",
            attr: "text",
            key: "name",
        },{
            id: "svg_txtTempOut",
            attr: "color",
            key: "key_1",
        },{
            id: "svg_txtTempOut2",
            attr: "html",
            key: "age",
        },{
            id: "svg_rectWaterLevelLow",
            attr: "html",
            key: "age",
        },{
            id: "svg_rectInWaterPressureLow",
            attr: "html",
            key: "age",
        },{
            id: "svg_rectOverHeat",
            attr: "html",
            key: "age",
        },{
            id: "svg_rectSystemPressureHigh",
            attr: "html",
            key: "age",
        }
    ]
};

Page_Input: MachineUUID

TRquest.Post(url, xxx)

success(json) {

    json = {
        info: {
            model: 't_v9573514624',
            trademark: 'Res-sf',
            order: 'ty36175825'
        }
        svg: ["/svg_folder/test1.svg"],
        fields: [
            {
                id: "svg_txtTempIn",
                attr: "html",
                key: "svg_txtTempIn",
            },{
                id: "svg_txtTempOut",
                attr: "html",
                key: "svg_txtTempOut",
            },{
                id: "svg_rectWaterLevelLow",
                attr: "fill",
                key: "svg_rectWaterLevelLow",
            },{
                id: "svg_rectInWaterPressureLow",
                attr: "fill",
                key: "svg_rectInWaterPressureLow",
            },{
                id: "svg_rectOverHeat",
                attr: "fill",
                key: "svg_rectOverHeat",
            },{
                id: "svg_rectSystemPressureHigh",
                attr: "fill",
                key: "svg_rectSystemPressureHigh",
            }
        ]
    }
}


mqtt: on_message(payload) {

  payload = {
  "DeviceUUID": "Twr-12452",
  "MachineUUID": "T42112452",
  "fields": [
        {
            key: "svg_txtTempIn",
            value: "210.12",
        },{
            key: "svg_txtTempOut",
            value: "180.74",
        },{
            key: "svg_rectWaterLevelLow",
            value: "rgb(255, 0, 0)",
        },{
            key: "svg_rectInWaterPressureLow",
            value: "rgb(255, 255, 255)",
        },{
            key: "svg_rectOverHeat",
            attr: "rgba(127, 92, 22, 0)",
        },{
            key: "svg_rectSystemPressureHigh",
            value: "rgba(127, 92, 22, 0)",
        }
    ]
  }


    var _id = null;
    var _attr = null.
    var _value = null;

    var jsonObj = payload; // {"name":"傅红雪","age":"24","profession":"刺客"};
    //1、使用eval方法
    // var eValue=eval('jsonObj.'+key);
    alert(eValue);
    //2、遍历Json串获取其属性
    for (var item in jsonObj) {

        for (var _f in config.fields) {
            if (_f.key == item.key) { //item 表示Json串中的属性，如'name'

                //var jValue=jsonObj[item];//key所对应的value
                //alert(jValue);
                _id = _f.id;
                _attr = _f.attr;
                _value = item.value;

                var ele = $("#" + _id);
                if (ele.hasAttr(_attr)) {
                    ele.attr(_attr, _value);
                } else {
                    ele.html(_value)
                }
            }
        }
    }
}

  payload.fieldsforEach(item) {
      config.item[i].key.name = item.key.name[]

      _id = config.;
      _attr = config.
      _value = payload.;

      var ele = $("#" + _id);
      if (ele.hasAttr(_attr)) {
          ele.attr(_attr, _value);
      } else {
          ele.html(_value)
      }
  }
}
