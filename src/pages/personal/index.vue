<template>
  <list>
    <header>
        <div class="main-header">
            <image :src="headImage" resize="stretch" class="main-header-bg"></image>
            <image class="header-icon" :src="userIcon" resize="contain"></image>
            <text class="nick-name">{{nickName}}</text>
        </div>
    </header>
    <cell>
      <div class="person_info_bar" >
        <div class="person_info_item" v-for="(item, index) in personBar">
          <text class="item-value">{{item.value}}</text>
          <text class="item-title">{{item.title}}</text>
        </div>
      </div>
    </cell>

    <!-- 个人主页每一项 -->
    <cell>
      <div class="item-other">
        <image></image>
        <text></text>
        <image></image>
      </div>
    </cell>

  </list>
</template>
<script>
import card from '@/components/card';
import headerImage from '@/pages/personal/src/tmp_person_header.png';
import defaultUserIcon from '@/pages/personal/src/default_header_icon.png';

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      headImage: headerImage,
      userIcon: defaultUserIcon,
      nickName: '未登陆',
      personBar: [
        {title: '无忧币', value:'23423'},
        {title: '连续打卡', value: '80'},
        {title: '帮助过的人', value: '23456'}
      ]
    }
  },

  components: {
    card
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style scoped>
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
  }

  .person_info_bar {
    width: 750rpx;
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
    line-height: 34rpx;
  }
  .item-value {
    font-size: 30rpx;
    line-height: 32rpx;
    color: #333333;
    font-weight: bold;
  }

  .item-other {
    width: 750rpx;
    height: 120rpx;
    display: flex;
    flex-direction: row;
    justify-items: center;
    padding-left: 30px;
    padding-right: 30px;
  }

  .item-other-icon {

  }

  .item-other-text {

  }

  .item-other-right-arrow {

  }

</style>
