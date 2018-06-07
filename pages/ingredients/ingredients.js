const app = getApp()
var utils = require('../../utils/ingredients.js');
var food = wx.getStorageSync("food");
var time;
var name;
var index;
var tag_key;
var input;

Page({
  data:{
    showModal: false,
    inputVal: ""
  },
  onLoad: function (options) {
    console.log(options);
    this.setData({
      name: options.title,
      intro: options.intro,
      tag: options.tag
    });
    var food = wx.getStorageSync("food");
    var tag = options.tag;
    // search for time
 
    if(options.time){
      
      time = options.time
    }
    else{
      console.log("index");
      index = options.index;
      tag_key = utils.tags[tag];
      time = food[tag_key][index].time;
    }
    name=options.title;
    console.log(options.tag);
    console.log(time);
    console.log("name"+name);
    this.setData({
      time: time
    })
    
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
    var repeat = 0;
    for (var i in app.globalData.timer_list) {
      if (app.globalData.timer_list[i].name == name) {
        repeat = 1;
        wx.showToast({
          title: '无需重复添加'
        });
      }
    }
    if(repeat==0){
      //console.log(timer);
      console.log(app.globalData.timer_list);
      getApp().globalData.timer_list.push(timer);
      console.log(app.globalData.timer_list);

      //setstorage
      var that = this;
      var counting_arr = wx.getStorageSync(tag_key);
      counting_arr[index] = counting_arr[index] + 1;
      wx.setStorageSync(tag_key, counting_arr);
      console.log(wx.getStorageSync(tag_key));
      wx.showToast({
        title: '已添加' + name,
        icon: 'success',
        duration: 2000
      })
    }

  },
  changeTime:function(){
    
    wx.showModal({ //使用模态框提示用户进行操作

      title: '自定义时间',

      content: "选择自己喜欢的涮锅时间",

      success: function (res) {

        if (res.confirm) { //判断用户是否点击了确定
          confirm = true;
          console.log(res);
          //food[tag_key][index].time=0;
          wx.setStorageSync("food",food);
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

  inputChange: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
    input = this.data.inputVal;
    console.log("type in: " + input);
  },
  onConfirm: function () {
    console.log(this.data.name + input);
    this.hideModal();

    //set storage
    var food = wx.getStorageSync("food");
    console.log("hahahahha" + food.balls_wahs[0].name);
    var length = food.balls_wahs.length;
    var i = 0;
    for (i = 0; i < length; i++) {
      if (food.balls_wahs[i].name == this.data.name) {
        food.balls_wahs[i].time = parseInt(input);
      }
    }
    length = food.mainfood.length;
    for (i = 0; i < length; i++) {
      if (food.mainfood[i].name == this.data.name) {
        food.mainfood[i].time = parseInt(input);
      }
    }
    length = food.meat_eggs.length;
    for (i = 0; i < length; i++) {
      if (food.meat_eggs[i].name == this.data.name) {
        food.meat_eggs[i].time = parseInt(input);
      }
    }
    length = food.organs.length;
    for (i = 0; i < length; i++) {
      if (food.organs[i].name == this.data.name) {
        food.organs[i].time = parseInt(input);
      }
    }
    length = food.seafood.length;
    for (i = 0; i < length; i++) {
      if (food.seafood[i].name == this.data.name) {
        food.seafood[i].time = parseInt(input);
      }
    }
    length = food.soy_fungus.length;
    for (i = 0; i < length; i++) {
      if (food.soy_fungus[i].name == this.data.name) {
        food.soy_fungus[i].time = parseInt(input);
      }
    }
    length = food.vegetable.length;
    for (i = 0; i < length; i++) {
      if (food.vegetable[i].name == this.data.name) {
        food.vegetable[i].time = parseInt(input);
      }
    }

    wx.setStorageSync("food", food);
    console.log("modified:");
    console.log(food);
  }
  
})