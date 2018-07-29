<template>
  <div class="main">
    <div class="feedback-content-area">
      <textarea v-model="feedbackContent" auto-focus placeholder="写下你的建议和意见" confirm-type="send" @confirm="commitFeedbackContent"></textarea>
    </div>
    <div>
      <button type="primary" class="feedback-content-button" @click="commitFeedbackContent">提交反馈</button>
    </div>
  </div>
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

import request from  '@/utils/request'

var app = getApp();

export default {
  data () {
    return {
      feedbackContent: undefined
    }
  },
  created(){
  },

  mounted() {

  },
  components: {
  },
  methods: {
    commitFeedbackContent(){
      if (!this.feedbackContent) {
        return;
      }

      request.saveFeedback({
        "commentInfo": this.feedbackContent,
        "type":1,
        "userId": (getApp().userInfo ? getApp().userInfo.id : -1)
      }, function (res) {

        if (res.data && res.data.success) {
          wx.showToast({
            title:'反馈成功',
            duration: 2500
          });

          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.showToast({
            title:'反馈失败',
            duration: 2500
          });
        }
      });
    }
  },

  created () {
  }
}
</script>

<style scoped>
  @import "../../../static/css/base_css.wxss";

  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .feedback-content-area {
    border-color:#e5e5e5;
    border-width:1rpx;
    border-style:solid;
    padding:20rpx;
  }

  .feedback-content-button {
    max-width: 300rpx;
    position: absolute;
    right: 40rpx;
    margin-top: 20rpx;
  }

</style>
