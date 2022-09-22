import React, { useEffect } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import CreateAddress from "../address-create/CreateAddress";
import Header from "../../../component/Header";

const listAddress = [
  {
    id: 1,
    name: "Trần Thúc Kháng",
    phone: "0397919744",
    address: "Đường số 1, Phường 1, Quận 1, TP. Hồ Chí Minh",
    isDefaultAddress: true,
  },
  {
    id: 2,
    name: "Đặng Văn Kiệt",
    phone: "0397919744",
    address: "Đường số 1, Phường 1, Quận 1, TP. Hồ Chí Minh",
    isDefaultAddress: false,
  },
  {
    id: 3,
    name: "Trần Hữu Thắng",
    phone: "0397919744",
    address: "Đường số 1, Phường 1, Quận 1, TP. Hồ Chí Minh",
    isDefaultAddress: false,
  },
];

const AddressList = () => {
  const [addressData, setAddressData] = React.useState(listAddress);
  const [openCreateAddress, setOpenCreateAddress] = React.useState(false);
  const handleCloseCreateAddress = () => {
    setOpenCreateAddress(false);
  };

  document.title = "Danh sách địa chỉ";

  const [isDefaultAddress, setIsDefaultAddress] = React.useState(1);

  return (
    <div className="w-full">
      <Header />
      <div className="w-[80%] m-auto mt-3">
        <button
          onClick={() => setOpenCreateAddress(true)}
          className=" bg-[#fe1616] px-14 py-2 drop-shadow-lg text-white font-semibold rounded-lg"
        >
          THÊM ĐỊA CHỈ
        </button>
      </div>
      {addressData.map((item) => (
        <div key={item.id} className="w-full mt-4">
          <div className="w-[80%] h-40 bg-gray-200 m-auto rounded-lg">
            <div className="w-[90%] m-auto border-b border-solid border-gray-300 h-[50%] flex flex-row items-center">
              <div className="w-2/4 flex flex-row items-center ml-10">
                <span className="font-semibold text-lg text-black">
                  Tên người nhận
                </span>
                <span className="font-semibold text-gray-500 pl-10">
                  {item.name}
                </span>
              </div>
              <div className="w-2/4 flex flex-row items-center">
                <span className="font-semibold text-lg text-black">
                  Số điện thoại
                </span>
                <span className="font-semibold text-gray-500 pl-10">
                  {item.phone}
                </span>
              </div>
              <div className="relative">
                <span className="hover:cursor-pointer bg-gray-300 rounded-full absolute top-[-24px] left-10">
                  <CloseRoundedIcon />
                </span>
              </div>
            </div>

            <div className="w-[90%] m-auto border-b border-solid border-gray-300 h-[50%] flex flex-row items-center">
              <div className="w-2/4 flex flex-row items-center ml-10">
                <span className="font-semibold text-lg text-black">
                  Địa chỉ
                </span>
                <span className="font-semibold text-gray-500 pl-10">
                  {item.address}
                </span>
              </div>
              <div className="w-2/4 flex flex-row items-center">
                <span className="font-semibold text-lg text-black">
                  Chọn làm địa chỉ mặc định
                </span>
                <span className="font-semibold text-gray-500 pl-10">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isDefaultAddress === item.id ? true : false}
                        onClick={() => {
                          setIsDefaultAddress(item.id);
                        }}
                      />
                    }
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}

      <CreateAddress
        openCreateAddress={openCreateAddress}
        handleCloseCreateAddress={handleCloseCreateAddress}
      />
    </div>
  );
};

export default AddressList;
