// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {},  
  onLoad() {},
  toAddCar () {
    wx.navigateTo({ url: '/pages/addcar/addcar' })
  }
})
