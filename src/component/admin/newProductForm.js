import React, { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import BookService from '../../service/BookService';
import { Toast } from 'primereact/toast';


export default function NewProductForm(props) {

    const bookService = new BookService();

    function postApi(book) {
        return bookService.newBook(book);
    }

    const toast = useRef(null);

    const initialValues = {
        name: "",
        image: "",
        author: "",
        typeOfBook: "",
        description: "",
        price: ""
    }

    const [formValue, setFormValue] = useState(initialValues);

    const [productImage, setProductImage] = useState();
    const [preview, setPreview] = useState();

    // const [image, setImage] = useState();

    // const [result, setResult] = useState("");


    const handelChange = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value })
    }

    // function uploader(e) {
    //     const imageFile = e.target.files[0];

    //     const reader = new FileReader();
    //     reader.addEventListener("load", (e) => {
    //         setResult(e.target.result);
    //     });
    //     reader.readAsDataURL(imageFile);
    // }

    // const getByteArray = (event) => {
    //     setImage(event.target.files[0])
    // }

    // const choseFile = (event) => {
    //     uploader(event)
    //     getByteArray(event)
    // }

    useEffect(() => {
        if (productImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(productImage);
        } else {
            setPreview(null);
        }
    }, [productImage]);

    const handleChangeProductImage = (event) => {
        const file = event.target.files[0];
        if (file && file.type.substr(0, 5) === "image") {
            setProductImage(file);
        } else {
            setProductImage(null);
        }
    };

    async function handleOnSubmit(event) {
        if (event && event.preventDefault) {
            event.preventDefault();
            const form = event.currentTarget;

            const fileInput = Array.from(form.elements).find(
                ({ name }) => name === "file"
            );

            const formData = new FormData();

            for (const file of fileInput.files) {
                formData.append("file", file);
            }

            formData.append("upload_preset", "my-uploads");

            const data = await fetch(
                "https://api.cloudinary.com/v1_1/testingcloudinary123/image/upload",
                {
                    method: "POST",
                    body: formData,
                }
            ).then((r) => r.json());

            const book = {
                name: formValue.name,
                image: data.secure_url,
                author: formValue.author,
                typeOfBook: formValue.typeOfBook,
                price: formValue.price,
                description: formValue.description
            }

            const formdata = new FormData();
            formdata.append("name", book.name)
            formdata.append("image", book.image)
            formdata.append("author", book.author)
            formdata.append("typeOfBook", book.typeOfBook)
            formdata.append("price", book.price)
            formdata.append("description", book.description)

            postApi(formdata).then(() => {
                toast.current.show({ severity: 'success', summary: 'Thêm Thành công!', detail: book.name, life: 1000 });
            }).then(() => {
                props.getApi().then((data) => {
                    props.setData(data);
                  });
            })
        }
    }


    return (
        <div className="container">
            <Toast ref={toast} />
            <form onSubmit={handleOnSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <div className='new-image'>
                            <img src={preview} alt=""></img>
                        </div>
                        <div>
                            <Form.Group controlId='image' className='mb-3'>
                                <Form.Control accept="image/*" name="file" type="file" size="sm" onChange={handleChangeProductImage} />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div>
                            <Form.Group controlId='name' className='mb-3'>
                                <Form.Label>Tên</Form.Label>
                                <Form.Control type="text" size="sm" name="name" value={formValue.name} onChange={handelChange} />
                            </Form.Group>

                            <Form.Group controlId='author' className='mb-3'>
                                <Form.Label>Tác giả</Form.Label>
                                <Form.Control type="text" size="sm" name="author" value={formValue.author} onChange={handelChange} />
                            </Form.Group>

                            <Form.Group controlId='typeOfBook' className='mb-3'>
                                <Form.Label>Thể loại</Form.Label>
                                <Form.Control type="text" size="sm" name="typeOfBook" value={formValue.typeOfBook} onChange={handelChange} />
                            </Form.Group>

                            <Form.Group controlId='price' className='mb-3'>
                                <Form.Label>Giá</Form.Label>
                                <Form.Control type="text" size="sm" name="price" value={formValue.price} onChange={handelChange} />
                            </Form.Group>
                        </div>

                    </div>
                </div>

                <div >
                    <Form.Group controlId='description' className='mb-3'>
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control type="text" as="textarea" size="sm" name="description" value={formValue.description} onChange={handelChange} />
                    </Form.Group>
                </div>

                <button className='new-btn' onClick={() => {
                    handleOnSubmit();
                }} >Thêm</button>
            </form>


        </div>
    )
}