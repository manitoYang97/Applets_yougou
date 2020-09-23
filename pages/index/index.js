//引入promise
import { request }    from  '../../request/index.js'
//Page Object
Page({ 
    data: {
        //轮播图数组
        swiperList: [],
        //导航数组
        catesList: [],
        //楼层数组
        floorList: []
    },
    //页面加载就会发生的生命周期事件
    onLoad: function(options) {
        // 1发送异步请求来获取轮播图数据
        // wx.request({
        //     url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
        //     success: (result) => {
        //         // console.log(result);
        //         this.setData({
        //             swiperList: result.data.message
        //         })
        //     }
        // });
        this.getSwiperList()
        this.getCateList()
        this.getFloorList()


    },
    //获取轮播图数据
    getSwiperList() {
        request({
                url: '/home/swiperdata'
            })
            .then(result => {
                this.setData({
                    swiperList: result
                })
            })
    },
    //获取导航数据
    getCateList() {
        request({
                url: '/home/catitems'
            })
            .then(result => {
                this.setData({
                    catesList: result
                })
            })
    },
    //获取楼层数据
    getFloorList() {
        request({
                url: '/home/floordata'
            })
            .then(result => {
                this.setData({
                    floorList: result
                })
            })
    },
    onReady: function() {

    },
    onShow: function() {

    },
    onHide: function() {

    },
    onUnload: function() {

    },
    onPullDownRefresh: function() {

    },
    onReachBottom: function() {

    },
    onShareAppMessage: function() {

    },
    onPageScroll: function() {

    },
    //item(index,pagePath,text)
    onTabItemTap: function(item) {

    }
});