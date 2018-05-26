const app = getApp()

Page({
  data:{
    
  },
  onLoad: function (options) {
    console.log(options);
    this.setData({
      name: options.title,
      intro: options.intro
    });
    console.log(this.data.name);
  }
  
})