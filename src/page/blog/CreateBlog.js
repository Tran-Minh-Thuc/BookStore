import React from 'react';
import { Modal, Box } from '@mui/material';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    height: "90%",
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    p: 4,
    outline: "none",
    borderRadius: "8px",
};
const CreateBlog = (props) => {
    const [title, setTitle] = React.useState("");
    return (
        <Modal
            open={props.openCreateBlog}
            onClose={props.handleCloseCreateBlog}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className='relative w-full'>
                    <span
                        onClick={props.handleCloseCreateBlog}
                        className='absolute cursor-pointer right-[-15px] top-[-15px]'>
                        <HighlightOffIcon fontSize='large' />
                    </span>
                </div>
                <input className='p-2 outline-none w-full border-none mb-2 text-2xl' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Nhập tiêu đề của bài viết' />

                <Editor
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorStyle={{
                        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                        minHeight: "200px",
                        paddingLeft: "20px",
                    }}
                    onContentStateChange={() => console.log("onEditorStateChange")}
                />
            </Box>
        </Modal>
    )
}

export default CreateBlog