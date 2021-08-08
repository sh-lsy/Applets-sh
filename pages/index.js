// pages/index.js
import request from '../utils/request'
import mydata from '../data/data'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    recList: [],
    topList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.request({
    //   url: 'http://localhost:3000/banner',
    //   data: { type: 2 },
      
    //   success: (res) => {
    //     console.log('test', res)
    //   },
    //   error: (err) => {
    //     console.log('test', err)
    //   }
    // })
    // 轮播图数据
    request('/banner',{ type: "2" },).then(res => {
      // console.log('test',res)
      this.setData({
        bannerList:res.banners
      })
    }).catch(err => {
      console.log('test',err)
    })
    // 推荐歌单数据 (暂时写死)
    request('/personalized',{limit: 10},).then(res => {
      this.setData({
        recList: res.result
      })
    }).catch(err => {
      console.log('test',err)
    })
    // 推荐列表
    let index = 0;
    let resultArr = [];
    while (index < 5) {
      request('/top/list', { idx: index++ },).then(res => {
        let topListItem = { name: res.playlist.name, tracks: res.playlist.tracks.slice(0, 3) };
        resultArr.push(topListItem);
        this.setData({
          topList: resultArr
        })
      }).catch(err => {
        console.log('test',err)
      })
    }
  },
  // 到每日推荐
  toRecommend() {
    wx.navigateTo({
      url: '/pages/recommendSong/recommendSong',
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})