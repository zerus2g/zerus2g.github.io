//KHÔNG ĐƯỢC SỬA
function loadPagination(
  _totalCounts,
  _currentPage,
  _idPaginator,
  _reloadListData,
  _listData,
  _pageSize
) {
  let size = _pageSize || 10;
  if (_totalCounts > size) {
    $("#" + _idPaginator).show();
    $.jqPaginator("#" + _idPaginator, {
      totalCounts: _totalCounts,
      pageSize: _pageSize ? _pageSize : 10,
      visiblePages: 5,
      currentPage: _currentPage,
      onPageChange: function (num, type) {
        if ("change" == type) {
          window[_reloadListData](num, _listData);
        }
      },
    });
  } else {
    $("#" + _idPaginator).hide();
  }
}

function activeButton(btnId) {
  $("#" + btnId).attr("disabled", false);
}
function disabledButton(btnId) {
  $("#" + btnId).attr("disabled", true);
}

function getLocation(service, parent_field, parent_id, html_id) {
  var obj = new Object();
  obj.service = service;
  obj.type = "qry";
  if (parent_field) {
    obj[parent_field] = parent_id;
  }
  var res = "";
  if (parent_id != "-1") {
    var result = apiservice.AjaxJson.executeQuery(obj);

    if (result && result != "[null]") {
      for (var i = 0; i < result.length; i++) {
        res +=
          "<option unit_code=" +
          result[i].UNIT_CODE +
          " value=" +
          result[i].ID +
          ">" +
          result[i].NAME +
          "</option>";
      }
    }
  }
  $("#" + html_id).html(res);
  $("#" + html_id).select2({
    allowClear: true,
    width: "100%",
  });
}

function getLocationRef(service, parent_field, parent_id, html_id) {
  var obj = new Object();
  obj.service = service;
  obj.type = "ref";
  if (parent_field) {
    obj[parent_field] = parent_id;
  }
  var res = "";
  if (parent_id != "-1") {
    var result = apiservice.AjaxJson.executeQuery(obj);

    if (result && result != "[null]") {
      for (var i = 0; i < result.length; i++) {
        res +=
          "<option unit_code=" +
          result[i].UNIT_CODE +
          " value=" +
          result[i].ID +
          ">" +
          result[i].NAME +
          "</option>";
      }
    }
  }
  $("#" + html_id).html(res);
  $("#" + html_id).select2({
    allowClear: true,
    width: "100%",
  });
}

function formToObject(_formId) {
  var obj = new Object();
  $("#" + _formId + " [id^='txt']").each(function () {
    obj[$(this).attr("id").substring(3)] = $(this).val();
  });
  $("#" + _formId + " [id^='cbo']").each(function () {
    obj[$(this).attr("id").substring(3)] = $(this).val();
  });
  $("#" + _formId + " [id^='chk']").each(function () {
    obj[$(this).attr("id").substring(3)] = $(this).val();
  });
  return obj;
}
function objectToForm(_formId, _obj) {
  if (_obj) {
    $("#" + _formId + " [id^='txt']").each(function () {
      $(this).val(_obj[$(this).attr("id").substring(3)]);
    });
  }
}
function validateForm(_formId) {
  var message = "";
  var isValid = true;
  $("#" + _formId + " [id^='txt']").each(function () {
    if (!$(this).val().trim() && $(this).attr("noempty")) {
      message +=
        "'" +
        $(this).attr("message") +
        "'" +
        " không được để trống !" +
        "<br/>";
    }
    if (
      $(this).val() &&
      $(this).attr("phonerule") &&
      !validatePhoneNumber($(this).val())
    ) {
      message +=
        "'" +
        $(this).attr("message") +
        "'" +
        " không đúng định dạng số điện thoại !" +
        "<br/>";
    }
    if (
      $(this).val() &&
      $(this).attr("emailrule") &&
      !validateEmail($(this).val())
    ) {
      message +=
        "'" +
        $(this).attr("message") +
        "'" +
        " không đúng định dạng email !" +
        "<br/>";
    }
    var validMaxLength = $(this).attr("validlength") || 1500;
    if ($(this).val().length > validMaxLength) {
      message +=
        "'" +
        $(this).attr("message") +
        "'" +
        " không được vượt quá " +
        validMaxLength +
        " ký tự !" +
        "<br/>";
    }
  });
  $("#" + _formId + " [id^='cbo']").each(function () {
    if ((!$(this).val() || $(this).val() < 0) && $(this).attr("noempty")) {
      message +=
        "'" +
        $(this).attr("message") +
        "'" +
        " không được để trống !" +
        "<br/>";
    }
  });
  if (message) {
    toastr.warning(message);
    isValid = false;
  }
  return isValid;
}
function validateEmail(email) {
  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function validatePhoneNumber(phone) {
  let regex10 = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  let regex11 = /((09|03|07|08|05)+([0-9]{9})\b)/g;
  return (regex10.test(phone) || regex11.test(phone)) && phone.length <= 11;
}

function validStr(str) {
  if (str == undefined || str === "undefined" || str == null || str == "")
    str = "";
  return str;
}

function isValidStr(str) {
  return !(str == undefined || str === "undefined" || str == null || str == "");
}

function escapeHtml(value, _element) {
  $.ajax({
    url: "/jsp/dvc-common/escape-html.jsp?params=" + value,
    async: true,
    success: function (rp) {
      if (_element) {
        $(_element).html(rp);
      } else {
        return value;
      }
    },
    error: function (data) {
      console.log(data);
    },
  });
}

function prototypeSub(input, charIn, charOut, numWord) {
  var words = input.split(charIn);
  if (words.length > numWord) {
    words = words.slice(0, numWord);
  }
  return words.join(charOut);
}

function getWords(input, numWord) {
  return prototypeSub(input, " ", " ", numWord);
}

function GetURLParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1));
  var sURLVariables = sPageURL.split("&");
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split("=");
    if (sParameterName[0] == sParam) {
      return sParameterName[1];
    }
  }
}

// Lay thong tin nguoi dung
function getUserInfo(username, type) {
  var rs = new Array();
  $.ajax({
    url: "/jsp/dvc-common/dvc-get-userinfo.jsp",
    type: "GET",
    dataType: "json",
    async: false,
    data: { username: username, type: type },
    success: function (result) {
      console.log(result);
      rs = result;
    },
  });
  return rs;
}

var number = (function () {
  var decimalchar = ",";
  var thousandchar = ".";
  var _convertVND = function (value) {
    if (value == "" || value == undefined) return 0;
    var strValue = value.toString();
    var returnstr = null;
    while (strValue.length > 0) {
      if (returnstr == null)
        returnstr = strValue.substring(Math.max(0, strValue.length - 3));
      else {
        if (strValue != "-") {
          returnstr =
            strValue.substring(Math.max(0, strValue.length - 3)) +
            thousandchar +
            returnstr;
        } else {
          returnstr =
            strValue.substring(Math.max(0, strValue.length - 3)) + returnstr;
        }
      }
      strValue = strValue.substring(0, Math.max(0, strValue.length - 3));
    }
    return returnstr;
  };

  var _convertPercent = function (value) {
    if (value == "" || value == undefined) return 0;
    var strValue = value.toString().replace(/\./g, ",");
    return strValue;
  };

  var _revertVND = function (inputVND) {
    if (value == "" || value == undefined) return 0;
    inputVND = inputVND.replace(/\./g, "");
    inputVND = inputVND.replace(/\,/g, "");
    return inputVND;
  };

  // Public
  return {
    FORMAT: _convertVND,
    PERCENT: _convertPercent,
    REVERT: _revertVND,
  };
})();

function NUM(vl) {
  if (vl == null || vl == undefined) return 0;
  return vl;
}

function parseNumber(data) {
  if (validStr(data) == "") {
    return 0;
  }

  return parseFloat(data);
}

function parseNumber2(data) {
  if (validStr(data) == "") {
    return 0;
  }

  return parseFloat(data).toLocaleString("de-DE");
}

function iOS() {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
}

function parseDate(dateString) {
  try {
    var year = dateString.substring(0, 4);
    var month = dateString.substring(4, 6);
    var day = dateString.substring(6, 8);
    var hour = dateString.substring(8, 10);
    var minute = dateString.substring(10, 12);
    var seconds = dateString.substring(12, 14);

    return (
      day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + seconds
    );
  } catch (error) {}

  return dateString;
}

function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

function htmlEncode(str) {
  return String(str).replace(/[^\w. ]/gi, function (c) {
    return "&#" + c.charCodeAt(0) + ";";
  });
}
