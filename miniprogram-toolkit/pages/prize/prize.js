//源码：https://blog.csdn.net/weixin_42063951/article/details/116501449
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prize_arr: [
      {id: '1',type: 'prize',name: '奖品1',isSelected: false},
      {id: '2',type: 'prize',name: '奖品2',isSelected: false},
      {id: '3',type: 'prize',name: '奖品3',isSelected: false},
      {id: '4',type: 'prize',name: '奖品8',isSelected: false},
      {id: '5',type: 'btn',name: '开始',isSelected: false},
      {id: '6',type: 'prize',name: '奖品4',isSelected: false},
      {id: '7',type: 'prize',name: '奖品7',isSelected: false},
      {id: '8',type: 'prize',name: '奖品6',isSelected: false},
      {id: '9',type: 'prize',name: '奖品5',isSelected: false},
    ],
    // 抽奖状态，是否转完了
    isTurnOver: true,
    //抽奖结果
    prize_res_lists:[
      {
       "index":"",
       "prize":"",
       "num":1
      }
    ]
  },

  //保存抽奖结果
  add_prize_res: function(newData){
    var  lists = this.data.prize_res_lists;
    lists.push(newData);//实质是添加lists数组内容，使for循环多一次
    this.setData({
      prize_res_lists : lists,
    })  
  },

  // 点击抽奖
  clickPrize() {
    // 如果不在抽奖状态中，则执行抽奖旋转动画
    if (this.data.isTurnOver) {
      // 把抽奖状态改为未完成
      this.setData({
        isTurnOver: false
      })
      // 这里开始假设已经调取后端接口拿到抽奖后返回的ID
      let prize_id = Math.floor(Math.random() * 8 + 1);;
      // 调用抽奖方法
      this.lottery(prize_id);
      
      let newData ={"index":this.data.prize_res_lists.length,"prize":this.data.prize_arr[prize_id-1].name,"num":1};
      
      //保存结果
      //this.add_prize_res(newData);

    } else {
      wx.showToast({
        title: '请勿重复点击',
        icon: 'none'
      })
    }
  },

  // 抽奖旋转动画方法
  lottery(prize_id) {
    console.log('中奖ID：' + prize_id)
    /*
     * 数组的长度就是最多所转的圈数，最后一圈会转到中奖后的位置
     * 数组里面的数字表示从一个奖品跳到另一个奖品所需要的时间
     * 数字越小速度越快
     * 想要修改圈数和速度的，更改数组个数和大小即可
     */
    let num_interval_arr = [90, 80, 70, 60, 50, 50, 50, 100, 150, 250];
    // 旋转的总次数
    let sum_rotate = num_interval_arr.length;
    // 每一圈所需要的时间
    let interval = 0;
    num_interval_arr.forEach((delay, index) => {
      setTimeout(() => {
        this.rotateCircle(delay, index + 1, sum_rotate, prize_id);
      }, interval)
      //因为每一圈转完所用的时间是不一样的，所以要做一个叠加操作
      interval += delay * 8;
    })
  },

  /*
   * 封装旋转一圈的动画函数，最后一圈可能不满一圈
   * delay:表示一个奖品跳到另一个奖品所需要的时间
   * index:表示执行到第几圈
   * sum_rotate：表示旋转的总圈数
   * prize_id：中奖后的id号
   */
  rotateCircle(delay, index, sum_rotate, prize_id) {
    // console.log(index)
    let _this = this;
    /*
     * 页面中奖项的实际数组下标
     * 0  1  2
     * 3     5
     * 6  7  8
     * 所以得出转圈的执行顺序数组为 ↓
     */
    let order_arr = [0, 1, 2, 5, 8, 7, 6, 3];
    // 页面奖品总数组
    let prize_arr = this.data.prize_arr;
    // 如果转到最后以前，把数组截取到奖品项的位置
    if (index == sum_rotate) {
      order_arr.splice(prize_id)
    }
    for (let i = 0; i < order_arr.length; i++) {
      setTimeout(() => {
        // 清理掉选中的状态
        prize_arr.forEach(e => {
          e.isSelected = false
        })
        // 执行到第几个就改变它的选中状态
        prize_arr[order_arr[i]].isSelected = true;
        // 更新状态
        _this.setData({
          prize_arr: prize_arr
        })
        // 如果转到最后一圈且转完了，把抽奖状态改为已经转完了
        if (index == sum_rotate && i == order_arr.length - 1) {
          _this.setData({
            isTurnOver: true
          })
        }
      }, delay * i)
    }
  }

})

