// index.js
const commonFun = require('../common/common');

Page({
  data: {
    imgUrls: [
      //https://jesse0login.github.io/mini_program_imgs/images/swiper/b1.jpg可以换成url链接
      '../../images/swiper/b1.jpg',
      '../../images/swiper/b2.jpg',
      '../../images/swiper/b3.jpg'
    ],
    category: [
      '去水印工具',
      '娱乐工具',
      '其他工具'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800
  },

  onLoad: function (options) {
    commonFun.sharePage();   
  },
  

})