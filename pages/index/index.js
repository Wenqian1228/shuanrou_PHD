//获取应用实例
const app = getApp();
var utils = require('../../utils/ingredients.js');

Page({
  data: {
    kinds: ['肉、蛋类','蔬菜类','内脏类','丸、滑类','豆、菌类','海产类','主食类'],
    recommendation: ['rec1', 'rec2', 'rec3', 'rec4', 'rec1', 'rec2'],
    meat: utils.meat_eggs,
    vegetable: utils.vegetable,
    organs: utils.organs,
    balls_wahs: utils.balls_wahs,
    soy_fungus: utils.soy_fungus,
    seafood: utils.seafood,
    mainfood: utils.mainfood,
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
  
  kindToggle: function (e) {
    console.log("drop-down");
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
    console.log(e.currentTarget.dataset);
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
    console.log(timer);
    // var openid = app.globalData.open_id;
    // console.log(openid);
    // console.log(app.globalData.timer_list);
    getApp().globalData.timer_list.push(timer);
    console.log(app.globalData.timer_list);
    wx.switchTab({
      url: '../timer/timer',
    })
  }
})