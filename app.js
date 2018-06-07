//app.js
App({
  onLaunch: function () {
  },
  globalData: {
    timer_list: [],
    open_id: '火锅博士'
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '涮肉博士',
      path: '/pages/index/index'
    }
  }
})