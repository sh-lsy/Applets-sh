// pages/login/login.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: '',
    prevpage: '' // 上一个路由地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pages = getCurrentPages(); //页面对象
    let prevpage = pages[pages.length - 2]; //上一个页面对象
    this.setData({
      prevpage: '/' + prevpage.route
    })
  },
    // 登录的回调
    async login(){
      // 1. 收集表单项数据
      let {phone, password} = this.data;
      // 2. 前端验证
      /*
      * 手机号验证：
      *   1. 内容为空
      *   2. 手机号格式不正确
      *   3. 手机号格式正确，验证通过
      * */
      
      if(!phone){
        // 提示用户
        wx.showToast({
          title: '手机号不能为空',
          icon: 'error'
        })
        return;
      }
      // 定义正则表达式
      let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
      if(!phoneReg.test(phone)){
        wx.showToast({
          title: '手机号格式错误',
          icon: 'error'
        })
        return;
      }
      
      if(!password){
        wx.showToast({
          title: '密码不能为空',
          icon: 'error'
        })
        return;
      }
    
      // 后端验证
      let result = await request('/login/cellphone', { phone, password, isLogin: true })
      console.log('test',result)
      if(result.code === 200){ // 登录成功
        wx.showToast({
          title: '登录成功'
        })
        // 将用户的信息存储至本地
        wx.setStorageSync('userInfo', JSON.stringify(result.profile))
        
        
        // 跳转至个人中心personal页面
        console.log('test', this.data.prevpage)
        wx.reLaunch({
          url: this.data.prevpage
        })
      }else if(result.code === 400){
        wx.showToast({
          title: '手机号错误',
          icon: 'error'
        })
      }else if(result.code === 502){
        wx.showToast({
          title: '密码错误',
          icon: 'none'
        })
      }else {
        wx.showToast({
          title: '登录失败，请重新登录',
          icon: 'none'
        })
      }
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