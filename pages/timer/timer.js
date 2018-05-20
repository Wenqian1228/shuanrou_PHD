// pages/timer/timer.js
var timer = require('wxTimer.js');
var wxTimer = new timer({
  beginTime: "00:00:10"
})
var reset=1;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxTimerList: {}
  },


  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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

  

  onRequest: function(){

   
   if(reset==1){
     wxTimer.start(this);
     reset=0;
   }
   else if(reset==0){
     wxTimer.stop(this);
     reset=1;
   }
  },

  
 

})




 