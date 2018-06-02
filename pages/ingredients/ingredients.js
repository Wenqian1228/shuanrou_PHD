const app = getApp()


Page({
  data:{
    
  },
  onLoad: function (options) {
    console.log(options);
    this.setData({
      name: options.title,
      intro: options.intro,
      tag: options.tag,      
    });
    console.log(options.tag);
    
    switch (options.tag) {
      case "蔬菜类":
        this.setData({
          name_color: 'seagreen',
          bg_url: 'https://raw.githubusercontent.com/Wenqian1228/zwq_wx_background/master/IMG_shucai2.jpg'
        })
        break;
      case "肉、蛋类":
        this.setData({
          name_color: 'snow',
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
          name_color: 'darkorange',
          bg_url: 'https://raw.githubusercontent.com/Wenqian1228/zwq_wx_background/master/IMG_haichan.jpg'
        })
        break;
      case "主食类":
        this.setData({
          name_color: 'azure',
          bg_url: 'https://raw.githubusercontent.com/Wenqian1228/zwq_wx_background/master/IMG_zhushi.JPG'
        })
    }
  
   
    
    console.log(this.data.name);
    
    
  }
  
})