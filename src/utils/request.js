
var dealCommentPraise = function( userId, themeCommentId, callback) {
  let that = this;
  wx.request({
    url: 'https://www.wuyouzhidi.com/thumbThemeComment',
    data: {
      themeCommentId: themeCommentId,
      userId: userId
    },
    header: {
      'content-type': 'application/json'
    },
    method:'POST',
    success: function(result){
      callback(result);
    },
    fail: function (res) {
      callback(res);
    }
  });
};

var commentTheme = function (data, callback) {
  let that = this;
  //開始獲取音頻
  wx.request({
    url: 'https://www.wuyouzhidi.com/saveThemeComment',
    data: data,
    header: {
      'content-type': 'application/json'
    },
    method:'POST',
    success: function(result){
      callback(result);
    },
    fail: function (res) {
      callback(res);
    }
  });
};

var saveFeedback = function (data, callback) {
  let that = this;
  //開始獲取音頻
  wx.request({
    url: 'https://www.wuyouzhidi.com/saveFeedback',
    data: data,
    header: {
      'content-type': 'application/json'
    },
    method:'POST',
    success: function(result){
      callback(result);
    },
    fail: function (res) {
      callback(res);
    }
  });
};

var commentList = function(pageNumber, pageSize, themeId, callback) {
  let that = this;
  //開始獲取音頻
  wx.request({
    url: 'https://www.wuyouzhidi.com/getThemeCommentList',
    data: {
      pageNumber,
      pageSize,
      themeId
    },
    header: {
      'content-type': 'application/json'
    },
    method:'POST',
    success: function(result){
      callback(result);
    },
    fail: function (res) {
      callback(res);
    }
  });
};

var userCommentList = function(pageNumber, pageSize, userId, callback) {
  let that = this;
  //開始獲取音頻
  wx.request({
    url: 'https://www.wuyouzhidi.com/getUserThemeCommentList',
    data: {
      pageNumber,
      pageSize,
      userId
    },
    header: {
      'content-type': 'application/json'
    },
    method:'POST',
    success: function(result){
      callback(result);
    },
    fail: function (res) {
      callback(res);
    }
  });
}

var recommendUpload = function(recommendUser, targetId, callback) {
  let that = this;

  if (!(callback instanceof Function)) {
    callback = ()=>{
    }
  }

  let requestData = { };
  if (recommendUser) {
    requestData.srcId = parseInt(recommendUser);
  } else {
    return;
  }

  if (targetId) {
    requestData.desId = parseInt(targetId);
  }
  wx.request({
    url: 'https://www.wuyouzhidi.com/inviteSuccess',
    data: requestData,
    header: {
      'content-type': 'application/json'
    },
    method:'POST',
    success: function(result){
      debugger;
      callback(result);
    },
    fail: function (res) {
      debugger;
      callback(res);
    }
  });
}

var requestUtils = {
  dealCommentPraise,
  commentTheme,
  commentList,
  userCommentList,
  recommendUpload,
  saveFeedback
};

export default requestUtils;
