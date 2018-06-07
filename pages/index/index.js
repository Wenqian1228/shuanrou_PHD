//获取应用实例
const app = getApp();
var utils = require('../../utils/ingredients.js');
var foodList = [];
var selectedFoodList = [];
var selectedFoodListName = [];

Page({
  data: {
    kinds: ['肉、蛋类','蔬菜类','内脏类','丸、滑类','豆、菌类','海产类','主食类'],
    recommendation: [],
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
        id: 'meat_eggs',
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
    ],

    //searchbar
    inputShowed: false,
    inputVal: "",
    foodList: foodList,
    selectedFoodList: selectedFoodList,
    selectedFoodListName: selectedFoodListName
  },

  //search
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  onLoad: function () {
    var that = this;
    for(var kind in that.data.list){
      //console.log(that.data.list[kind]);
        var counting_list = wx.getStorageSync(that.data.list[kind].id);
        if (counting_list) {
          //console.log(counting_list);
          var index = counting_list.indexOf(Math.max(...counting_list));
          // console.log(index);
          if (counting_list[index]>=0){
            var rec = "recommendation["+kind+"]";
            var rec_thing = {
              pinyin: that.data.list[kind].pages[index].pinyin,
              name: that.data.list[kind].pages[index].name,
              intro: that.data.list[kind].pages[index].intro,
              tag: that.data.list[kind].pages[index].tag,
              index: index
            };
            //console.log(rec_thing);
            that.setData({
              [rec]: rec_thing
            });
            //console.log(this.data.recommendation);
          }
        }
        else {
          wx.setStorageSync(that.data.list[kind].id, Array.apply(null, Array(30)).map(Number.prototype.valueOf, 0));
          //console.log(wx.getStorageSync(that.data.list[kind].id));
        }
    }
    var time_list = wx.getStorageSync("food");
    if (time_list) {
      //console.log(time_list);
    }
    else {
      wx.setStorageSync("food", utils.food);
      //console.log(wx.getStorageSync("food"));
    }

    //searchbar
    var food = wx.getStorageSync("food");
    console.log("hahahahha" + food.balls_wahs[0].name);
    var length = food.balls_wahs.length;
    var i = 0;
    for (i = 0; i < length; i++) {
      foodList.push(food.balls_wahs[i]);
    }
    length = food.mainfood.length;
    for (i = 0; i < length; i++) {
      foodList.push(food.mainfood[i]);
    }
    length = food.meat_eggs.length;
    for (i = 0; i < length; i++) {
      foodList.push(food.meat_eggs[i]);
    }
    length = food.organs.length;
    for (i = 0; i < length; i++) {
      foodList.push(food.organs[i]);
    }
    length = food.seafood.length;
    for (i = 0; i < length; i++) {
      foodList.push(food.seafood[i]);
    }
    length = food.soy_fungus.length;
    for (i = 0; i < length; i++) {
      foodList.push(food.soy_fungus[i]);
    }
    length = food.vegetable.length;
    for (i = 0; i < length; i++) {
      foodList.push(food.vegetable[i]);
    }

    console.log("food list length: " + foodList.length);

  },
  onShow: function(){
    var that = this;
    for (var kind in that.data.list) {
      //console.log(that.data.list[kind]);
      var counting_list = wx.getStorageSync(that.data.list[kind].id);
      if (counting_list) {
        //console.log(counting_list);
        var index = counting_list.indexOf(Math.max(...counting_list));
        // console.log(index);
        if (counting_list[index] >= 0) {
          var rec = "recommendation[" + kind + "]";
          var rec_thing = {
            pinyin: that.data.list[kind].pages[index].pinyin,
            name: that.data.list[kind].pages[index].name,
            intro: that.data.list[kind].pages[index].intro,
            tag: that.data.list[kind].pages[index].tag,
            index: index
          };
          //console.log(rec_thing);
          that.setData({
            [rec]: rec_thing
          });
          //console.log(this.data.recommendation);
        }
      }
      
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
    var index = e.currentTarget.dataset.index;
    var food = wx.getStorageSync("food");
    // search for time
    var tag_key = utils.tags[tag];
    var time = food[tag_key][index].time;
    //console.log(food[tag_key][index].time);
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
    // check repeat
    var repeat = 0;
    for (var i in app.globalData.timer_list) {
      if (app.globalData.timer_list[i].name == name) {
        repeat = 1;
        wx.showToast({
          title: '无需重复添加',
        });
      }
    }
    //console.log(timer);
    // console.log(app.globalData.timer_list);
    getApp().globalData.timer_list.push(timer);
    //console.log(app.globalData.timer_list);
    if(repeat==0){
      //setstorage
      var that = this;
      var counting_arr = wx.getStorageSync(tag_key);
      counting_arr[index] = counting_arr[index]+1;
      wx.setStorageSync(tag_key, counting_arr);
      //console.log(wx.getStorageSync(tag_key));
      // wx.switchTab({
      //   url: '../timer/timer',
      // })
      wx.showToast({
        title: '已添加' + name,
        icon: 'success',
        duration: 2000
      });
    }
  },
  //searchbar
  confirmSearch: function () {
    selectedFoodList = [];
    selectedFoodListName = [];
    this.setData({
      selectedFoodList: [],
      selectedFoodListName: []
    });

    var length = foodList.length;
    var i = 0;

    console.log(this.data.inputVal);
    for (i = 0; i < length; i++) {
      if (foodList[i].name.includes(this.data.inputVal) && this.data.inputVal.length > 0) {
        selectedFoodList.push(foodList[i]);
        selectedFoodListName.push(foodList[i].name);
      }
    }

    length = selectedFoodList.length;
    for (i = 0; i < length; i++) {
      console.log(selectedFoodList[i].name)
    }

    console.log(selectedFoodList.length)
    this.setData({
      selectedFoodList: selectedFoodList,
      selectedFoodListName: selectedFoodListName
    });
  },
  clearSearch: function () {
    selectedFoodList = [];
    selectedFoodListName = [];
    this.setData({
      selectedFoodList: [],
      selectedFoodListName: []
    });
  }
})