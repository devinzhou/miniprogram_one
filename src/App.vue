<script>
import request from './utils/request'

export default {
  created () {
    console && console.log("in APP.vue");
    let that = this;
    wx.login({
      success: function(res) {
        debugger;
        if (res.code) {
          //发起网络请求
          that.onCallbackGetUserInfo(res);
          // getApp.loginRes = res;
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  onShow() {
    debugger;
  },
  methods: {
    getUserInfo () {
      let that = this;

      if (getApp().loginRes && getApp.loginRes.code) {
        that.onCallbackGetUserInfo(getApp().loginRes);
      } else {
        wx.login({
          success: function (res) {
            // getApp().loginRes = res;
            that.onCallbackGetUserInfo(res);
          }
        });
      }
    },
    onCallbackGetUserInfo(resLogin) {
      debugger;
      let app = getApp();
      let that = this;
      wx.getUserInfo({
        success: (res) => {
          that.userInfoWX = res.userInfo;
          console.log(JSON.stringify(res));
          wx.request({
            url: 'https://www.wuyouzhidi.com/login',
            data: {
              imageUrl: that.userInfoWX.avatarUrl,
              name: that.userInfoWX.nickName,
              source: "weixin",
              login: resLogin.code,
              wx_extra: {
                signature: res.signature,
                encryptedData: res.encryptedData,
                iv: res.iv,
                code: resLogin.code
              }
            },
            header: {
              'content-type': 'application/json'
            },
            method:'POST',
            success: function(result){
              if (result.data.success) {
                that.isLogin = true;
                that.userInfo = result.data.data.userInfo;
                if (that.userInfo) {
                  that.userIcon = that.userInfo.imageUrl;
                  that.nickName = that.userInfo.name;
                  that.testUser = that.userInfo.testUser;
                  try {
                    that.personBar[2].value = that.userInfo.helpPeopleNum;
                    that.personBar[0].value = that.userInfo.carefreeCoin;
                  } catch (e) {
                    console.log(e);
                  }
                }

                app.userInfo = that.userInfo;
                app.homepageData = {
                  firstPartData: result.data.data.themeIndexList,
                  secondPartData: result.data.data.themeIndexTestList,
                  testThemeCommentList: result.data.data.testThemeCommentList
                }
                app.onReceiveData && app.onReceiveData();

                if (getApp().recommendUserId) {
                  debugger;
                  request.recommendUpload(getApp().recommendUserId, app.userInfo.id);
                  delete getApp().recommendUserId;
                }
              }
            },
            fail: function (res) {

            }
          })

        }
      }, function () {
      })
    }
  }
}
</script>

<style>
</style>
