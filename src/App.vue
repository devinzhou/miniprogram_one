<script>
export default {
  created () {
    console && console.log("in APP.vue");
  },
  methods: {
    getUserInfo () {
      let that = this;
      // 调用登录接口
      wx.login({
        success: function (res) {
          that.onCallbackGetUserInfo(res);
        }
      })
    },
    onCallbackGetUserInfo(res) {
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
              login: that.userInfoWX.nickName
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

                  that.personBar[2].value = that.userInfo.helpPeopleNum;
                  that.personBar[0].value = that.userInfo.carefreeCoin;
                }

                app.userInfo = that.userInfo;
                app.homepageData = {
                  firstPartData: result.data.data.themeIndexList,
                  secondPartData: result.data.data.themeIndexTestList,
                  testThemeCommentList: result.data.data.testThemeCommentList
                }
                app.onReceiveData && app.onReceiveData();
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
