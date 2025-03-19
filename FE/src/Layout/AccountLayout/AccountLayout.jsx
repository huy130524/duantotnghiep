import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AccountLayout = () => {
  return (
    <div className="tw-bg-[#ececec]">
      <div className="2xl:tw-w-4/5 2xl:tw-mx-auto md:tw-px-10 tw-my-4 md:tw-my-0 tw-px-4 tw-grid tw-grid-cols-12 tw-gap-4 tw-pt-[180px] tw-pb-[32px]">
        <div className="tw-col-span-12 md:tw-col-span-3">
          <Sidebar />
        </div>

        <div className="tw-col-span-12 md:tw-col-span-9 tw-bg-white tw-rounded">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
