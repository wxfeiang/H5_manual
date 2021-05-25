/**
 * Created by ChengYa on 2016/6/18.
 */

//判断手机类型
window.onload = function () {
  //alert($(window).height());
  var u = navigator.userAgent
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
    //安卓手机
  } else if (u.indexOf('iPhone') > -1) {
    //苹果手机
    //屏蔽ios下上下弹性
    $(window)
      .on('scroll.elasticity', function (e) {
        e.preventDefault()
      })
      .on('touchmove.elasticity', function (e) {
        e.preventDefault()
      })
  } else if (u.indexOf('Windows Phone') > -1) {
    //winphone手机
  }
  //预加载
  loading()
  share()
}
var rand = Math.round(Math.random() * 10000000 - 1)
var date_start
var date_end
date_start = getNowFormatDate()
//加载图片

var loading_img_url = []
for (var i = 0; i < 32; i++) {
  var index = i < 10 ? '0' + i : i
  loading_img_url.push(`./image/${index}-min.png`)
}

//加载页面
function loading() {
  var numbers = 0
  var length = loading_img_url.length

  for (var i = 0; i < length; i++) {
    var img = new Image()
    img.src = loading_img_url[i]
    img.onerror = function () {
      numbers += (1 / length) * 100
    }
    img.onload = function () {
      numbers += (1 / length) * 100
      $('.number').html(parseInt(numbers) + '%')
      // console.log(numbers)
      if (Math.round(numbers) == 100) {
        //$('.number').hide();
        date_end = getNowFormatDate()
        var loading_time = date_end - date_start
        //预加载图片
        $(function progressbar() {
          //拼接图片

          var tagHtml = ''
          for (var i = 0; i <= length; i++) {
            if (i == 0) {
              var index = i < 10 ? '0' + i : i
              tagHtml += `
              <div id="first" 
              style="background: url(image/${index}-min.png) center 45% no-repeat; background-size:66%"
              ><img src="./image/logo-min.png?${rand}" alt="" class="logo">
            </div>
              `
            } else if (i == length) {
              var index = i < 10 ? '0' + i : i
              tagHtml += `<div id="end" 
              style="background: url(image/${index}-min.png) center 45% no-repeat; background-size:66%"
              ><img src="./image/logo-min.png?${rand}" alt="" class="logo">
            </div>
              `
            } else {
              var index = i < 10 ? '0' + i : i
              tagHtml += `
              <div 
              style="background: url(image/${index}-min.png) center 45% no-repeat; background-size:100%"
              ><img src="./image/logo-min.png?${rand}" alt="" class="logo">
            </div>
              `
            }
          }
          $('.flipbook').append(tagHtml)
          $('.shade').hide()
          var w = $('.graph').width()
          $('.flipbook-viewport').show()
        })
        //配置turn.js
        function loadApp() {
          var w = $(window).width()
          var h = $(window).height()
          $('.flipboox').width(w).height(h)
          $(window).resize(function () {
            w = $(window).width()
            h = $(window).height()
            $('.flipboox').width(w).height(h)
          })
          $('.flipbook').turn({
            // Width
            width: w,
            // Height
            height: h,
            // Elevation
            elevation: 50,
            display: 'single',
            // Enable gradients
            gradients: true,
            // Auto center this flipbook
            autoCenter: true,
            when: {
              turning: function (e, page, view) {
                if (page == 1) {
                  $('.btnImg').css('display', 'none')
                  $('.mark').css('display', 'block')
                } else {
                  $('.btnImg').css('display', 'block')
                  $('.mark').css('display', 'none')
                }
                if (page == 3) {
                  $('.nextPage').css('display', 'none')
                } else {
                  $('.nextPage').css('display', 'block')
                }
              },
              turned: function (e, page, view) {
                // console.log(page)
                var total = $('.flipbook').turn('pages') //总页数
                if (page == 1) {
                  $('.return').css('display', 'none')
                  $('.btnImg').css('display', 'none')
                } else {
                  $('.return').css('display', 'block')
                  $('.btnImg').css('display', 'block')
                }
                if (page == 2) {
                  $('.catalog').css('display', 'block')
                } else {
                  $('.catalog').css('display', 'none')
                }
              },
            },
          })
        }
        yepnope({
          test: Modernizr.csstransforms,
          yep: ['js/turn.js'],
          complete: loadApp,
        })
      }
    }
  }
}

function getNowFormatDate() {
  var date = new Date()
  var seperator1 = ''
  var seperator2 = ''
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var currentdate =
    date.getFullYear() +
    seperator1 +
    month +
    seperator1 +
    strDate +
    '' +
    date.getHours() +
    seperator2 +
    date.getMinutes() +
    seperator2 +
    date.getSeconds()
  return currentdate
}
function share() {
  var surl = window.location.href

  var data = {
    action: '10001',
    param: [
      {
        surl: surl,
        accessToken: 'DB7C1D38-E3E7-4BF7-8A60-699ACD536B11',
      },
    ],
  }

  $.ajax({
    type: 'get',
    url: `https://www.yoribo.com/weChat_share/?action=10001&param=[{'surl': '${surl}', 'accessToken': 'DB7C1D38-E3E7-4BF7-8A60-699ACD536B11'}]`,
    dataType: 'json',
    success: function (res) {
      wxstart(res)
    },
    error: function (error) {
      console.log(error.responseText)
    },
  })
}
function wxstart(res) {
  var data = res.Data[0]
  var url = window.location.href //分享的文章地址
  var appId = data.appid
  var timestamp = data.timestamp
  var nonceStr = data.noncestr
  var signature = data.signature
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: appId, // 必填，公众号的唯一标识
    timestamp: timestamp, // 必填，生成签名的时间戳
    nonceStr: nonceStr, // 必填，生成签名的随机串
    signature: signature, // 必填，签名，见附录1
    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ'], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  })

  wx.ready(function () {
    var imgurl = 'http://www.yoribo.com/H5/H5_manual/fonts/favicon.ico'
    var title = 'REITs极简版入门手册'
    var desc = 'REITs极简版入门手册,不动产信托资金....'
    wx.onMenuShareTimeline({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: url, // 分享链接
      imgUrl: imgurl, // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
        console.log('分享sucess')
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      },
    })

    wx.onMenuShareAppMessage({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: url, // 分享链接
      imgUrl: imgurl, // 分享图标
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {
        console.log('分享sucess')
      },
      cancel: function () {},
    })

    wx.onMenuShareQQ({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: url, // 分享链接
      imgUrl: imgurl, // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
        console.log('分享sucess')
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      },
    })
  })
}
