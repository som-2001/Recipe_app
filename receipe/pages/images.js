import { Box, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function Images() {
    const [imageURLs, setImageURLs] = useState([]);
    const [files, setFiles] = useState([]);

    const handleChange = (e) => {
        const selectedFiles = e.target.files[0];
        // console.log(typeof(selectedFiles))
        // const urls = Array.from(selectedFiles).map((file) => URL.createObjectURL(file));
        // setImageURLs(urls);
        // setFiles(selectedFiles);
        const url=URL.createObjectURL(selectedFiles);
        setImageURLs(url);
        setFiles(selectedFiles);
    };

    const onSubmit = () => {
        // Clean up blob URLs for all files
        // Array.from(files).forEach((file,index) => URL.revokeObjectURL(file));
        // Clear the state
        const formData=new FormData();
        // Array.from(files).map((file,index)=>formData.append("image", file))
        formData.append('image',files);
        console.log(formData);
        axios.post('http://localhost:3001/api/images',formData,{
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                console.log(progressEvent);
                console.log(loaded);
                console.log(total);
                const percentCompleted = Math.round((loaded * 100) / total);
                console.log(`Upload progress: ${percentCompleted}%`);
              }
        }).then(res=>{

        })
        setImageURLs([]);
        setFiles([]);
    };

    return (
        <div className="images">
            <h1>Images</h1>
            <Box>
                <Button variant="contained" component="label">
                    Upload Image(s)
                    <input
                        type="file"
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={handleChange}
                        multiple // Allow multiple file selection
                    />
                </Button>
                <Button variant="contained" onClick={onSubmit}>Submit</Button>
                <div id="imgUpload">
                    {/* {imageURLs.map((url, index) => ( */}
                        <img
                            // key={index}
                            src={imageURLs}
                            alt={`Preview `}
                            style={{ width: '200px', height: '150px', marginTop: "20px" }}
                        />
                    {/* ))} */}
                </div>
            </Box>
        </div>
    );
}
