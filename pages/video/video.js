// pages/video/video.js
import request from "../../utils/request";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList: [], // 导航标签数据
    navId: '', // 导航的标识
    videoList: [], // 视频列表数据
    videoId: '', //视频id
    videoUpdateTime: {}, // 记录video播放的时长
    isTriggered: false, // 标识下拉刷新是否被触发
    listId: 1,
    isShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('userInfo')) {
      this.setData({
        isShow: true
      })
      this.getVideoGroupListData();
    }
    
  },
  login() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  // 获取导航数据
  getVideoGroupListData(){
    request('/video/group/list').then(
      res => {
        wx.showLoading({
          title: '正在加载'
        })
        this.setData({
          videoGroupList: res.data.slice(0, 14),
          navId: res.data[0].id
        })
      // 获取视频列表数据
        this.getVideoList(this.data.navId)
      }
    ).catch(error => {console.log('test',err)});
  
  },
  changeNav(event) {
    // console.log('test', event)
    let navId = event.currentTarget.id // 通过id向event传参的时候如果传的是number会自动转换成string
    // let navId = event.currentTarget.dataset.id;
    this.setData({
      navId: navId - 0,
      videoList: []
    })
    wx.showLoading({
      title: '正在加载'
    })
    // 动态获取当前导航对应的视频数据
    this.getVideoList(this.data.navId);
  },
  // 获取视频列表方法
  getVideoList(navId) {
    if(!navId){ // 判断navId为空串的情况
      return;
    }
    request('/video/group', { id: navId, offset: 1 }).then(res => {
      console.log('test', res)
      let index = 0;
      let videoList = res.datas.map(item => {
        item.id = index++;
        return item;
      })
      this.setData({
        videoList,
        isTriggered: false, // 关闭下拉刷新
        listId: 1 // 将下拉显示id还原为1
      })
    }).catch((err) => {
      console.log('test', err)
    })
    // 关闭消息提示框
    wx.hideLoading();
  },
  // 点击播放/继续回调
  handlePlay(e) {
    // console.log('test11', e)
    const id = e.currentTarget.id
    let {videoUpdateTime} = this.data;
    this.setData({
      videoId: id
    })
    this.vid !== id && this.videoContext && this.videoContext.stop()
    setTimeout(() => {
      this.vid = id
      this.videoContext = wx.createVideoContext(id)
      // if (videoUpdateTime[id]) {
      //   this.videoContext.seek(videoUpdateTime[id])
      // }
      // this.videoContext.play()
      setTimeout(() => {
        this.videoContext.play()
      }, 10)
    }, 100)
    
  },
  // 监听视频播放进度的回调
  handleTimeUpdate(event) {
    let { videoUpdateTime } = this.data;
    let obj = JSON.parse(JSON.stringify(videoUpdateTime))
    obj[event.currentTarget.id] = event.detail.currentTime
    // 更新videoUpdateTime的状态
    this.setData({
      videoUpdateTime:obj
    })
    // console.log('test',event)
  },
   // 视频播放结束调用的回调
  handleEnded(event) {
    // console.log('test',event)
    // 移除记录播放时长数组中当前视频的对象
    let {videoUpdateTime} = this.data
    delete videoUpdateTime[event.currentTarget.id]
    this.setData({
      videoUpdateTime
    })
  },
  // 自定义下拉刷新的回调： scroll-view
  handleRefresher(){
    console.log('scroll-view 下拉刷新');
    // 再次发请求，获取最新的视频列表数据
    wx.showLoading({
      title: '正在加载'
    })
    this.getVideoList(this.data.navId);
  },
  // 下拉加载
  async handleToLower() {
    this.setData({
      listId:++this.data.listId
    })
    wx.showLoading({
      title: '正在加载'
    })
    let videoListData = await request('/video/group', { id: this.data.navId, offset: this.data.listId })
    let index = (this.data.listId - 1) * 10;
    let videoListAdd = videoListData.datas.map(item => {
      item.id = index++;
      return item;
    })
    let videoList = this.data.videoList;
    videoList.push(...videoListAdd)
    this.setData({
      videoList
    })
    wx.hideLoading()
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
  onShareAppMessage: function ({from}) {
    console.log('test', from)
    if (from === 'menu') {
      return {
        title: '自定义分享',
        page: '/pages/video/video',
        imageUrl: '/static/images/logo.png'
      }
    }
  }
})