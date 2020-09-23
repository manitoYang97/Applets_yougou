import { request } from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
            id: 0,
            value: '综合',
            isActive: true
        }, {
            id: 1,
            value: '销量',
            isActive: false
        }, {
            id: 2,
            value: '价格',
            isActive: false
        }],
        goodsList: [],
        //总页数
        totalPage: 1,

    },
    QueryParams: {
        query: '',
        cid: '',
        //当前页
        pagenum: 1,
        //当前页条数
        pagesize: 10
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.QueryParams.cid = options.cid
        this.getGoodsList()

    },

    //子组件传过来的tab栏切换事件
    handleTabsItemChange(e) {
        // console.log(e);
        const { index } = e.detail;
        let { tabs } = this.data;
        tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
        this.setData({
            tabs
        })
    },
    //获取商品列表数据
    async getGoodsList() {
        const res = await request({ url: '/goods/search', data: this.QueryParams });
        //总条数
        const total = res.total;
        //计算总页数
        this.totalPage = Math.ceil(total / this.QueryParams.pagesize)
        this.setData({
            goodsList: [...this.data.goodsList, ...res.goods]
        });
        //关闭下拉等待效果
        wx: wx.stopPullDownRefresh()

    },
    //页面上划，滚动条触底事件
    onReachBottom() {
        if (this.QueryParams.pagenum >= this.totalPage) {
            // console.log('已触底');
            wx: wx.showToast({ title: '没有下一页数据了', });

        }
        else {
            // console.log('正在加载');
            this.QueryParams.pagenum++
                this.getGoodsList()
        }
    },
    //页面下拉事件
    onPullDownRefresh() {
        // 1.重置数据
        this.setData({
                goodsList: []
            })
            //2.重置页码
        this.QueryParams.pagenum = 1
            //3.发送请求
        this.getGoodsList()
    }


})