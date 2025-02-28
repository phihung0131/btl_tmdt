import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Edit2,
  Save,
  X,
  Lock,
  User,
  Home,
  Mail,
  UserCheck,
  Calendar,
  UserCircle,
} from "lucide-react";

import Header from "../components/customer/common/Header";
import Footer from "../components/customer/common/Footer";
import apiService from "../services/api";
const Profile = () => {
  const auth = useSelector((state) => state.auth);

  const [user, setUser] = useState({
    _id: "",
    name: "",
    address: "",
    email: "",
    role: "",
    createdAt: "",
    username: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedFields, setEditedFields] = useState({
    name: user.name,
    address: user.address,
  });

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditedFields({
      name: user.name,
      address: user.address,
    });
  };

  const handleSave = () => {
    setUser((prev) => ({
      ...prev,
      ...editedFields,
    }));

    apiService
      .putProfile(editedFields.name, editedFields.address)
      .then((res) => {
        alert("Cập nhật thông tin thành công!");
      })
      .catch((err) => {
        console.log(err);
      });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedFields({
      name: user.name,
      address: user.address,
    });
  };

  const handlePasswordChange = () => {
    apiService
      .changePassword(passwordData.currentPassword, passwordData.newPassword)
      .then((res) => {
        alert("Đổi mật khẩu thành công!");
      })
      .catch((err) => {
        console.log(err);
      });

    setIsChangingPassword(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Tiệm Giày Đóm | Thông Tin";
    apiService
      .getProfile(auth.token)
      .then((res) => {
        // console.log(res?.data?.data?.user);
        setUser(res?.data?.data?.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
      <div className="mx-auto min-h-[80vh] w-full space-y-4 rounded-lg bg-white p-4 px-3 py-9 lg:w-[60vw]">
        {/* User Info Card */}
        <div className="overflow-hidden rounded-lg border-t-4 border-[#FF3D00] bg-white shadow-lg">
          <div className="flex items-center justify-between bg-gradient-to-r from-orange-50 p-6">
            <h2 className="text-2xl font-bold text-[#FF3D00]">
              Thông tin người dùng
            </h2>
            <div className="flex gap-2">
              {!isEditing ? (
                <button
                  className="rounded-lg bg-[#FF3D00] p-2 text-white transition-colors hover:bg-orange-600"
                  onClick={handleEdit}
                >
                  <Edit2 className="h-5 w-5" />
                </button>
              ) : (
                <>
                  <button
                    className="rounded-lg bg-green-500 p-2 text-white transition-colors hover:bg-green-600"
                    onClick={handleSave}
                  >
                    <Save className="h-5 w-5" />
                  </button>
                  <button
                    className="rounded-lg bg-gray-500 p-2 text-white transition-colors hover:bg-gray-600"
                    onClick={handleCancel}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="space-y-6 p-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-[#FF3D00]">
                  <User className="h-4 w-4" />
                  <label className="text-sm font-medium">Họ và tên:</label>
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedFields.name}
                    onChange={(e) =>
                      setEditedFields((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="w-full rounded border border-orange-200 p-2 outline-none focus:border-[#FF3D00] focus:ring-1 focus:ring-[#FF3D00]"
                  />
                ) : (
                  <p className="rounded bg-orange-50 p-2 font-medium text-gray-700">
                    {user.name}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-[#FF3D00]">
                  <Home className="h-4 w-4" />
                  <label className="text-sm font-medium">Địa chỉ:</label>
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedFields.address}
                    onChange={(e) =>
                      setEditedFields((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    className="w-full rounded border border-orange-200 p-2 outline-none focus:border-[#FF3D00] focus:ring-1 focus:ring-[#FF3D00]"
                  />
                ) : (
                  <p className="rounded bg-orange-50 p-2 font-medium text-gray-700">
                    {user.address}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-[#FF3D00]">
                  <Mail className="h-4 w-4" />
                  <label className="text-sm font-medium">Email:</label>
                </div>
                <p className="rounded bg-orange-50 p-2 font-medium text-gray-700">
                  {user.email}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-[#FF3D00]">
                  <UserCheck className="h-4 w-4" />
                  <label className="text-sm font-medium">Vai trò:</label>
                </div>
                <p className="rounded bg-orange-50 p-2 font-medium text-gray-700">
                  {user.role}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-[#FF3D00]">
                  <Calendar className="h-4 w-4" />
                  <label className="text-sm font-medium">Ngày tạo:</label>
                </div>
                <p className="rounded bg-orange-50 p-2 font-medium text-gray-700">
                  {formatDate(user.createdAt)}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-[#FF3D00]">
                  <UserCircle className="h-4 w-4" />
                  <label className="text-sm font-medium">Tên đăng nhập:</label>
                </div>
                <p className="rounded bg-orange-50 p-2 font-medium text-gray-700">
                  {user.username}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Password Change Card */}
        <div className="overflow-hidden rounded-lg border-t-4 border-[#FF3D00] bg-white shadow-lg">
          <div className="flex items-center justify-between bg-gradient-to-r from-orange-50 p-6">
            <h2 className="text-2xl font-bold text-[#FF3D00]">Đổi mật khẩu</h2>
            <button
              className="rounded-lg bg-[#FF3D00] p-2 text-white transition-colors hover:bg-orange-600"
              onClick={() => setIsChangingPassword(!isChangingPassword)}
            >
              <Lock className="h-5 w-5" />
            </button>
          </div>
          {isChangingPassword && (
            <div className="space-y-4 p-6">
              <div>
                <label className="text-sm font-medium text-[#FF3D00]">
                  Mật khẩu hiện tại:
                </label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData((prev) => ({
                      ...prev,
                      currentPassword: e.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded border border-orange-200 p-2 outline-none focus:border-[#FF3D00] focus:ring-1 focus:ring-[#FF3D00]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#FF3D00]">
                  Mật khẩu mới:
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded border border-orange-200 p-2 outline-none focus:border-[#FF3D00] focus:ring-1 focus:ring-[#FF3D00]"
                />
              </div>
              <button
                className="w-full rounded-lg bg-[#FF3D00] p-2 font-medium text-white transition-colors hover:bg-orange-600"
                onClick={handlePasswordChange}
              >
                Đổi mật khẩu
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
