const app = getApp()
var time;
var name;

Page({
  data:{
    showModal: false,
  },
  onLoad: function (options) {
    console.log(options);
    this.setData({
      name: options.title,
      intro: options.intro,
      tag: options.tag,      
    });
   time=options.time;
   name=options.title;
    console.log(options.tag);
    console.log(time);
    console.log("name"+name);
    
    switch (options.tag) {
      case "蔬菜类":
        this.setData({
          name_color: 'seagreen',
          bg_url: 'https://raw.githubusercontent.com/Wenqian1228/zwq_wx_background/master/IMG_shucai2.jpg'
        })
        break;
      case "肉、蛋类":
        this.setData({
          name_color: 'white',
          bg_url: 'https://raw.githubusercontent.com/Wenqian1228/zwq_wx_background/master/IMG_roudan2.JPG'
        })
        break;
      case "内脏类":
        this.setData({
          name_color: 'beige',
          bg_url: 'https://raw.githubusercontent.com/Wenqian1228/zwq_wx_background/master/IMG_neizang.JPG'
        })
        break;
      case "丸、滑类":
        this.setData({
          name_color: 'beige',
          bg_url: 'https://raw.githubusercontent.com/Wenqian1228/zwq_wx_background/master/IMG_wanhua.JPG'
        })
        break;
      case "豆、菌类":
        this.setData({
          name_color: 'darkgray',
          bg_url: 'https://raw.githubusercontent.com/Wenqian1228/zwq_wx_background/master/IMG_doujun.JPG'
        })
        break;
      case "海产类":
        this.setData({
          name_color: 'cornflowerblue',
          bg_url: 'https://raw.githubusercontent.com/Wenqian1228/zwq_wx_background/master/IMG_haichan2.JPG'
        })
        break;
      case "主食类":
        this.setData({
          name_color: 'azure',
          bg_url: 'https://raw.githubusercontent.com/Wenqian1228/zwq_wx_background/master/IMG_zhushi.JPG'
        })
    }
  
   
    
    console.log(this.data.name);
    
    
  },
  navigateTotimer:function(){
    var count = 0;
    //console.log(e.currentTarget.dataset);
    var name1 = name;
    var time1 = time;
    var seconds = time1 % 60;
    var min = Math.floor(time1 / 60);
    var hour = Math.floor(min / 60);
    min = min % 60;
    seconds = ("0" + seconds).slice(-2);
    min = ("0" + min).slice(-2);
    hour = ("0" + hour).slice(-2);
    var formatTime = hour + ":" + min + ":" + seconds;

    console.log("name: "+name1);
    console.log("time: "+formatTime);
    var timer = {
      beginTime: formatTime,
      name: name1
    }
    //console.log(timer);
    console.log(app.globalData.timer_list);
    getApp().globalData.timer_list.push(timer);
    console.log(app.globalData.timer_list);
    
   
    

  },
  changeTime:function(){
    
    wx.showModal({ //使用模态框提示用户进行操作

      title: '自定义时间',

      content: "选择自己喜欢的涮锅时间",

      success: function (res) {

        if (res.confirm) { //判断用户是否点击了确定
          confirm = true;
        }
      }
    })
  },

  /**
     * 弹窗
     */
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
  }
  
})