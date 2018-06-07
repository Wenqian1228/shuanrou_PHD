// pages/timer/timer.js
//here are LIU hard code

var timer = require('wxTimer.js');





//Muzi
var ingredient_data = require('../../utils/ingredients.js');
var timerList = {};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxTimerList: {},
    timers:[],
    touchStartTime: 0,
    touchEndTime: 0,  
    lastTapTime: 0, 
    //Muzi
    data:ingredient_data,
    timerList: timerList,
    timerNum: Object.keys(timerList).length
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // LIU HARD CODE
    console.log(options);
    var seconds = options.time%60;
    var min = options.time / 60;
    var hour = min/60;
    min = min % 60;
    seconds =  ("0" + seconds).slice(-2);
    min = ("0" + min).slice(-2);
    hour = ("0" + hour).slice(-2);
    var formatTime = hour +":"+ min+":"+seconds;

    var newTimer = new timer({
      beginTime: formatTime,
      name: options.name,
      reset: 1,
      counting: false
    });
    this.data.timers[0] = newTimer;
    this.setData({
      timers: this.data.timers
    });
    console.log(this.data.timers);
    // liu
    showView_bxsc: (options.showView_bxsc == "false" ? false : true)
    counting_bxsc: (options.counting_bxsc == "false" ? false : true)
    showView_bc: (options.showView_bc == "false" ? false : true)
    counting_bc: (options.counting_bxsc == "false" ? false : true)
    showView_dbc: (options.showView_dbc == "false" ? false : true)
    counting_dbc: (options.counting_bxsc == "false" ? false : true)
  },

  START: function(){

  },
  END: function(){

  },

  touchStart: function (e) {
    this.touchStartTime = e.timeStamp
  },
  touchEnd: function (e) {
    this.touchEndTime = e.timeStamp
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var app = getApp();
    var that = this;
    console.log("onShow function");
    console.log(app.globalData.timer_list);
    var arrayLength = app.globalData.timer_list.length;

    for (var i = 0; i < arrayLength; i++){
      var obj = app.globalData.timer_list[i];
      var name = obj.name;
      var time = obj.beginTime;
      var tag =obj.tag;
      console.log(name, time, tag);

      var newTimer = new timer({
        beginTime: time,
        name: name,
        complete: function (){
          wx.vibrateLong();
          
          console.log("finish");
          wx.showModal({ //使用模态框提示用户进行操作

            title: '菜好了',

            content: '您的' + name + "可以出锅了",
            showCancel:false,

            success: function (res) {
                  
              if (res.confirm) { //判断用户是否点击了确定
                  confirm=true;
              }
              

            }


          })
          
        }
      })
      var myTimer = {
        name: name,
        time: time,
        created: true,
        started: false,
        timer: newTimer
      }

      timerList[name] = myTimer;
    }

    app.globalData.timer_list = [];
    that.setData({
      timerList: timerList,
      timerNum: Object.keys(timerList).length
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  
//包心生菜
  onRequest_bxsc: function(){
    var that = this;
    if (reset_bxsc==1){
      wxTimer_bxsc.start(this);
      
      that.setData({
        counting_bxsc: (!that.data.counting_bxsc)
      })

     reset_bxsc=0;
     
   }
    else if (reset_bxsc==0){
      wxTimer_bxsc.stop(this);
      that.setData({
        counting_bxsc: (!that.data.counting_bxsc)
      })
      reset_bxsc=1;
   }  
  },

  //菠菜
  onRequest_bc: function () {
    var that = this;
    if (reset_bc == 1) {
      wxTimer_bc.start(this);

      that.setData({
        counting_bc: (!that.data.counting_bc)
      })

      reset_bc = 0;

    }
    else if (reset_bc == 0) {
      wxTimer_bc.stop(this);
      that.setData({
        counting_bc: (!that.data.counting_bc)
      })
      reset_bc = 1;
    }
  },

  //大白菜
  onRequest_dbc: function () {
    var that = this;
    if (reset_dbc == 1) {
      wxTimer_dbc.start(this);

      that.setData({
        counting_dbc: (!that.data.counting_dbc)
      })

      reset_dbc = 0;

    }
    else if (reset_dbc == 0) {
      wxTimer_dbc.stop(this);
      that.setData({
        counting_dbc: (!that.data.counting_dbc)
      })
      reset_dbc = 1;
    }
  },

  //Muzi
  createTimer: function(event){
    var that = this;
    var name = event.currentTarget.dataset.name;
    var time = event.currentTarget.dataset.time;
    var date = new Date(null);
    date.setSeconds(time);
    var formattedTime = date.toISOString().substr(11, 8);
    
    var newTimer = new timer({
      beginTime: formattedTime,
      name: name
    })
    
    var myTimer = {
      name: name,
      time: formattedTime,
      created: true,
      started: false,
      timer: newTimer
    }

    timerList[name] = myTimer;
    that.setData({
      timerList: timerList,
      timerNum: Object.keys(timerList).length
    })
  },

  changeTimerState: function(event){
    var that = this;
    var name = event.currentTarget.dataset.name;
    var time = timerList[name].time;

    if (timerList[name].started == false){
      timerList[name].timer.start(this);
      timerList[name].started = true;
    } else if (timerList[name].started == true){
      timerList[name].timer.stop(this);
      timerList[name].started = false;
    }

    that.setData({
      timerList: timerList,
      timerNum: Object.keys(timerList).length
    })
  },
  

 
  deleteTimer: function(event){
    var that = this;
    var name = event.currentTarget.dataset.name;
    wx.showModal({ //使用模态框提示用户进行操作

      title: '删除菜品',

      content: '您确定要将'+name+"从您的菜品计时器中删除？",

      success: function (res) {

        if (res.confirm) { //判断用户是否点击了确定
         
          timerList[name].created = false;
          timerList[name].started = false;
          timerList[name].timer.stop(this);
          that.setData({
            timerList: timerList,
            timerNum: Object.keys(timerList).length
          })

        }

      }

    })
   
  }
 

})




 