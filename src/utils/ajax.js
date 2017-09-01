export default {
      Plproject_List: function (date, fmt) {
        var obj = {
            //uProjectUUID : 0 ,
        }

        DoPost_Project("Plproject_List",obj,function(res){
            console.log('Plproject_List=====', res)
            var Pl_list = res.obj || []
            var templist = []
            Pl_list.forEach(function(item, index){
              templist.push({
                  key: index,
                  strPLProjectName: item.strPLProjectName,
                  strPLProjectDescription: item.strPLProjectDescription,
                  strPLProjectNote: item.strPLProjectNote,
                  uPLProjectUUID: item.uPLProjectUUID
                })
            })

            seft.setState({
               data: templist
            })
        })
    },

    DoPost: function (url,func,obj,cb) {
      var req = new TRequest();

      console.log(func);
      // exec : function (url, op, obj, cb, err)
      req.exec(url, func, obj,
          // success:
          function (json){

             cb(json);            //cbÊÇÒ»¸öº¯Êý£¬ÕâÀïµ÷ÓÃÁËÕâ¸öº¯Êý£¬È»ºó¸øÁË²ÎÊý¡£

             return ;
          },
          // error:
          function (json) {

          });

      return ;
    }
}
