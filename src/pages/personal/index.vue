<template>
  <list>
    <header>
        <div class="main-header">
            <image :src="headImage" resize="stretch" class="main-header-bg"></image>
            <image class="header-icon" :src="userIcon" resize="contain"></image>
            <text class="nick-name" v-if="isLogin">{{nickName}}</text>
            <button ref="loginBtn" open-type="getUserInfo" class="login-bar" v-if="!isLogin" @getuserinfo="onCallbackGetUserInfo">未登陆</button>
        </div>
    </header>
    <cell>
      <div class="person_info_bar" >
        <div class="person_info_item" v-for="(item, index) in personBar">
          <text class="item-value">{{item.value}}</text>
          <text class="item-title">{{item.title}}</text>
        </div>
      </div>
      <div style="background-color: #F6f6f6; height: 20rpx;width: 100%;"></div>
    </cell>

    <!-- 个人主页每一项 -->
    <cell v-for="(item, index) in bottomBarData">
      <div class="item-other" @click="bindViewTap(item, $event)">
        <image class="item-other-icon" :src="item.icon"></image>
        <text class="item-other-text">{{item.title}}</text>
        <image class="item-other-right-arrow" :src="rightArrow"></image>
      </div>
      <div style="background-color: #F6f6f6; width: 100%; height: 1rpx;"></div>
    </cell>

  </list>
</template>
<script>
import card from '@/components/card';
import headerImage from '@/pages/personal/src/tmp_person_header.png';
import defaultUserIcon from '@/pages/personal/src/default_header_icon.png';
import rightArrow from '@/pages/personal/src/right.png';
import iconAbout from '@/pages/personal/src/icon_about.png';
import iconInvite from '@/pages/personal/src/icon_inve.png';
import iconComment from '@/pages/personal/src/icon_comment.png';
import iconQuestion from '@/pages/personal/src/icon_question.png';
import iconSetting from '@/pages/personal/src/icon_setting.png';

var app = getApp();

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      userInfoWX: {},
      headImage: headerImage,
      userIcon: defaultUserIcon,
      rightArrow:rightArrow,
      nickName: '',
      isLogin: false,
      personBar: [
        {title: '无忧币', value: 0},
        {title: '连续打卡', value: 0},
        {title: '帮助过的人', value: 0}
      ],
      bottomBarData:[
        {
          icon: iconAbout,
          title: '关于无忧币',
          id:1
        },
        {
          icon: iconComment,
          title: '我的留言',
          id:2
        },
        {
          icon: iconInvite,
          title: '邀请函',
          id:3
        },
        {
          icon: iconQuestion,
          title: '意见反馈',
          id:4
        }
      ]
    }
  },
  created(){
    this.getUserInfo ();
  },

  mounted() {
  },
  components: {
  },
  methods: {
    bindViewTap (item, event) {

      if (item && item.id == 2){

        if (!app.userInfo || !app.userInfo.id) {
          wx.showToast({
            title:'请先登录',
            icon:'none',
            mask:true
          })
          return;
        }

        wx.navigateTo({
          "url": "/pages/commentlist/main"
        })
      }

    },
    getUserInfo () {
      let that = this;
      // 调用登录接口
      wx.login({
        success: function (res) {
          that.onCallbackGetUserInfo(res);
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    onCallbackGetUserInfo(res) {
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
                };
                app.onReceiveData && app.onReceiveData();
              }
            },
            fail: function (res) {
            }
          })

        }
      }, function () {
        debugger;
      })
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style scoped>
  @import "../../../static/css/base_css.wxss";
  .main-header {
    width: 750rpx;
    height: 400rpx;
    display: flex;
    flex-direction: row;
  }

  .nick-name {
    font-size: 30rpx;
    color: white;
    align-self: flex-end;
    margin-left: 10rpx;
    margin-bottom: 40rpx;
  }

  .login-bar {
    font-size: 30rpx;
    align-self: flex-end;
    margin-left: 10rpx;
    margin-bottom: 40rpx;
    background-color: transparent;
    text-decoration: underline;
    color: red;
  }
  .main-header-bg {
    width: 750rpx;
    height: 400rpx;
    position: absolute;
    z-index: -1;
  }

  .header-icon {
    width: 120rpx;
    height:120rpx;
    margin: 20rpx;
    align-self: flex-end;
    border-radius: 50%;
  }

  .person_info_bar {
    width: 100%;
    height: 140rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  .person_info_item {
    width: 200rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .item-title {
    font-size: 24rpx;
    color: #999999;
    margin-top: 10rpx;
    line-height: 34rpx;
  }
  .item-value {
    font-size: 30rpx;
    line-height: 32rpx;
    color: #333333;
    font-weight: bold;
  }

  .item-other {
    width: 100%;
    height: 90rpx;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-items: center;
  }

  .item-other-icon {
    width: 48rpx;
    height: 48rpx;
    margin-left: 30rpx;
  }

  .item-other-text {
    line-height: 90rpx;
    font-size: 36rpx;
    text-align: center;
    margin-left: 20rpx;
    color: #333333;
  }

  .item-other-right-arrow {
    position: absolute;
    right: 0;
    width: 30rpx;
    height: 30rpx;
    margin-right: 30rpx;
  }

</style>
