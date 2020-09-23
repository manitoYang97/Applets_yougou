//同时发送异步代码的次数
let asyncTimes = 0;
export const request = (params) => {
    asyncTimes++
    //加载图标的效果
    wx: wx.showLoading({
        title: '加载中',
        mask: true
    });


    //定义公共的url
    const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: baseUrl + params.url,
            success: (result) => {
                resolve(result.data.message);
            },
            fail: (err) => {
                reject(err);
            },
            //无论是否成功都会调用
            complete: () => {
                asyncTimes--
                if (asyncTimes === 0) {
                    wx.hideLoading();
                }
            }
        });
    })
}