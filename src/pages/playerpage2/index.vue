<template>
  <div style="height: 100%">
    <scroller scroll-y>
      <div>
        <view class="container" style="height: (we">
          <!--第一层层：背景图背景图，高斯模糊-->
          <view class="bg">
            <image class="poster" v-if="curPlayList[audioIndex]"  :style="{height: windowHeight + 'px'}" :src="curPlayList[audioIndex].imageUrl"></image>
          </view>
          <!--第二层层：灰色蒙层-->
          <view class="bg-gray">
          </view>
          <!--第三层：player层-->
          <view :style="{ display: listShow === true ? 'none' : '' }">
            <!--旋转图-->
            <view class="rotate-disk-container">
              <view :class="['rotate-disk', pauseStatus === false ? 'rotate-360' : 'rotate-360-paused']">
                <image class="poster" v-if="curPlayList[audioIndex]"  :src="curPlayList[audioIndex].imageUrl"></image>
              </view>
            </view>
            <!--操作-->
            <view class="title-container">
              <view class="title-left"></view>
              <view class="text">
                <view><text class="name"  v-if="curPlayList[audioIndex]" >{{curPlayList[audioIndex].title}}</text></view>
                <!--<view><text class="author">-- {{curPlayList[audioIndex].author}} --</text></view>-->
              </view>
              <div class="icon-list">
                <image :src="images.listIcon" class="icon-list-img" @click="bindTapList"></image>
                <text v-if="false" class="icon-list-text">切换主题</text>
              </div>
            </view>
            <view class="slider-container">
              <text class="slider-time">{{currentPosition === 0 ? '' : currentPosition}}</text>
              <slider
                :value="sliderValue"
                @change="bindSliderchange"
                activeColor="#13beec"
                style="width: 62%;margin: 0;"
                block-size="12"
                block-color="#13beec"
              />
              <text class="slider-time">{{duration === 0 ? '' : duration}}</text>
            </view>
            <view class="operation-container">
              <image :src="images.preIcon" class="icon-prev" @click="bindTapPrev"></image>
              <image
                :src="pauseStatus === false ? images.pauseIcon : images.playIcon"
                class="icon-play" @click="bindTapPlay"
              >
              </image>
              <image :src="images.nextIcon" class="icon-next" @click="bindTapNext"></image>

              <div class="icon-comment-container" @click="onClickComment">
                <image :src="images.iconComment" class="icon-comment"></image>
                <text class="comment-text">评论</text>
              </div>
            </view>
          </view>
          <!--第五层：列表页-->
          <scroll-view
            class="list"
            scroll-y
            :style="{display: listShow === true ? '' : 'none'}"
            :scroll-top="audioIndex * 68"
          >
            <view v-for="(item,index) in audioList">
              <view
                :id="index"
                :class="['list-one']"
                hover-class="list-one-choose"
                @click="bindTapChoose(item, $event)"
              >
                <view class="name">
                  <text class="list-index">{{index}}</text>
                </view>
                <image class="list-one-poster" :src="item.imageUrl"></image>
                <view class="list-one-right">
                  <view class="name">{{item.title}}</view>
                  <!--<view class="author">歌手：{{item.author}}</view>-->
                </view>
              </view>
            </view>
          </scroll-view>
        </view>
        <list>
          <cell v-for="item in commentData">
            <card :item="item"></card>
          </cell>
        </list>
      </div>
    </scroller>
    <div ref="ccommentContainerRef" v-if="showCommentArea" class="comment-area">
      <input ref="ccommentRef" placeholder="请写下你的评论哟~" :focus="true"  class="comment-area-edit" confirm-type="send" @confirm="bindConfirm"/>
    </div>
  </div>
</template>
<script>
import { formatTime, debugPlayList } from '@/utils/index';

import requestUtils from '@/utils/request';

import card from '@/components/comment-item-view'

import listIcon from './img/list.png';
import pauseIcon from './img/pause.png';
import playIcon from './img/play.png';
import nextIcon from './img/next.png';
import preIcon from './img/prev.png';
import iconIcon from './img/icon.png';
import iconComment from './img/icon_comment.png';


var app = getApp();
let rotate = 0;
export default {
  components: {
    card
  },
  data () {
    return {
      audioList: [], //主題列表
      audioIndex: 0,
      windowHeight: 0,
      pauseStatus: true,
      listShow: false,
      timer: '',
      currentPosition: 0,
      duration:0,
      images: {
        listIcon,
        pauseIcon,
        playIcon,
        nextIcon,
        preIcon,
        iconIcon,
        iconComment
      },
      curPlayList:[
      ],
      commentData: [
      ],
      showCommentArea: false,
      themeId: 0
    }
  },
  created () {
    this.windowHeight = wx.getSystemInfoSync().windowHeight;
  },
  mounted() {
     this.fetchThemeList();
  },
  onHide() {
    this.listShow = false;
  },
  onTabItemTap() {
    this.listShow = false;
  },
  onShow(){
    if (app.playChannel) {
      this.fetchPlayList(app.playChannel);
      this.themeId = app.playChannel;
      delete app.playChannel;
    } else if ((!this.curPlayList || this.curPlayList.length < 1) && (app.homepageData && app.homepageData.firstPartData && app.homepageData.firstPartData.length > 0)){
      this.themeId = app.homepageData.firstPartData[0].id;
      this.fetchPlayList(app.homepageData.firstPartData[0].id, true);
    }
  },
  methods: {
    bindSliderchange: function(e) {
      // clearInterval(this.data.timer)
      let value = e.mp.detail.value
      let that = this
      console.log(e.mp.detail.value)
      wx.getBackgroundAudioPlayerState({
        success: function (res) {
          console.log(res)
          let {status, duration} = res
          if (status === 1 || status === 0) {
            that.slice = value;
            wx.seekBackgroundAudio({
              position: value * duration / 100,
            })
          }
        }
      })
    },
    onClickComment() {
        //展示评论框
      this.showCommentArea = true;
    },
    bindConfirm(event) {
      let that = this;
      debugger;
      //发送网络请求
      requestUtils.commentTheme({
        "commentInfo": event.mp.detail.value,
        "themeId": that.themeId,
        "type":1,
        "userId": app.userInfo.id
      }, function (res) {
        if (res.data && res.data.success) {
          wx.showToast({
            title:'发布评论成功',
            duration: 2500
          });
          that.showCommentArea = false;
        } else {
          that.$refs.ccommentRef.focus = true;
        }
      });
    },
    fetchPlayList: function (themeId, noNeedPlay = false) {
      let that = this;
      //開始獲取音頻
      wx.request({
        url: 'https://www.wuyouzhidi.com/getAudioInfoList',
        data: {
          themeId: themeId
        },
        header: {
          'content-type': 'application/json'
        },
        method:'POST',
        success: function(result){
          if (result.data.success) {
            that.curPlayList = result.data.data;
            if (that.curPlayList && that.curPlayList.length > 0 && !noNeedPlay) {
              that.pauseStatus = true;
              wx.stopBackgroundAudio();
              that.bindTapPlay();
            }
          };
          //获取评论数据
          requestUtils.commentList( 0,500,themeId, function (res) {
              if (res.data && res.data.success) {
                that.commentData = res.data.data;
              }
              debugger;
          } );
        },
        fail: function (res) {
        }
      })
    },
    fetchThemeList: function () {
      let that = this;
      wx.request({
        url: 'https://www.wuyouzhidi.com/getAllThemeListPageNotTest',
        data: {
          pageNumber: 0,
          pageSize: 500
        },
        header: {
          'content-type': 'application/json'
        },
        method:'POST',
        success: function(result){
          if (result.data.success) {
            that.audioList = result.data.data.content;
          }
        },
        fail: function (res) {
        }
      })
    },
    bindTapPrev: function() {
      console.log('bindTapNext')
      let length = this.curPlayList.length
      let audioIndexPrev = this.audioIndex
      let audioIndexNow = audioIndexPrev
      if (audioIndexPrev === 0) {
        audioIndexNow = length - 1
      } else {
        audioIndexNow = audioIndexPrev - 1
      }
      this.audioIndex = audioIndexNow;
      this.sliderValue = 0;
      this.currentPosition = 0;
      this.duration = 0;

      let that = this
      setTimeout(() => {
        if (that.pauseStatus === true) {
          that.play()
        }
      }, 300);
    },
    bindTapNext: function() {
      console.log('bindTapNext')
      let length = this.curPlayList.length
      let audioIndexPrev = this.audioIndex
      let audioIndexNow = audioIndexPrev
      if (audioIndexPrev === length - 1) {
        audioIndexNow = 0
      } else {
        audioIndexNow = audioIndexPrev + 1
      }

      this.audioIndex = audioIndexNow;
      this.sliderValue = 0;
      this.currentPosition = 0;
      this.duration = 0;

      let that = this
      setTimeout(() => {
        if (that.pauseStatus === false) {
          that.play()
        }
      }, 1000)
      wx.setStorageSync('audioIndex', audioIndexNow)
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
    bindTapList: function(e) {
      console.log('bindTapList')
      console.log(e);
      this.listShow = true;
    },
    bindTapChoose: function(item, e) {
      if (!item) return;
      this.listShow = false;
      let that = this;
      this.fetchPlayList(item.id);
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
        that.setDuration(that)
      }, 1000);
      this.timer = timer;
    },
    setDuration(that) {
      let self = this;
      wx.getBackgroundAudioPlayerState({
        success: function (res) {
          console.log(res)
          let {status, duration, currentPosition} = res
          if (status === 1 || status === 0) {
            self.currentPosition = that.stotime(currentPosition);
            self.duration = that.stotime(duration);
            self.sliderValue = Math.floor(currentPosition * 100 / duration);
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

        if (min < 10) { t += "0"; }
        t += min + ":";
        if (sec < 10) { t += "0"; }
        t += sec;
      }
      return t;
    },
    onShareAppMessage: function () {
      let that = this
      return {
        title: 'light轻音乐：' + that.curPlayList[that.audioIndex].title,
        success: function(res) {
          wx.showToast({
            title: '分享成功',
            icon: 'success',
            duration: 2000
          })
        },
        fail: function(res) {
          wx.showToast({
            title: '分享失败',
            icon: 'cancel',
            duration: 2000
          })
        }
      }
    }
  }
}
</script>

<style scoped>
  .container{
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  /*1*/
  .bg{
    height: 100%;
    width: 100%;
  }
  .bg image{
    height: 100%;
    width: 100%;
    filter: blur(50rpx);
  }
  /*2*/
  .bg-gray{
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(54, 43, 41, 0.1);
  }

  .icon-comment-container {
    position: absolute;
    right: 40rpx;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .icon-comment{
    width: 64rpx;
    height: 64rpx;
  }
  .comment-text {
    color: white;
    margin-top: 3rpx;
    font-size: 22rpx;
  }

  /*3*/
  .rotate-disk-container{
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .rotate-disk{
    width: 600rpx;
    height: 600rpx;
    border-radius: 600rpx;
    overflow: hidden;
    border: 20rpx solid rgba(54, 43, 41, 0.2);
  }
  .poster{
    width: 600rpx;
    height: 600rpx;
  }
  .rotate-360{
    animation: rotate 10s linear infinite;
  }
  .rotate-360-paused{
    animation: rotate 10s linear infinite;
    animation-play-state: paused;
  }
  @keyframes rotate
  {
    0%   {transform: rotate(0deg);}
    50% {transform: rotate(180deg);}
    100% {transform: rotate(360deg);}
  }
  /*4*/
  .title-container{
    position: absolute;
    top: 0;
    height: 160rpx;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .title-left{
    width: 60rpx;
    height: 60rpx;
  }
  .text{
    color: #fff;
    text-align: center;
  }
  .icon-list{

    margin: 0 30rpx 0 0;
  }
  .icon-list-img {
    width: 54rpx;
    height: 36rpx;
  }

  .icon-list-text {
    color: #FFFFFF;
    font-size: 26rpx;
  }

  .slider-container{
    position: absolute;
    bottom: 140rpx;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .slider-time{
    font-size: 32rpx;
    display: block;
    width: 19%;
    text-align: center;
    line-height: 18px;
    color: #fff;
  }
  .wx-slider-handle{
    width: 18px!important;
    height: 18px!important;
    top: 5px!important;
  }
  /*4*/
  .operation-container{
    position: absolute;
    bottom: 0;
    height: 160rpx;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .operation-icon{
  }
  .icon-prev{
    /*background-image: url('../../assets/img/icon.png');
    background-repeat: no-repeat;
    background-position: -76px -153px;*/
    width: 80rpx;
    height: 80rpx;
  }
  .icon-play{
    /*background-image: url('../../assets/img/icon.png');
    background-repeat: no-repeat;
    background-position: -136px -153px;*/
    margin: 0 20rpx;
    width: 98rpx;
    height: 98rpx;
  }
  .icon-pause{
    /*background-image: url('../../assets/img/icon.png');
    background-repeat: no-repeat;
    background-position: -178px -193px;*/
    margin: 0 20rpx;
    width: 98rpx;
    height: 98rpx;
  }
  .icon-next{
    /*background-image: url('../../assets/img/icon.png');
    background-repeat: no-repeat;
    background-position: -204px -154px;*/
    width: 80rpx;
    height: 80rpx;
  }

  /*5*/
  .list{
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    color: #fff;
  }
  .list-one{
    height: 160rpx;
    display: flex;
    padding: 0 30rpx;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
  }
  .list-one-poster{
    width: 100rpx;
    height: 100rpx;
    border-radius: 10rpx;
  }
  .list-one-right{
    margin: 0 0 0 30rpx;
    flex: 1;
  }
  .list-one-choose{
    background-color: rgba(54, 43, 41, 0.6);
  }
  .list-index{
    display: block;
    width: 60rpx;
    height: 60rpx;
    background-color: mediumvioletred;
    text-align: center;
    border-radius: 60rpx;
    line-height: 60rpx;
    margin-right: 20rpx;
  }

  .comment-area {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 120rpx;
    background-color: white;
  }

  .comment-area-edit {
    width: 90%;
    height: 120rpx;
    padding-left: 5%;
    padding-right: 4%;
  }

</style>
