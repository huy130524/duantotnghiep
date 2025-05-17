import { FaUser, FaSignOutAlt, FaKey } from "react-icons/fa";
import { FaCartShopping, FaLocationDot } from "react-icons/fa6";

import { NavLink } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
  const { profile } = useProfile();
  const { logout } = useAuth();

  return (
    <aside className="tw-bg-white tw-rounded tw-h-full">
      <header className="tw-p-4 tw-flex tw-items-center tw-m-0 tw-border-solid tw-border-x-0 tw-border-t-0 tw-gap-x-6 tw-border-b tw-border-b-[#CFCFCF] tw-mb-1.5">
        <img
          src={profile?.avatar ?? "/images/avatar-default.jpg"}
          alt="Avatar"
          className="tw-w-[48px] tw-h-[48px] tw-rounded-full tw-object-cover"
        />

        <p className="tw-text-[18px] tw-font-semibold tw-tw-text-[#111] tw-m-0">
          {profile?.fullname}
        </p>
      </header>

      <div className="tw-pb-6">
        <NavLink
          to="/profile"
          className="tw-flex tw-items-center tw-py-3 tw-px-5 tw-gap-x-3 tw-text-[#111] hover:text-[#e30019] tw-transition-all [&.active]:tw-text-[#e30019]"
          end
        >
          <FaUser />

          <p className="tw-m-0">Thông tin tài khoản</p>
        </NavLink>

        <NavLink
          to="/profile/change-password"
          className="tw-flex tw-items-center tw-py-3 tw-px-5 tw-gap-x-3 tw-text-[#111] hover:text-[#e30019] tw-transition-all [&.active]:tw-text-[#e30019]"
          end
        >
          <FaKey />

          <p className="tw-m-0">Đổi mật khẩu</p>
        </NavLink>

        <NavLink
          to="/profile/address"
          className="tw-flex tw-items-center tw-py-3 tw-px-5 tw-gap-x-3 tw-text-[#111] hover:text-[#e30019] tw-transition-all [&.active]:tw-text-[#e30019]"
          end
        >
          <FaLocationDot />

          <p className="tw-m-0">Sổ địa chỉ</p>
        </NavLink>

        <NavLink
          to="/profile/orders-history"
          className="tw-flex tw-items-center tw-py-3 tw-px-5 tw-gap-x-3 tw-text-[#111] hover:text-[#e30019] tw-transition-all [&.active]:tw-text-[#e30019]"
        >
          <FaCartShopping />

          <p className="tw-m-0">Quản lý đơn hàng</p>
        </NavLink>

        {/* <NavLink
          to="/account/viewed"
          className="tw-flex tw-items-center tw-py-3 tw-px-5 tw-gap-x-3 tw-text-[#111] hover:text-[#e30019] tw-transition-all [&.active]:tw-text-[#e30019]"
        >
          <FaEye />

          <p className="tw-m-0">Sản phẩm đã xem</p>
        </NavLink> */}

        <div
          onClick={logout}
          className="tw-flex tw-items-center tw-py-3 tw-px-5 tw-gap-x-3 tw-text-[#111] hover:text-[#e30019] tw-transition-all tw-cursor-pointer"
        >
          <FaSignOutAlt />

          <p className="tw-m-0">Đăng xuất</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
