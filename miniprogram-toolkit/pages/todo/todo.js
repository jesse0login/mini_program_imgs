//https://blog.csdn.net/qq_43804570/article/details/106491669
Page({
  data: {
    //文本框的数据模型
    input: '',
    //任务清单数据模型 
    todos: [],
    leftCount: 0,
    allComplete : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //这里面得做同步操作，不然会报错
    var todos = wx.getStorageSync('todos')
    var leftCount = wx.getStorageSync('leftCount')
    var allComplete = wx.getStorageSync('allComplete')
    console.log("todos=" + todos)
    console.log("leftCount=" + leftCount)
    console.log("allComplete=" + allComplete)
    
    var todosDefault= []
    this.setData({
      todos: todos.length == 0 ? todosDefault : todos,
      leftCount: leftCount.length == 0 ? 0 : leftCount,
      allComplete: allComplete.length == 0 ? false : allComplete
    })
  },

  //新增
  addTodoHandle: function () {
    if (!this.data.input) return
    var todos = this.data.todos
    todos.push({
      name: this.data.input,
      complete: false
    })

    var leftCount = this.data.leftCount + 1

    //必须显式的通过setData来改变数据，这样界面才会得到变化
    this.setData({
      todos: todos,
      input: '',
      leftCount: leftCount,
      allComplete:false
    })

    //数据持久化
    this.saveData(todos,leftCount,false)    
  },

  //2，拿到文本框里面的值
  //2.1由于小程序的数据绑定是单向的，必须要给文本注册改变事件
  inputChangeHandle: function (e) {
    this.setData({
      input: e.detail.value
    })
  },

  toggleToHandle: function (e) {
    //变换当前选中item的完成状态
    console.log(this.data.leftCount)
    var item = this.data.todos[e.currentTarget.dataset.index]
    item.complete = !item.complete
    var leftCount = this.data.leftCount.length == 0 ? 0 : (this.data.leftCount + (item.complete ? -1 : 1))
    var allComplete = leftCount > 0 ? false : true

    this.setData({
      todos: this.data.todos,
      leftCount: leftCount,
      allComplete : allComplete
    })

    this.saveData(this.data.todos,leftCount,allComplete)
  },
  //这个方面需要注意冒泡问题
  DeleteHandle: function (e) {
    //删除任务操作
    var todos = this.data.todos
    //item就是splice方法中删除掉的元素
    var item = todos.splice(e.currentTarget.dataset.index, 1)[0] //删除数组中对象的方法，1是从固定下标开始删除几个数组元素
    var leftCount = (this.data.leftCount.length == 0 ? 0 : this.data.leftCount.length) - (item.complete ? 0 : 1)
    var allComplete = leftCount > 0 ? false : true
    this.setData({
      todos: todos,
      leftCount: leftCount,
      allComplete : allComplete
    })
    this.saveData(this.data.todos,leftCount,allComplete)
  },
  toggleAllHandle: function () {
    this.data.allComplete = !this.data.allComplete
    var todos = this.data.todos
    var that = this
    todos.forEach(function (item) { //for循环  
      item.complete = that.data.allComplete
    })
    var leftCount = this.data.allComplete ? 0 : this.data.todos.length
    this.setData({
      todos: todos,
      leftCount: leftCount,
      allComplete : this.data.allComplete
    })
    
    this.saveData(this.data.todos,leftCount,this.data.allComplete)

  },
  clearHandle: function () {
    var todos = [] //定义空数组
    this.data.todos.forEach(function (item) {
      if (!item.complete) {
        todos.push(item) //把所有未完成的任务存储到一个新的数组
      }
    })

    var allComplete = todos.length == 0 ? true : false
    this.setData({
      todos: todos,
      leftCount: todos.length,
      allComplete:allComplete
    })

    this.saveData(todos,0,allComplete)
  },

  //数据持久化
  saveData: function (todos,leftCount,allComplete) {
    wx.setStorage({
      key: "todos",
      data: todos
    })
    wx.setStorage({
      key: "leftCount",
      data: leftCount
    })
    wx.setStorage({
      key: "allComplete",
      data: allComplete
    })
  },
})