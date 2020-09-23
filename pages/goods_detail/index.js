import { request } from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsObj: {}
    },
    //商品对象
    goodsInfo: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const { goods_id } = options
        this.getGoodsDetail(goods_id)

    },
    //获取商品详情数据
    async getGoodsDetail(goods_id) {
        const goodsObj = await request({ url: '/goods/detail', data: { goods_id } })
            // console.log(goodsObj);
        this.goodsInfo = goodsObj
        this.setData({
            goodsObj: {
                goods_price: goodsObj.goods_price,
                goods_name: goodsObj.goods_name,
                //iphone不适配webp格式图片，找后台改，不改的话就把webp转换为jpg
                goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
                pics: goodsObj.pics
            }
        })

    },

    //点击轮播图放大预览
    handlePreviewImage(e) {
        //1.构造预览的图片数组
        const urls = this.goodsInfo.pics.map(v => v.pics_mid)
            //2.接收传过来代url
        const current = e.currentTarget.dataset.url
        wx.previewImage({
            current,
            urls
        });

    },

    //加入购物车
    handleCarAdd(e) {
        //1.获取缓存中的购物车 数组
        let cart = wx.getStorageSync('cart') || [];
        //2.获取商品对象是否在购物车数组中
        let index = cart.findIndex(v => v.goods_id === this.goodsInfo.goods_id);
        //3.判断购物车里是否有这个商品，没有就添加，有就加一
        if (index === -1) {
            this.goodsInfo.num = 1
            cart.push(this.goodsInfo)
        } else {
            cart[index].num++
        }
        //4.把购物车重新添加到缓存
        wx.setStorageSync("cart", cart);
        //5.弹框提示
        wx.showToast({
            title: '添加成功',
            icon: 'success',
            //设为true防止多次点击
            mask: true

        });

    }
})