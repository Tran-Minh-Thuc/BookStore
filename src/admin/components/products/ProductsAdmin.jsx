import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import BookService from "../../../service/BookService";
import NewProductForm from "../../../component/admin/newProductForm";
import Table from "react-bootstrap/Table";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ProductsAdmin = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [selectedDelete, setSelectedDelete] = useState({});

  const bookService = new BookService();
  const [data, setData] = React.useState([]);
  const [showProductModal, setShowProductModal] = useState(false);

  function getApi() {
    return bookService.getAll();
  }

  useEffect(() => {
    getApi().then((data) => {
      setData(data);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const deleteProduct = async (id) => {
    bookService.deleteBook(id).then(() => {
      getApi().then((data) => {
        setData(data);
      });
    });
  };

  const ProductItem = (props) =>
    props.data.map((item) => (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>
          <img src={item.image} alt="" />
        </td>
        <td>{item.name}</td>
        <td>{item.author.join(" | ")}</td>
        <td>{item.typeOfBook.join(" | ")}</td>
        <td>{item.price}</td>
        <td>
          <span className="pr-2 hover:text-green-600 cursor-pointer">
            <i className="pi pi-info-circle" />
          </span>

          <span
            className="hover:text-red-600 cursor-pointer"
            onClick={() => {
              setSelectedDelete(item);
              handleClickOpen();
            }}
          >
            <i className="pi pi-trash" />
          </span>
        </td>
      </tr>
    ));

  return (
    <div className="w-full h-screen">
      {/* // Modal Update Product */}
      <div className="w-full">
        <Button variant="outlined" onClick={() => setShowProductModal(true)}>
          Thêm Sản Phẩm
        </Button>
        <Modal
          size="lg"
          show={showProductModal}
          onHide={() => setShowProductModal(false)}
          aria-labelledby="model-new-product"
        >
          <Modal.Header closeButton>
            <Modal.Title id="model-new-product">New product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewProductForm getApi={getApi} setData={setData} />
          </Modal.Body>
        </Modal>
      </div>

      <div className="table-body mt-2">
        <Table striped bordered hover className="h-[1000px]">
          <thead>
            <tr>
              <th>Id</th>
              <th>Hình ảnh</th>
              <th>Tên</th>
              <th>Tác giả</th>
              <th>Thể loại</th>
              <th>Giá</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="h-[1000px]">
            <ProductItem data={data} />
          </tbody>
        </Table>
      </div>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Bạn có muốn xóa sản phẩm?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div className="flex items-center">
                <div className="w-20 h-20">
                  <img
                    style={{ objectFit: "contain" }}
                    src={selectedDelete.image}
                    alt=""
                  />
                </div>
                <span className="font-semibold pl-2">
                  {selectedDelete ? selectedDelete.name : ""}
                  {" - "}
                  {selectedDelete ? selectedDelete.author : ""}
                </span>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Không</Button>
            <Button
              onClick={() => {
                deleteProduct(selectedDelete.id);
                handleClose();
              }}
              autoFocus
            >
              Xóa
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ProductsAdmin;
