if (i == 0) {
  tagHtml +=
    ' <div id="first" style="background:  url(image/' +
    (i < 10 ? '0' + i : i) +
    '.png) center  45% no-repeat;background-size:66%">' +
    '<img src="./image/logo.png" alt="" class="logo">' +
    '</div>'
} else if (i == length) {
  tagHtml +=
    ' <div id="end" style="background: url(image/' +
    (i < 10 ? '0' + i : i) +
    '.png) center  45% no-repeat;background-size:66%">' +
    '<img src="./image/logo.png" alt="" class="logo">' +
    '</div>'
} else {
  tagHtml +=
    ' <div style="background: url(image/' +
    (i < 10 ? '0' + i : i) +
    '.png) center 50px no-repeat;background-size:100%">' +
    '<img src="./image/logo.png" alt="" class="logo">' +
    '</div>'
}
' <div id="first" style="background:  url(image/' +
(i < 10 ? '0' + i : i) +
'-min.png) center  45% no-repeat;background-size:66%">' +
'<img src="./image/logo-min.png?" alt="" class="logo">' +
'</div>'

<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <title>REITs极简版入门手册</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
  <meta name="format-detection" content="telephone=no">
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black" />

  <link rel="stylesheet" href="css/rest.css" />
  <link rel="stylesheet" type="text/css" href="css/basic.css" />
  <script src="js/remScale.js"></script>


  <script type="text/javascript" src="js/jquery.js"></script>
  <script type="text/javascript" src="js/modernizr.2.5.3.min.js"></script>
  <script type="text/javascript" src="js/main.js"></script>



<style>
  .container,
  .page-wrapper {
    background: url(./image/bg.png) center top no-repeat;
    background-size: cover;
  }

  .logo {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 85px;
    height: 18px;
  }
</style>