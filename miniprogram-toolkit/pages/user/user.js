// page/component/new-pages/user/user.js
Page({
  data:{
    thumb:'',
    nickname:'',
    orders:[    ],
    hasAddress:false,
    address:{},
    hasUserInfo: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), 
    menuitems: [
      { text: '联系客服', url: '', icon: '../../images/user/service.png', tips: '' },
      { text: '清除缓存', url: '', icon: '../../images/user/delete.png', tips: '' }
    ]  
  },
  /**
   * 清空缓存
   */
  clearStorage:function (e) {
      try {
        wx.clearStorage()
        wx.clearStorageSync()
        wx.showToast({
          title: '缓存清除成功！',  // 标题
          icon: 'success',   // 图标类型，默认success
          duration: 1500   // 提示窗停留时间，默认1500ms
        })
      } catch(e) {
        wx.showToast({
          title: '缓存清除失败！',  // 标题
          icon: 'error',   // 图标类型，默认success
          duration: 1500   // 提示窗停留时间，默认1500ms
        })
      }
  },
  getUserProfile: function(res) {
      wx.getUserProfile({
        desc: '用于完善会员资料',
        success: (res)=>{
          console.log("获取到的用户信息成功: ",JSON.stringify(res));
          this.setData({
            userInfo: res,
            userInfoStr: JSON.stringify(res),
            thumb: res.userInfo.avatarUrl,
            nickname: res.userInfo.nickName,
            hasUserInfo : true
          });
          wx.setStorage({
            key:"thumb",
            data:res.userInfo.avatarUrl
          });
          wx.setStorage({
            key:"nickname",
            data:res.userInfo.nickname
          });
          this.onLoad()
        },
        fail: (res)=>{
          console.log("获取用户个人信息失败: ",res);
          //用户按了拒绝按钮
          wx.showModal({
              title: '警告',
              content: '授权失败，请授权之后再进入!!!',
              showCancel: false,
              confirmText: '返回授权',
              success: function(res) {
                if (res.confirm) {
                  console.log('用户点击了“返回授权”'); 
                }
              }
          });
        }
      })
  },

  onShow(){
    var self = this;
    /**
     * 获取本地缓存 
     */
  
  },
  onLoad(){
    var self = this;
    wx.getUserInfo({
      success: function(res){
        console.log('getUserInfo()  success'); 
        self.setData({
          thumb: res.userInfo.avatarUrl,
          nickname: res.userInfo.nickName
        })
      }
    });

    // if (wx.getUserProfile) {
    //   this.setData({
    //     canIUseGetUserProfile: true
    //   })
    // }
    /**
     * 发起请求获取订单列表信息
     */
    /*wx.request({
      url: '',
      success(res){
        self.setData({
          orders: res.data
        })
      }
    }),*/

    //查看是否授权
    // wx.getSetting({
    //   success: function(res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       console.log("用户授权了");
    //     } else {
    //       //用户没有授权
    //       console.log("用户没有授权");
    //     }
    //   }
    // }) 

  },

  /**分享按钮事件 */
  onShareAppMessage(res) {
    let id = wx.getStorageSync('shareId') // 分享产品的Id
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '薄荷味小程序-工具箱',
      path: 'pages/index/index?id=${id}', // 分享后打开的页面
      imageUrl: '../../images/gzh_qrcode.jpg'
    }
  },
  
  
  /**
   * 发起支付请求
   */
  /*payOrders(){
    wx.requestPayment({
      timeStamp: 'String1',
      nonceStr: 'String2',
      package: 'String3',
      signType: 'MD5',
      paySign: 'String4',
      success: function(res){
        console.log(res)
      },
      fail: function(res) {
        wx.showModal({
          title:'支付提示',
          content:'<text>',
          showCancel: false
        })
      }
    })
  }*/
})