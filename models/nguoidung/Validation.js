/**
 * Dự án Quản Lý Trung Tâm
 * Người Tạo: Nguyễn Văn Chanh
 * Ngày Tạo: 01/05/2018
 * Code models Validation.js
 */

function Validation() {
  this.KiemTraRong = function(value) {
    if (value === "") {
      return true;
    }
    return false;
  };
  this.KiemTraEmail = function(value) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value.trim());
  };
  this.KiemTraSoDT = function(value) {
    var re = /^\d+$/;
    if (re.test(value) && value.length >= 10) {
      return true;
    }
    return false;
  };
}
