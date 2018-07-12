//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        msg: {},
        info: "由于网络情况不稳定，请重试几次！",
        show: false,
        person: {}
    },
    onLoad: function () {
        let _this = this;
        wx.request({
            url: 'https://api.okayapi.com/?s=Ext.IP.GetInfo',
            data: {},
            header: {
                'content-type': 'application/json'
            },
            success: function(res){
                console.log(res.data.data.data)
                _this.setData({
                    person: res.data.data.data
                })
            }
        })
    },
    onShareAppMessage: function(){
        return {
            title: '全国各地天气早知道',
            path: '/pages/index/index'
        }
    },
    search: function (e) {
        let _this = this;
        // console.log(e);
        
        wx.request({
            url: 'https://www.apiopen.top/weatherApi?city=' + e.detail.value,
            data: {},
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                // console.log(res.data.data)
                if (res.data.data === null) {
                    wx.showToast({
                        title: '请输入正确的城市',
                        icon: 'none',
                        mask: true,
                        duration: 2000
                    })
                    _this.setData({
                        info: "您的城市输入正确吗？",
                        show: false,
                        msg: ""
                    })
                } else {
                    _this.setData({
                        info: "恭喜你！查询成功",
                        msg: res.data.data,
                        show: true
                    })
                }
            }
        })
    }
})
