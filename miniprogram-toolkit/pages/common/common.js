// 封装的公共方法，公各个页面复用

function sharePage() {
  wx.showShareMenu({
    withShareTicket: true,
    menus: ["shareAppMessage", "shareTimeline"],
  });
}

function onShareTimeline (res) {
  return {
    title: "薄荷味小程序-工具箱",
    imageUrl: "",
    query: "",
    success: function (res) {},
  };
}

function onShareAppMessage (res) {
  return {
    title: "薄荷味小程序-工具箱",
    imageUrl: "",
    path: "/pages/index/index",
    success: function (res) {},
  };
}

module.exports = {
  sharePage: sharePage
}