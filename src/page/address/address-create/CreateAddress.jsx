import React, { useRef } from "react";
import { Modal, Box, Switch } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FilledInput } from "@mui/material";
import axios from "axios";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddressService from "../../../service/AddressService";
import { Toast } from "primereact/toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  height: "90%",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: "8px",
};

const styleForInput =
  "px-4 outline-none bg-[#EDEDF2] w-[70%] h-12 rounded-lg placeholder:italic placeholder:text-state-400";

const CreateAddress = (props) => {
  const toast = useRef(null);
  const [provinces, setProvinces] = React.useState([]);

  const [districts, setDistricts] = React.useState([]);

  const [wards, setWards] = React.useState([]);

  const [province, setProvince] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [ward, setWard] = React.useState("");

  React.useEffect(() => {
    const callAPIProvinces = async (api) => {
      return await axios.get(api).then((response) => {
        setProvinces(response.data);
      });
    };
    callAPIProvinces("https://provinces.open-api.vn/api/?depth=1");
  }, []);

  const getDistrictsAPI = async (code) => {
    return await axios
      .get(`https://provinces.open-api.vn/api/p/${code}?depth=2`)
      .then((res) => {
        setDistricts(res.data.districts);
      });
  };

  const getWardsAPI = async (code) => {
    return await axios
      .get(`https://provinces.open-api.vn/api/d/${code}?depth=2`)
      .then((res) => {
        setWards(res.data.wards);
      });
  };

  const handleChangeProvince = (event) => {
    setProvince(event.target.value);
    setAddress({ ...address, province: event.target.value.name });
    getDistrictsAPI(event.target.value.code);
  };

  const handelChangeDistrict = (event) => {
    setDistrict(event.target.value);
    setAddress({ ...address, district: event.target.value.name });
    getWardsAPI(event.target.value.code);
  };

  const handelChangeWards = (event) => {
    setWard(event.target.value);
    setAddress({ ...address, wards: event.target.value.name });
  };

  const addressService = new AddressService();

  var userID = parseInt(localStorage.getItem("userId"));

  const initAddress = {
    name: "",
    user_id: userID,
    phoneNumber: "",
    province: "",
    district: "",
    wards: "",
    detail: "",
  };

  const [address, setAddress] = React.useState(initAddress);

  function createAddress() {
    addressService.addAddress(address).then((data) => {
      toast.current.show({
        severity: "success",
        summary: "Thêm Thành công!",
        life: 1000,
      });

      props.getAddressApi();
    });
  }

  return (
    <Modal
      open={props.openCreateAddress}
      onClose={props.handleCloseCreateAddress}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="absolute right-0 top-0">
          <Toast ref={toast} />
        </div>
        <div className="w-full relative flex items-center justify-center">
          <h3 className="text-center font-semibold text-2xl">THÊM ĐỊA CHỈ</h3>
          <span
            onClick={props.handleCloseCreateAddress}
            className="cursor-pointer absolute right-[-15px] top-[-15px]"
          >
            <HighlightOffIcon fontSize="large" />
          </span>
        </div>
        <div className="w-full flex flex-row items-center justify-center mt-5">
          <span className="w-[25%] font-semibold text-lg">Tên người nhận</span>
          <input
            value={address.name}
            onChange={(e) => setAddress({ ...address, name: e.target.value })}
            className={styleForInput}
            placeholder="Tên người nhận"
          />
        </div>

        <div className="w-full flex flex-row items-center justify-center mt-3">
          <span className="font-semibold text-lg w-[25%]">Số điện thoại</span>
          <input
            value={address.phoneNumber}
            onChange={(e) =>
              setAddress({ ...address, phoneNumber: e.target.value })
            }
            className={styleForInput}
            placeholder="Số điện thoại"
          />
        </div>

        <div className="w-full flex flex-row items-center justify-center mt-3">
          <span className="font-semibold text-lg w-[25%]">Tỉnh/Thành phố</span>
          <div className="w-[70%]">
            <FormControl variant="filled" className="w-full">
              <InputLabel id="demo-simple-select-standard-label">
                Chọn Tỉnh/Thành Phố
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                disableUnderline
                id="demo-simple-select-filled"
                value={province || ""}
                onChange={handleChangeProvince}
                input={
                  <FilledInput
                    classes={{ root: "rounded-lg" }}
                    sx={{ ".MuiSelect-select": { borderRadius: 2 } }}
                  />
                }
              >
                {provinces.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="w-full flex flex-row items-center justify-center mt-3">
          <span className="w-[25%] font-semibold">Quận/Huyện</span>
          <div className="w-[70%]">
            <FormControl
              variant="filled"
              className="w-full"
              classes={{ root: "rounded-lg" }}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Chọn Quận/Huyện
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                disableUnderline
                id="demo-simple-select-filled"
                value={district || ""}
                onChange={handelChangeDistrict}
                input={
                  <FilledInput
                    classes={{ root: "rounded-lg" }}
                    sx={{ ".MuiSelect-select": { borderRadius: 2 } }}
                  />
                }
              >
                {districts.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="w-full flex flex-row items-center justify-center mt-3">
          <span className="w-[25%] font-semibold">Phường/Xã</span>
          <div className="w-[70%]">
            <FormControl variant="filled" className="w-full">
              <InputLabel id="demo-simple-select-standard-label">
                Chọn Phường/Xã
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                disableUnderline
                id="demo-simple-select-filled"
                value={ward || ""}
                onChange={handelChangeWards}
                input={
                  <FilledInput
                    classes={{ root: "rounded-lg" }}
                    sx={{ ".MuiSelect-select": { borderRadius: 2 } }}
                  />
                }
              >
                {wards.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="w-full flex flex-row items-center justify-center mt-3">
          <span className="w-[25%] font-semibold text-lg">Mô tả địa chỉ</span>
          <textarea
            value={address.detail}
            onChange={(e) => setAddress({ ...address, detail: e.target.value })}
            className="w-[70%] h-20 bg-[#EDEDF2] outline-none rounded-lg"
          />
        </div>
        <div
          onClick={createAddress}
          className="cursor-pointer hover:opacity-50 m-auto w-[50%] h-14 mt-5 bg-[#ff1616] rounded-lg flex items-center justify-center"
        >
          <span className="font-semibold text-white">THÊM ĐỊA CHỈ</span>
        </div>
      </Box>
    </Modal>
  );
};

export default CreateAddress;
