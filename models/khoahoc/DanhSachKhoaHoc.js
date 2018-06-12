/**
 * Dự án Quản Lý Trung Tâm
 * Người Tạo: Nguyễn Văn Chanh
 * Ngày Tạo: 01/05/2018
 * Code models DanhSachKhoaHoc.js
 */

function DanhSachKhoaHoc() {
  this.DSKH = [];
  this.ThemKhoaHoc = function(khoaHocThem) {
    this.DSKH.push(khoaHocThem);
  };
  this.XoaKhoaHoc = function(lstKHXoa) {
    for (var i = 0; i < lstKHXoa.length; i++) {
      for (var j = 0; j < this.DSKH.length; j++) {
        var khoahoc = this.DSKH[j];
        if (lstKHXoa[i] == khoahoc.MaKhoaHoc) {
          this.DSKH.splice(j, 1);
        }
      }
    }
  };

  this.SuaKhoaHoc = function(khCapNhat) {
    for (var i = 0; i < this.DSKH.length; i++) {
      var khUpdate = this.DSKH[i];
      if (khCapNhat.MaKhoaHoc == khUpdate.MaKhoaHoc) {
        khUpdate.TenKhoaHoc = khCapNhat.TenKhoaHoc;
        khUpdate.MoTa = khCapNhat.MoTa;
        khUpdate.LuotXem = khCapNhat.LuotXem;
        khUpdate.HinhAnh = khCapNhat.HinhAnh;
      }
    }
    return this;
  };

  this.TimKHTheoMaKhoaHoc = function(makhoahoc) {
    for (var i = 0; i < this.DSKH.length; i++) {
      var kh = this.DSKH[i];
      if (kh.MaKhoaHoc === makhoahoc) {
        return kh;
      }
    }
    return null;
  };
}
