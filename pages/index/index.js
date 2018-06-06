//获取应用实例
const app = getApp();
var utils = require('../../utils/ingredients.js');

Page({
  data: {
    kinds: ['肉、蛋类','蔬菜类','内脏类','丸、滑类','豆、菌类','海产类','主食类'],
    recommendation: ['baoxinshengcai', 'niuroujuan', 'yangroujuan', 'dabaicai', 'doumiao', 'bocai'],
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
        var time_list = wx.getStorageSync(that.data.list[kind].name);
        if (counting_list) {
          console.log(counting_list);
          var index = counting_list.indexOf(Math.max(...counting_list));
          console.log(index);
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
        if (time_list) {
          console.log(time_list);
        }
        else {
          wx.setStorageSync(that.data.list[kind].name, Array.apply(null, Array(30)).map(Number.prototype.valueOf, 0));
          console.log(wx.getStorageSync(that.data.list[kind].name));
        }
      }
      // for (var index in that.data.category[kind]){
      //   console.log(that.data.category[kind][index].pinyin);
      //   var value = wx.getStorageSync(that.data.category[kind][index].name);
      //   if (value) {
      //     if (value > that.data.max_counting) {
      //       that.setData({
      //         max_counting: value
      //       })
      //     }
      //   }else {
      //     wx.setStorage({
      //       key: that.data.category[kind][index].name,
      //       data:0
      //     })
      //     // wx.setStorageSync(that.data.category[kind][index].name, 0)
      //     // console.log(wx.getStorageSync(that.data.category[kind][index].name))
      //   }
        // wx.getStorage({
        //   key: that.data.category[kind][index].name,
        //   success: function (res) {
        //     console.log(res)
        //     if (res.data){
        //       if(res.data > that.data.max_counting){
        //         that.setData({
        //           max_counting: res.data
        //         })
        //       }
        //     }else{
        //       wx.setStorageSync(that.data.category[kind][index].name,0)
        //     }
        //   },
        //   fail: function(res){
        //     console.log(that.data.category[kind][index].name)
        //   }
        // })
      //}
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
    var time = e.currentTarget.dataset.time;
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
      name: name
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