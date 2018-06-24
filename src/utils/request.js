
var dealCommentPraise = function( userId, themeCommentId, callback) {
  let that = this;
  //開始獲取音頻
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

var requestUtils = {
  dealCommentPraise,
  commentTheme,
  commentList,
  userCommentList
};

export default requestUtils;
