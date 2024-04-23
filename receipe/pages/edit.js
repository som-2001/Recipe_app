import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Image from "next/image";
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import styles from '../styles/Home.module.css'
import ClippedDrawer from "@/components/ClippedDrawer";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import VerticalLinearStepper from "@/components/VerticalLinearStepper";
import LinearBuffer from "@/components/LinearBuffer";
import { toast, Toaster } from 'sonner';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { useRouter } from "next/router";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { NEXT_APP_BASE_URL } from "@/components/Env";
import { useSelector } from "react-redux";
import ClearIcon from '@mui/icons-material/Clear';

const EditRecipe = () => {

    const router = useRouter();
    const {editResult}=useSelector(state=>state.msg);
    const [ingredients, setIngredients] = useState(editResult.ingredients);
    const [recipeImage, setRecipeImage] = useState(editResult.Recipe_pic);
    const [title, setTitle] = useState(editResult.title);
    const [desc, setDesc] = useState(editResult.Desc);
    const [method, setMethod] = useState(editResult.recipe_method);
    const [video,setVideo]=useState(editResult.video);
    const [hide1, setHide1] = useState(false);
    const [hide2, setHide2] = useState(false);
    const [hide, setHide] = useState(false);
    const [open, setOpen] = useState(false);
    



    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };


    const onEdit = () => {
 
        console.log(recipeImage);

        if (title === '') return toast.error("Please enter a title for the recipe");
        else if (title.length < 5) return toast.error("The title should be at least 5 characters long");
        else if (method === '') return toast.error("Please add steps for the method of preparation");
        else if (method.length < 20) return toast.error("The method should be at least 20 characters long");
        else if (desc === '') return toast.error("Please provide a description of the recipe")
        else if (desc.length < 10) return toast.error("The title should be at least 20 characters long");
        else if(video!==null && video.size>40000000) return toast.error("The video size should be less than 30MB");
        else if (!recipeImage) return toast.error("Please upload an image for your recipe")

        if (recipeImage) {

            var formdata = new FormData();
            formdata.append('id',editResult._id);
            formdata.append('title', title);
            formdata.append('method', method);
            formdata.append('ingredients', JSON.stringify(ingredients));
            formdata.append('image', recipeImage);
            formdata.append('user_id', localStorage.getItem('id'));
            formdata.append('name', localStorage.getItem('name'));
            formdata.append('desc', desc);
            formdata.append('video', video);
            axios.post(`${NEXT_APP_BASE_URL}/edit`, formdata).then(res => {

                if (res.data === 'success') {
                    toast.success('Your Recipe has been updated successfully');
                    setOpen(true);
                    setTimeout(() => {
                        router.push(`/profileMe/${localStorage.getItem('id')}`)
                    }, 1500);
                }
            })
        } else {
            toast('Please upload an image for your recipe');
        }
    }
    const handleChange = (index, key, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index][key] = value;
        setIngredients(newIngredients);
    };

    const handleAddIngredient = () => {
        setHide(false);
        setIngredients([...ingredients, { ingredient: '', quantity: '' }]);
    };

    const handleRemoveIngredient = (index) => {
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);
        setIngredients(newIngredients);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        console.log(file);
        setHide1(!hide1);
        setRecipeImage(file);
    
    };

    const handleVideoChange=(event)=>{

        const file=event.target.files[0];
        setVideo(file);
        setHide2(true);
    }

    return (
        <div style={{ minHeight: "100vh" }}>

            <ClippedDrawer />
            <div style={{ marginTop: "4rem" }}>
                <LinearBuffer />
            </div>
            <div style={{ marginTop: "6rem", marginLeft: "4rem", fontFamily: "ui-rounded" }}>

                <center style={{ marginBottom: "50px" }}><Typography variant="h5" >Share your
                    <span style={{ color: "#B22222" }}> R</span>
                    <span style={{ color: "#DC143C" }}>e</span>
                    <span style={{ color: "#FF4500" }}>c</span>
                    <span style={{ color: "#CD5C5C" }}>i</span>
                    <span style={{ color: "#FF6347" }}>p</span>
                    <span style={{ color: "#FF8C00" }}>e</span> with others</Typography></center>

                <Toaster position="top-right" autoClose={3} />
                <Grid container spacing={2} alignItems="center" justifyContent="center">

                    <Grid item xs={12} sm={12} md={7} lg={5} >
                        <div style={{ textAlign: 'center' }} >
                            <img src="/../images/3.jpg" class={styles.size} alt="" />
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={10} md={5} lg={7}>
                        <VerticalLinearStepper />


                        <div>

                            <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={open}
                                onClick={handleClose}
                            >
                                <CircularProgress color="inherit" />
                            </Backdrop>
                        </div>



                        <form>
                            <Box className="out_rgt">

                                <Box className="form_grp">
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Recipe name"
                                       
                                        defaultValue={title}
                                        style={{ marginBottom: "20px", width: "85%", marginLeft: "20px" }}
                                        placeholder="Recipe name"
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Box>


                                <Box className="form_grp">
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Recipe method"
                                        multiline
                                        rows={4}
                                        defaultValue={method}
                                        style={{ marginBottom: "20px", width: "85%", marginLeft: "20px" }}
                                        placeholder="Recipe method"
                                        onChange={(e) => setMethod(e.target.value)}
                                    />
                                </Box>

                                <Box className="form_grp">
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Recipe description"
                                        defaultValue={desc}
                                        style={{ marginBottom: "20px", width: "85%", marginLeft: "20px" }}
                                        placeholder="Recipe Description"
                                        onChange={(e) => setDesc(e.target.value)}
                                    />
                                </Box>

                                <Box className="form_grp" sx={{ paddingBottom: "20px", marginLeft: "20px" }}>
                                    <span style={{ fontSize: "1.2rem", fontWeight: "100", marginRight: "20px", marginBottom: "20px" }}>Image Upload:*</span>
                                    <Button variant="contained" component="label">
                                        Upload Recipe Image
                                        <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} required />
                                    </Button><br/>
                                    {!hide1 ? (<img src={`../images/${recipeImage}`} alt="" style={{width:"150px",height:"auto",marginTop:"10px"}}/>):(
                                        <span >{recipeImage.name}</span>
                                    )}
                                </Box>
                               
                                <Box className="form_grp" sx={{ paddingBottom: "20px", marginLeft: "20px" }}>
                                    <span style={{ fontSize: "1.2rem", fontWeight: "100", marginRight: "20px", marginBottom: "20px" }}>Video Upload:(optional)</span>
                                    <Button variant="contained" component="label">
                                        Upload Recipe Video
                                        <input type="file" accept="video/*" style={{ display: "none" }} onChange={handleVideoChange} />
                                    </Button>
                                    {!hide2 ? (video!==null && video!=="null" ?(<><video style={{ width: '85%', height: "244", borderRadius: '10px',marginTop:'12px' }}  controls >
                                            <source src={`${NEXT_APP_BASE_URL}/video/${editResult._id}`} type="video/mp4"></source>
                                        </video> <ClearIcon onClick={(e)=>{setHide2(!hide2); setVideo(null)}}/></>):null):(
                                        <span >{video?.name}</span>
                                    )}
                                </Box>

                                <Typography style={{ marginBottom: "10px", marginLeft: "20px" }}>Add ingredients (optional)</Typography>
                                {ingredients.map((ingredient, index) => (
                                    <div key={index}>
                                        <div style={{ display: "flex" }}>
                                            <TextField
                                                type="text"
                                                id="outlined-required"
                                                label="Ingredient"
                                                placeholder="Ingredient"
                                                value={ingredient.ingredient}
                                                style={{ marginBottom: "20px", width: "34%", marginRight: "10px", marginLeft: "20px" }}
                                                onChange={(e) => { setHide(true); handleChange(index, 'ingredient', e.target.value) }}
                                            />

                                            <TextField
                                                type="text"
                                                placeholder="Quantity"
                                                id="outlined-required"
                                                label="Quantity"
                                                value={ingredient.quantity}
                                                style={{ marginBottom: "20px", width: "34%" }}
                                                onChange={(e) => { setHide(true); handleChange(index, 'quantity', e.target.value) }}
                                            />

                                            {index !== 0 && (
                                                <Button type="button" onClick={() => {

                                                    handleRemoveIngredient(index)
                                                }}>
                                                    <RemoveCircleOutlineOutlinedIcon />
                                                </Button>
                                            )}

                                        </div>
                                        {hide && index === ingredients.length - 1 && (
                                            <Button type="button" variant="contained" style={{ marginLeft: "20px", marginBottom: "20px" }} onClick={handleAddIngredient}>
                                                <AddCircleOutlineOutlinedIcon />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <center>
                                    <Box className="form_grp">
                                        <Button variant="contained" sx={{ width: "15rem", marginBottom: "2rem" }} onClick={onEdit}>Submit</Button>

                                    </Box>
                                </center>
                            </Box>
                        </form>
                    </Grid>

                </Grid>
            </div>
        </div >
    );
}

export default EditRecipe;