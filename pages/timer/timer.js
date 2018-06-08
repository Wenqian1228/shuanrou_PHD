// pages/timer/timer.js

var timer = require('wxTimer.js');
var ingredient_data = require('../../utils/ingredients.js');
var timerList = {};

//voice
const innerAudioContext = wx.createInnerAudioContext();
innerAudioContext.autoplay = false;
innerAudioContext.src = 'https://raw.githubusercontent.com/Wenqian1228/zwq_wx_background/master/to-the-point.mp3';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxTimerList: {},
    data:ingredient_data,
    timerList: timerList,
    timerNum: Object.keys(timerList).length
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    //console.log("onShow function");
    //console.log(app.globalData.timer_list);
    var arrayLength = app.globalData.toAdd_timer_list.length;

    for (var i = 0; i < arrayLength; i++){
      var obj = app.globalData.toAdd_timer_list[i];
      var name = obj.name;
      var time = obj.beginTime;
      var tag =obj.tag;
      //console.log(name, time, tag);

      var newTimer = new timer({
        beginTime: time,
        name: name,
        complete: function (){
          innerAudioContext.play();
          wx.vibrateLong();
          
          //console.log("finish");
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

    app.globalData.toAdd_timer_list = [];
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
      //开始load音频
      innerAudioContext.autoplay = false;
      innerAudioContext.src = 'https://raw.githubusercontent.com/Wenqian1228/zwq_wx_background/master/to-the-point.mp3';
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
   
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      //console.log(res.target)
    }
    return {
      title: '涮肉博士',
      path: '/pages/index/index',
      imageUrl:'https://raw.githubusercontent.com/Wenqian1228/zwq_wx_background/master/IMG_neizang.JPG'
    }
  }
 

})




 