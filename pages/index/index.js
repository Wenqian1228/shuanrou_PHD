//获取应用实例
const app = getApp();
var utils = require('../../utils/ingredients.js');

Page({
  data: {
    kinds: ['肉、蛋类','蔬菜类','内脏类','丸、滑类','豆、菌类','海产类','主食类'],
    recommendation: ['baoxinshengcai', 'niuroujuan', 'yangroujuan', 'dabaicai', 'doumiao', 'bocai'],
    // time: [
    //   [30,30,60,480,900,180,120,300,480,300,180,180],
    //   [60,60,120,60,60,60,60,60,60,120,180,60,300,180,300,240,30,180,180,30,240,180,240,180,240],
    //   [180,15,60,30,15,300,180,180,30],
    //   [240,300,300,180,300,120,240,120],
    //   [180,90,120,120,180,60,120,120,30,300,360,300,240,180],
    //   [300,300,300,300,300,480,300],
    //   [600,180,180,300,120],
    // ],
    meat: utils.meat_eggs,
    vegetable: utils.vegetable,
    organs: utils.organs,
    balls_wahs: utils.balls_wahs,
    soy_fungus: utils.soy_fungus,
    seafood: utils.seafood,
    mainfood: utils.mainfood,
    category: [utils.meat_eggs, utils.vegetable, utils.organs, utils.balls_wahs, utils.soy_fungus, utils.seafood],
    list: [
      {
        id: 'meat',
        name: '肉、蛋类',
        open: false,
        pages: utils.meat_eggs
      },
      {
        id: 'vegetable',
        name: '蔬菜类',
        open: false,
        pages: utils.vegetable
      },
      {
        id: 'organs',
        name: '内脏类',
        open: false,
        pages: utils.organs
      },
      {
        id: 'balls_wahs',
        name: '丸、滑类',
        open: false,
        pages: utils.balls_wahs
      },
      {
        id: 'soy_fungus',
        name: '豆、菌类',
        open: false,
        pages: utils.soy_fungus
      },
      {
        id: 'seafood',
        name: '海产类',
        open: false,
        pages: utils.seafood
      },
      {
        id: 'mainfood',
        name: '主食类',
        open: false,
        pages: utils.mainfood
      }
    ]
  },
  onLoad: function () {
    var that = this;
    for(var kind in that.data.list){
      console.log(that.data.list[kind]);
      if(kind<=5){
        var counting_list = wx.getStorageSync(that.data.list[kind].id);
        if (counting_list) {
          console.log(counting_list);
          var index = counting_list.indexOf(Math.max(...counting_list));
          // console.log(index);
          if (counting_list[index]>=0){
            var rec = "recommendation["+kind+"]";
            that.setData({
              [rec]: that.data.list[kind].pages[index].pinyin
            });
          }
        }
        else {
          wx.setStorageSync(that.data.list[kind].id, Array.apply(null, Array(30)).map(Number.prototype.valueOf, 0));
          console.log(wx.getStorageSync(that.data.list[kind].id));
        }
      }
      // var time_list = wx.getStorageSync(that.data.list[kind].name);
      // if (time_list) {
      //   console.log(time_list);
      // }
      // else {
      //   wx.setStorageSync(that.data.list[kind].name, that.data.time[kind]);
      //   console.log(wx.getStorageSync(that.data.list[kind].name));
      // }
    }
    var time_list = wx.getStorageSync("food");
    if (time_list) {
      console.log(time_list);
    }
    else {
      wx.setStorageSync("food", utils.food);
      console.log(wx.getStorageSync("food"));
    }
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },
  navigateTotimer: function(e){
    var count = 0;
    //console.log(e.currentTarget.dataset);
    var name = e.currentTarget.dataset.name;
    var tag = e.currentTarget.dataset.tag;
    var pinyin = e.currentTarget.dataset.pinyin;
    var index = e.currentTarget.dataset.index;
    var food = wx.getStorageSync("food");
    // search for time
    var tag_key = "utils.tags["+tag+"]";
    console.log(tag_key);
    console.log(utils.tags["肉、蛋类"])
    
    var seconds = time % 60;
    var min = Math.floor(time / 60);
    var hour = Math.floor(min / 60);
    min = min % 60;
    seconds = ("0" + seconds).slice(-2);
    min = ("0" + min).slice(-2);
    hour = ("0" + hour).slice(-2);
    var formatTime = hour + ":" + min + ":" + seconds;
    var timer={
      beginTime: formatTime,
      name: name,
      tag:tag
    }
    //console.log(timer);
    // console.log(app.globalData.timer_list);
    getApp().globalData.timer_list.push(timer);
    //console.log(app.globalData.timer_list);
    //setstorage
    var that = this;
    wx.getStorage({
      key: name,
      success: function (res) {
        console.log(res)
        if (res.data)
        that.setData({
          storageContent: res.data
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
    wx.setStorage({
      key: name,
      data: that.data.storageContent+1,
      success: function(res){
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      }
    })
    wx.switchTab({
      url: '../timer/timer',
    })
  }
})