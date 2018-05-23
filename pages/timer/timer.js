// pages/timer/timer.js
var timer = require('wxTimer.js');
var wxTimer_bxsc = new timer({
  beginTime: "00:01:00",
  name: 'wxTimer_bxsc',
})
var reset_bxsc=1;

var wxTimer_bc = new timer({
  beginTime: "00:01:00",
  name: 'wxTimer_bc',
})
var reset_bc = 1;

var wxTimer_dbc = new timer({
  beginTime: "00:02:00",
  name: 'wxTimer_dbc',
})
var reset_dbc = 1;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxTimerList: {
     
    }
  },


  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    showView_bxsc: (options.showView_bxsc == "false" ? false : true)
    counting_bxsc: (options.counting_bxsc == "false" ? false : true)
    showView_bc: (options.showView_bc == "false" ? false : true)
    counting_bc: (options.counting_bxsc == "false" ? false : true)
    showView_dbc: (options.showView_dbc == "false" ? false : true)
    counting_dbc: (options.counting_bxsc == "false" ? false : true)
  },


  onChangeShowState_bxsc: function () {
    var that = this;
    that.setData({
      
      showView_bxsc: (!that.data.showView_bxsc)
      
    })
    if (!that.data.showView_bxsc){
      wxTimer_bxsc.stop(this);
      
      that.setData({

        counting_bxsc: false

      })
      reset_bxsc = 1;
    }
  },
  onChangeShowState_bc: function () {
    var that = this;
    that.setData({

      showView_bc: (!that.data.showView_bc)

    })
    if (!that.data.showView_bc) {
      wxTimer_bc.stop(this);

      that.setData({

        counting_bc: false

      })
      reset_bc = 1;
    }
  },
 
  onChangeShowState_dbc: function () {
    var that = this;
    that.setData({

      showView_dbc: (!that.data.showView_dbc)

    })
    if (!that.data.showView_dbc) {
      wxTimer_dbc.stop(this);

      that.setData({

        counting_dbc: false

      })
      reset_dbc = 1;
    }
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



  
  
 

})




 