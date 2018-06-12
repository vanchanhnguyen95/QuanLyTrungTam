/**
 * Dự án Quản Lý Trung Tâm
 * Người Tạo: Nguyễn Văn Chanh
 * Ngày Tạo: 01/05/2018
 * Code models DanhSachNguoiDung.js
 */

function DanhSachNguoiDung() {
  this.DSND = [];
  this.ThemNguoiDung = function(ndThem) {
    this.DSND.push(ndThem);
  };
  this.XoaNguoiDung = function(lstNDXoa) {
    for (var i = 0; i < lstNDXoa.length; i++) {
      for (var j = 0; j < this.DSND.length; j++) {
        var nguoidung = this.DSND[j];
        if (lstNDXoa[i] == nguoidung.TaiKhoan) {
          this.DSND.splice(j, 1);
        }
      }
    }
  };
  this.SuaNguoiDung = function(ndCapNhat) {
    for (var i = 0; i < this.DSND.length; i++) {
      var ndUpdate = this.DSND[i];
      if (ndCapNhat.TaiKhoan == ndUpdate.TaiKhoan) {
        ndUpdate.HoTen = ndCapNhat.HoTen;
        ndUpdate.MatKhau = ndCapNhat.MatKhau;
        ndUpdate.Email = ndCapNhat.Email;
        ndUpdate.SoDT = ndCapNhat.SoDT;
        ndUpdate.MaLoaiNguoiDung = ndCapNhat.MaLoaiNguoiDung;
      }
    }
    return this;
  };
  this.TimKiemNguoiDung = function(tukhoa) {
    var lstKetQuaTimKiem = new DanhSachNguoiDung();
    for (var i = 0; i < this.DSND.length; i++) {
      var nguoidung = this.DSND[i];
      if (nguoidung.HoTen.search(tukhoa) != -1) {
        lstKetQuaTimKiem.ThemNguoiDung(nguoidung);
      }
    }
    return lstKetQuaTimKiem;
  };
  this.TimNDTheoTaiKhoan = function(taikhoan) {
    for (var i = 0; i < this.DSND.length; i++) {
      var nd = this.DSND[i];
      if (nd.TaiKhoan === taikhoan) {
        return nd;
      }
    }
    return null;
  };
}
