<template>
  <div>
    <list>
      <header>
        <swiper
          :indicator-dots="indicatorDots" :autoplay="autoplay" :circular="circular" :vertical="vertical"
          :interval="interval" :duration="duration">
          <swiper-item v-for="item in backgroundList">
            <image style="width: 750rpx; height: 350rpx;" :src="item.url" resize="stretch"></image>
          </swiper-item>
        </swiper>
        <div style="width: 100%; height: 20rpx;background-color: #f6f6f6;"></div>
      </header>
      <!-- 第二部分 -->
      <cell>
        <div class="normal-items-title" v-if="secondPartData && secondPartData.items && secondPartData.items.length > 0">
          <text class="normal-items-title-text">{{secondPartData.title}}</text>

          <text class="normal-item-title-more" @click="onJumpMenu">查看更多</text>
        </div>
        <div style="overflow: hidden;padding-left:10rpx;padding-right: 20rpx;" v-if="secondPartData && secondPartData.items && secondPartData.items.length > 0">
          <div class="weui-grid_item" v-for="(item, index) in secondPartData.items" @click="onChannelClick(item, $event)">
            <image class="weui-grid__icon"  :src="item.imageUrl" resize="contain"></image>
            <p class="weui-grid__label" style="font-size: 24rpx;text-align: left;">{{item.title}}</p>
          </div>
        </div>
        <div style="width: 100%; height: 20rpx;background-color: #f6f6f6; margin-top: 10rpx;"></div>
      </cell>

      <!-- 第三部分 -->
      <cell>
        <div style="clear: both; height: 280rpx;">
          <div class="normal-items-title" v-if="thirdPartData && thirdPartData.items && thirdPartData.items.length > 0">
            <text class="normal-items-title-text">{{thirdPartData.title}}</text>
          </div>
          <div class="weui-grid_item" v-for="(item, index) in thirdPartData.items" @click="onChannelClick(item, $event)">
            <image class="weui-grid__icon"  :src="item.imageUrl" resize="contain"></image>
            <p class="weui-grid__label" style="font-size: 24rpx;text-align: left;">{{item.title}}</p>
          </div>
        </div>
      </cell>
      <!-- 精选评论 -->
      <cell v-if="comments && comments.items && comments.items.length > 0">
        <div style="width: 100%; height: 20rpx;background-color: #f6f6f6; margin-top: 10rpx;"></div>
        <div>
          <div class="normal-items-title">
            <text class="normal-items-title-text">{{comments.title}}</text>
          </div>
          <div v-for="(item, index) in comments.items">
            <card :item="item"></card>
          </div>
        </div>
      </cell>
    </list>

    <div class="player-area" v-if="curPlayList.length > 0">
      <image class="player-area-img" :src="curPlayList[audioIndex].imageUrl"></image>
      <text class="play-area-title">{{curPlayList[audioIndex].title}}</text>
      <image
        :src="pauseStatus === false ? images.pauseIcon : images.playIcon"
        class="icon-play" @click="bindTapPlay"></image>
      <text class="play-area-time">{{playState.currentPosition}}/{{playState.duration}}</text>
    </div>

  </div>
</template>

<script>
import { formatTime } from '@/utils/index'
import card from '@/components/comment-item-view';
import listIcon from '../playerpage2/img/list.png';
import pauseIcon from './img/pause.png';
import playIcon from './img/play.png';
import loopEnableIcon from './img/loop.png'
import loopDisableIcon from './img/loop_disable.png'
import nextIcon from '../playerpage2/img/next.png';
import preIcon from '../playerpage2/img/prev.png';
import iconIcon from '../playerpage2/img/icon.png';
import iconComment from '../playerpage2/img/icon_comment.png';
import request from  '@/utils/request'


var app = getApp();

export default {
  components: {
    card
  },
  data () {
    return {
      indicatorDots: true,
      vertical: false,
      autoplay: true,
      circular: true,
      interval: 2000,
      duration: 500,
      previousMargin: 0,
      nextMargin: 0,
      images: {
        listIcon,
        pauseIcon,
        playIcon,
        nextIcon,
        preIcon,
        iconIcon,
        iconComment
      },
      backgroundList:[
        {
          url:'https://s1.ax1x.com/2018/06/18/CxYt76.png'
        },
        {
          url:'https://s1.ax1x.com/2018/06/18/CxYJn1.png'
        },
        {
          url:'https://s1.ax1x.com/2018/06/18/CxYY0x.png'
        }
      ],
      secondPartData: {
        title: '立竿见影的帮助',
        items: []
      },
      thirdPartData: {
        title: '即将上线 & 用户体验',
        items: []
      },
      comments: {
        title: '精选评论',
        items:[]
      },
      audioIndex: 0,
      curPlayList: [],
      pauseStatus: true,
      playState: {
        currentPosition: 0,
        duration: 0
      }
    }
  },
  created () {
    app.onReceiveData = this.onReceiveData;
    this.onReceiveData();
    let self = this;
    app.onOtherPagePlay = function () {
      self.curPlayList = app.curPlayList;
      self.audioIndex = app.curAudioIndex;

      let that = this;
      wx.onBackgroundAudioPause(function () {
        that.pauseStatus = true;
      });

      wx.onBackgroundAudioPlay(function () {
        that.pauseStatus = false;
      });

      let timer = setInterval(function() {
        self.setDuration();
      }, 1000);
      this.timer = timer;
    };
  },
  mounted(){
  },
  onHide() {
  },
  onTabItemTap() {
  },
  onShow() {
    try {
      if (getCurrentPages() && getCurrentPages().length > 0 && getCurrentPages()[0]) {
        getApp().recommendUserId = getCurrentPages()[0].options.id;
      }
      if (app.userInfo && app.userInfo.id) {
        request.recommendUpload(getApp().recommendUserId, app.userInfo.id, function () {
          delete getApp().recommendUserId;
        });
      }
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    onReceiveData(){
      if (!app || !app.homepageData) {
        return;
      }

      if (app.homepageData.backgroundList) {
        this.backgroundList = app.backgroundList;
      }

      this.secondPartData.items = app.homepageData.firstPartData;
      this.thirdPartData.items = app.homepageData.secondPartData;
      this.comments.items = app.homepageData.testThemeCommentList;
    },
    onJumpMenu(event) {
      app.showChannelList = true;
      wx.switchTab({
        url:'/pages/playerpage2/main'
      });
    },
    onChannelClick(item, event) {
      if (!item) return;
      console.log("on channel click : " + item);

      if (item.test && (!app.userInfo || !app.userInfo.testUser)) {
        wx.showModal({
          title:"当前功能仅开放给实验用户!",
          showCancel:false
        });
        return;
      }
      app.playChannel = item.id;
      wx.switchTab({
        url:'/pages/playerpage2/main'
      });
    },
    bindTapPlay: function() {
      console.log('bindTapPlay')
      console.log(this.pauseStatus)
      if (this.pauseStatus === true) {
        this.play()
        this.pauseStatus = false;
      } else {
        wx.pauseBackgroundAudio()
        this.pauseStatus = true;
      }
    },
    play() {
      let {curPlayList, audioIndex} = this;

      if (this.timer) {
        clearInterval(this.timer);
      }

      let that = this;
      wx.onBackgroundAudioPause(function () {
        that.pauseStatus = true;
      });

      wx.onBackgroundAudioPlay(function () {
        that.pauseStatus = false;
      });
      wx.playBackgroundAudio({
        dataUrl: curPlayList[audioIndex].audioUrl,
        title: curPlayList[audioIndex].title,
        coverImgUrl: curPlayList[audioIndex].imageUrl
      });
      let timer = setInterval(function() {
        that.setDuration();
      }, 1000);
      this.timer = timer;
    },
    setDuration() {
      let self = this;
      wx.getBackgroundAudioPlayerState({
        success: function (res) {
          console.log(res)
          let {status, duration, currentPosition} = res;
          self.playState = res;
          if (status === 1 || status === 0) {
            if (status === 1){
              self.pauseStatus = false;
            } else if (status === 0) {
              self.pauseStatus = true;
            }
            if (self.stotime(currentPosition)) {
              self.playState.currentPosition = self.stotime(currentPosition);
            }
            if (self.stotime(duration)) {
              self.playState.duration = self.stotime(duration);
            }
          }
        }
      })
    },
    stotime: function(s) {
      let t = '';
      if(s > -1) {
        // let hour = Math.floor(s / 3600);
        let min = Math.floor(s / 60) % 60;
        let sec = s % 60;
        // if (hour < 10) {
        //   t = '0' + hour + ":";
        // } else {
        //   t = hour + ":";
        // }
        min = Math.round(min);
        sec = Math.round(sec);

        if (min < 10) { t += "0"; }
        t += min + ":";
        if (sec < 10) { t += "0"; }
        t += sec;
      }

      if (t.length > 10) {
        t = t.substring(0, 10);
      }

      return t;
    },
  }
}
</script>

<style>
  @import "../../../static/css/base_css.wxss";

  .player-area {
    position: fixed;
    bottom: 20rpx;
    left: 20rpx;
    right: 20rpx;
    width: 670rpx;
    display: flex;
    flex-direction: row;
    background-color: #121212;
    padding: 20rpx;
    border-radius: 10rpx;
    opacity: 0.7;
  }

  .player-area-img {
    width: 74rpx;
    height: 74rpx;
  }
  .play-area-title {
    font-size: 30rpx;
    color: white;
    max-width: 400rpx;
    text-overflow: ellipsis;
    max-lines: 1;
    align-self: center;
    margin-left: 15rpx;
  }

  .icon-play{
    /*background-image: url('../../assets/img/icon.png');
    background-repeat: no-repeat;
    background-position: -136px -153px;*/
    width: 74rpx;
    margin-left: 10rpx;
    height: 74rpx;
  }

  .play-area-time {
    font-size: 28rpx;
    color: deepskyblue;
    position: absolute;
    right: 20rpx;
    bottom: 10rpx;
  }

  .normal-items-title{
    margin-left: 20rpx;
    margin-top: 20rpx;
    height: 70rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .feed-item-content {
    display: flex;
    flex: 1;
    width: 500rpx;
    flex-direction: column;
    margin-left: 10rpx;
    justify-content: space-around;
  }

  .feed-item-title{
    display: -webkit-box;
    overflow: hidden;
    line-height: 30rpx;
    text-overflow:ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 26rpx;
    color: #333333;
  }

  .feed-item-desc{
    height: 52rpx;
    line-height: 26rpx;
    overflow: hidden;
    font-size: 24rpx;
    color: #666666;
    overflow: hidden;
    text-overflow:ellipsis;
    -webkit-line-clamp: 2;

    display: -webkit-box;
    word-break: break-all;
    -webkit-box-orient: vertical;
  }



  .normal-items-title-text{
    height: 90rpx;
    padding-top: 10rpx;
    text-align: center;
    font-size: 26rpx;
    font-weight: bold;
  }

  .normal-item-title-more {
    height: 90rpx;
    padding-top: 10rpx;
    text-align: center;
    font-size: 26rpx;
    color: #009900;
    margin-right: 20rpx;
    font-weight: bold;
  }

  .weui-grid_item{
    float: left;
    width: 229rpx;
    margin-left: 10rpx;
    margin-top: 10rpx;
    padding-bottom: 10rpx;
  }
  .weui-grid__icon {
    display: block;
    width: 100%;
    height: 160rpx;
  }

  .feed-item {
    width: 100%;
    height: 120rpx;
    margin-top: 10rpx;
    display: flex;
    flex-direction: row;
  }

</style>
