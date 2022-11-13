//https://blog.csdn.net/yunfeather/article/details/109048076
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.ctx = wx.createCanvasContext('clockCanvas')
    this.drawClock()
    var that = this
    this.interval=setInterval(function(){
      that.drawClock()
    },1000)
 
  },
 
  /**
   * 绘制时钟
   */
  drawClock:function(){
    /**
     * 准备工作
     */
    let width = 300,height=300
    var ctx= this.ctx
    ctx.translate(width/2,height/2)
    ctx.rotate(-Math.PI/2)
 
  /**
     * 绘制时钟刻度
     */
    ctx.lineWidth=6
    ctx.lineCap='round'
    for(let i=0;i<12;i++){
      ctx.beginPath()
      ctx.moveTo(80,0)
      ctx.lineTo(100,0)
      ctx.stroke()
      ctx.rotate(Math.PI/6)
    }
  
 
 
  
    ctx.lineWidth=5
    ctx.lineCap='round'
    for(let i = 0;i<60;i++){
      ctx.beginPath()
      ctx.moveTo(88,0)
      ctx.lineTo(100,0)
      ctx.stroke()
      ctx.rotate(Math.PI/30)
    }
 
 
    /**
     * 获取按当前时间
     */
    let time = this.getTime()
    let h = time[0]
    let m = time[1]
    let s = time[2]
 
    /**
     * 绘制时钟指针
     */
    ctx.save()
    ctx.rotate(h * Math.PI/6 + m * Math.PI/360 + s * Math.PI/21600)
    ctx.lineWidth=12
    ctx.beginPath()
    ctx.moveTo(-20,0)
    ctx.lineTo(60,0)
    ctx.stroke()
    ctx.restore()
 /**
     * 绘制时钟分针
     */
    ctx.save()
    ctx.rotate(m * Math.PI/30 + s * Math.PI/1800)
    ctx.lineWidth=8
    ctx.beginPath()
    ctx.moveTo(-20,0)
    ctx.lineTo(82,0)
    ctx.stroke()
    ctx.restore()
 /**
     * 绘制时钟妙针
     */
    ctx.save()
    ctx.rotate(s*Math.PI/30)
    ctx.strokeStyle = 'red'
    ctx.lineWidth = 6
    ctx.beginPath()
    ctx.moveTo(-30,0)
    ctx.lineTo(90,0)
    ctx.stroke()
 
    ctx.fillStyle='red'
    ctx.beginPath()
    ctx.arc(0,0,10,0,Math.PI*2,true)
    ctx.fill()
    ctx.restore()
 
 
    /**
     * 绘制
     */
    ctx.draw()
 
    /**
     * 更新页面显示时间
     */
    this.setData({
      h:h>9?h:'0'+h,
      m:m>9?m:'0'+m,
      s:s>9?s:'0'+s
    })
  },
  getTime:function(){
    let now = new Date()
    let time=[]
    time[0]=now.getHours()
    time[1]=now.getMinutes()
    time[2]=now.getSeconds()
 
    if(time[0]>12){
      time[0]-=12
    }
    return time
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
    clearInterval(this.interval)
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