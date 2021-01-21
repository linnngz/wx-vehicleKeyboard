// pages/addcar.js
Page({
  data: {
    
  },
  onLoad: function (options) {

  },
  // 获取输入的车牌号
  handletapkey (e) {
    const platenum = e.detail.platenum
    console.log(platenum);
  }
})