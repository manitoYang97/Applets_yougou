import { request } from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //商品分类数据
        Cates: [],
        //左边的菜单
        leftMenuList: [],
        //右边的数据
        rightContent: [],
        //被点击的索引
        currentIndex: 0,
        // 右侧菜单距离顶部的距离
        scrollTop: 0

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //1.获取本地存储数据
        const Cates = wx.getStorageSync('cates');
        if (!Cates) {
            //没有旧数据
            this.getCates()
        } else {
            //时间过期
            if (Date.now() - Cates.time > 300000) { this.getCates() } else {
                //用旧的数据
                this.Cates = Cates.data
                let leftMenuList = this.Cates.map(v => v.cat_name)
                let rightContent = this.Cates[0].children
                this.setData({
                    leftMenuList,
                    rightContent
                })
            }
        }
    },
    async getCates() {
        // request({
        //     url: '/categories'
        // }).then(res => {
        //     // console.log(res);
        //     this.Cates = res.data.message;
        //     //2.把接口中的数据存入本地
        //     wx.setStorageSync('cates', { time: Date.now(), data: this.Cates });

        //     let leftMenuList = this.Cates.map(v => v.cat_name)
        //     let rightContent = this.Cates[0].children
        //     this.setData({
        //         leftMenuList,
        //         rightContent
        //     })
        // })

        // 使用async await 发送请求
        const res = await request({ url: '/categories' })
        this.Cates = res;
        //2.把接口中的数据存入本地
        wx.setStorageSync('cates', { time: Date.now(), data: this.Cates });

        let leftMenuList = this.Cates.map(v => v.cat_name)
        let rightContent = this.Cates[0].children
        this.setData({
            leftMenuList,
            rightContent
        })

    },
    handleItemTap(e) {
        const { index } = e.currentTarget.dataset
        let rightContent = this.Cates[index].children
        this.setData({
            currentIndex: index,
            rightContent,
            //重新设置右侧菜单距离顶部的距离
            scrollTop: 0,
        })
    }
})