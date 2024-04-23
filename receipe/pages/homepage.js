import { Footer } from "@/components/Footer";
import HomepageNav from "@/components/HomepageNav";
import { Height } from "@mui/icons-material";
import { Box, CardMedia, Typography, Grid, Button } from '@mui/material'
import { useRouter } from "next/router";
import { useGSAP } from "@gsap/react";
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useRef } from "react";
import styles from '../styles/Home.module.css'
import Swapper from "@/components/Swapper";

gsap.registerPlugin(ScrollTrigger);


export default function homepage() {

    const router = useRouter();
    const scrollRef0 = useRef(null);
    const scrollRef00 = useRef(null);
    const scrollRef = useRef(null);
    const scrollRef1 = useRef(null);
    const scrollRef2 = useRef(null);
    const scrollRef3 = useRef(null);
    const scrollRef7 = useRef(null);
    const scrollRef8 = useRef(null);
    const scrollRef9 = useRef(null);
    const scrollRef10 = useRef(null);
    const pscrollRef1 = useRef(null);
    const pscrollRef2 = useRef(null);
    const pscrollRef3 = useRef(null);
    const scrollRef20 = useRef(null);
    const scrollRef21 = useRef(null);

    useGSAP(() => {

        gsap.fromTo("#Grid1", {
            opacity: 0,
            y: -500
        }, {
            opacity: 1,
            y: 0,
            delay: 1
        })

    }, []);

    useGSAP(() => {

        gsap.fromTo("#text0", {
            opacity: 0,
            x: 750
        }, {
            x: 450,
            opacity: 1,
            scrollTrigger: {
                trigger: '#text0',
                start: 'top bottom',
                end: 'top 10%',
                scrub: true
            }
        })

    });

    const scrollRef000=useRef(null);
    useGSAP(() => {

        gsap.fromTo("#text00", {
            opacity: 0,
            x: 450
        }, {
            x: 290,
            opacity: 1,
            scrollTrigger: {
                trigger: '#text00',
                start: 'top bottom',
                end: 'top 10%',
                scrub: true
            }
        })

    },{scope:scrollRef000});

    useGSAP(() => {

        gsap.fromTo('#pGrid2', {
            x: -60,
            opacity: 0
        }, {
            x: '0',
            opacity: 1,
            scrollTrigger: {
                trigger: '#pGrid2',
                start: 'top center',
                end: 'top 10%',
                scrub: true
            }
        });
    }, { scope: pscrollRef1 });

    useGSAP(() => {

        gsap.fromTo('#pGrid3', {
            scale: 0,
            opacity: 0
        }, {
            scale: '1.2',
            opacity: 1,
            scrollTrigger: {
                trigger: '#pGrid3',
                start: 'top center',
                end: 'top 10%',
                scrub: true
            }
        });
    }, { scope: pscrollRef2 });

    useGSAP(() => {

        gsap.fromTo('#Grid2', {
            x: -590,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: '#Grid2',
                start: 'top center',
                end: 'top 10%',
                scrub: true
            }
        });
    });

    useGSAP(() => {

        gsap.fromTo('#ptext1', {
            opacity: 0
        }, {

            opacity: 1,
            scrollTrigger: {
                trigger: '#ptext1',
                start: 'top center',
                end: 'top 10%',
                scrub: true
            }
        });
    });
    useGSAP(() => {

        gsap.fromTo('#text1', {
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: '#Grid2',
                start: 'top center',
                end: 'top 10%',
                scrub: true
            }
        });
    });

    useGSAP(() => {

        gsap.fromTo('#Grid7', {
            opacity: 0,
            scale: 1.4
        }, {
            scale: 1,
            duration: 1,
            opacity: 1,
            scrollTrigger: {
                trigger: '#Grid7',
                start: 'top center',
                end: 'top 10%',
                scrub: true
            }
        });
    });

    useGSAP(() => {

        gsap.fromTo('#Grid9', {
            opacity: 0,
            x: 100
        }, {
            x: 0,
            duration: 1,
            opacity: 1,
            scrollTrigger: {
                trigger: '#Grid9',
                start: 'top center',
                end: 'top 10%',
                scrub: true
            }
        });
    });

    useGSAP(() => {

        gsap.fromTo('#Grid10', {
            opacity: 0,
            x: -700
        }, {
            x: 0,
            duration: 1,
            opacity: 1,
            scrollTrigger: {
                trigger: '#Grid10',
                start: 'top center',
                end: 'top 10%',
                scrub: true
            }
        });
    });
    useGSAP(() => {

        gsap.fromTo('#Grid8', {
            opacity: 0,
            scale: 1.4
        }, {
            scale: 1,
            duration: 1,
            opacity: 1,
            scrollTrigger: {
                trigger: '#Grid8',
                start: 'top center',
                end: 'top 10%',
                scrub: true
            }
        });
    });

    useGSAP(() => {

        gsap.fromTo('#text2', {
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: '#Grid3',
                start: 'top center',
                end: 'top 10%',
                scrub: true
            }
        });
    });
    useGSAP(() => {
        gsap.fromTo('#Grid3', {
            x: 50,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: '#Grid3',
                start: 'top center',
                end: 'top 10%',
                scrub: true
            }
        })
    })
    useGSAP(() => {
        gsap.fromTo('#Grid4', {
            x: -790,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: '#Grid4',
                start: 'top bottom',
                end: 'top 40%',
                scrub: true
            }
        })
    })

    useGSAP(() => {
        gsap.fromTo('#pGrid4', {
            x: -150,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: '#pGrid4',
                start: 'top center',
                end: 'top 40%',
                scrub: true
            }
        })
    })

    useGSAP(() => {
        gsap.fromTo('#Grid5', {
            x: -250,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: '#Grid5',
                start: 'top bottom',
                end: 'top 40%',
                scrub: true
            }
        })
    })
    const subtitle2=useRef(null);
    useGSAP(() => {
        gsap.fromTo('#subtitle2', {
            
            opacity: 0
        }, {
            opacity: 1,
            scrollTrigger: {
                trigger: '#subtitle2',
                start: 'top bottom',
                end: 'top 40%',
                scrub: true
            }
        })
    })


    useGSAP(() => {
        gsap.fromTo('#button', {
            x: -250,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: '#button',
                start: 'top bottom',
                end: 'top 40%',
                scrub: true
            }
        })
    })

    return (
        <div style={{ backgroundColor: "black", minHeight: "100vh", minWidth: "100vw",fontStretch: 'extra-condensed',
        fontFamily: 'math',
        fontWeight: '500',
        fontVariant: 'small-caps' }} >

            <div className="phoneSize">
                <div>
                    <HomepageNav />
                </div>

                <div id="Grid1" className="imageContainer">
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={12}>

                            <h2 className="title">Discover the Ultimate Culinary Hub</h2>

                            <h4 className="subtitle">Embark on a culinary journey with our full-service recipe platform. Explore a comprehensive array of offerings, from ingredient sourcing and preparation to testing, analysis, and recipe preservation...</h4>

                            <div>

                                <Button variant="outlined" className="login" onClick={(e) => router.push('/hi')}>Login</Button>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={12} style={{ justifyContent: "center", alignContent: "center", textAlign: "center", alignItems: "Center" }}>

                            <Grid item xs={12} sm={12}  >

                            </Grid>

                        </Grid>

                    </Grid>
                </div>
                <center> <div>
                    <img src="../images/iceCream.jpg" className="img1" alt="" id="pGrid2" ref={pscrollRef1} />
                </div></center>

                <div>
                    <center><img src="../images/apple.jpg" className="img2" alt="" id="pGrid3" ref={pscrollRef2} /></center>
                </div>

                <center><div className="subtitle2" id="subtitle2" ref={subtitle2}>
                    "Cooking is like painting or writing a song. Just as there are only so many notes or colors, there are only so many flavors - it's how you combine them that sets you apart."
                </div></center>

                <div>
                    <center><img src="../images/capsicum.jpg" className="img3" alt="" /></center>
                </div>

                <center><div className="subtitle2" >
                    "Cooking is like painting or writing a song. Just as there are only so many notes or colors, there are only so many flavors - it's how you combine them that sets you apart."
                </div></center>


                <div >
                    <center> <img src="https://www.foodiesfeed.com/wp-content/uploads/2022/11/tuna-poke-with-fresh-vegetables.jpg" className="img5" alt="" id="pGrid4" ref={scrollRef21} /></center>
                </div>

                <center><div className="subtitle4">
                    "Crafted with precision, our recipe algorithm ensures that every ingredient harmonizes perfectly, elevating flavors and textures to delight your taste buds with each bite."
                </div></center>


                <div>
                    <center> <img src="https://www.foodiesfeed.com/wp-content/uploads/2019/04/breakfast-sandwich-with-poached-eggs-and-sprouts.jpg" className="img6" alt="" id="Grid5" ref={scrollRef3} /></center>
                </div>

                <center><div className="subtitle4">
                    "Discover our culinary innovation, where our cutting-edge recipe technology optimizes flavors, textures, and presentation, ensuring every dish shines like a masterpiece on your plate."
                </div></center>

                <center><div style={{ fontWeight: 100, fontSize: '1.5rem', color: '#86868b', marginBottom: '10px' }}>
                    Nurture Your Cooking Skills with Our Platform!
                </div></center>

                <center ><div style={{ maxWidth: "90vw" }}>
                    <Swapper /></div>
                </center>

                <center><div className="div" id="button" ref={scrollRef20}>
                    <h1 className="innerdiv">Ready to get started?</h1>
                    <div className="innerdiv1"><Button variant="outlined" onClick={(e) => router.push('/welcome')} >Join with Us</Button></div>
                </div></center>


                <Footer />


            </div>


            <div className="laptopLarge">
                <div style={{ color: "white", fontSize: "1rem" }}>

                    <div>
                        <HomepageNav />
                    </div>

                    <div id="Grid1">
                        <Grid container spacing={5}  >
                            <Grid item xs={12} sm={12} md={12} lg={7} sx={{ textAlign: "center", alignItems: "center", alignContent: "center", marginTop: "-250px" }}>

                                <Typography variant="h2" style={{ color: "white", fontSize: "4.4rem", marginBottom: "15px", color: "#86868b" }}>Discover the Ultimate Culinary Hub</Typography>

                                <Typography variant="h6" style={{ color: "white", marginBottom: "20px", marginLeft: "3px", color: "#86868b" }}>Embark on a culinary journey with our full-service recipe platform. Explore a comprehensive array of offerings, from ingredient sourcing and preparation to testing, analysis, and recipe preservation...</Typography>

                                <div style={{ marginTop: "70px" }}>
                                    <Button variant="outlined" sx={{ width: "200px", height: "55px", marginRight: "20px", borderRadius: "35px" }}
                                        onClick={(e) => router.push('/welcome')}>Start Your Journey</Button>

                                    <Button variant="outlined" sx={{ width: "200px", height: "55px", borderRadius: "35px" }} onClick={(e) => router.push('/hi')}>Sign in</Button>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={4} style={{ justifyContent: "center", alignContent: "center", textAlign: "center", alignItems: "Center" }}>

                                <Grid item xs={12} sm={12} md={12} lg={3} >
                                    <img src="../images/iceCream.jpg" style={{ width: "400px", height: "auto" }} alt="" />
                                </Grid>
                                <Grid xs={12} sm={12} md={12} lg={3} >
                                    <img src="../images/drink.jpg"
                                        style={{ width: "400px", height: "auto", borderRadius: "15px", opacity: 0.8 }}

                                    />
                                </Grid>
                            </Grid>

                        </Grid>
                    </div>
                    <div >
                        <Grid container spacing={5} >

                            <Grid item xs={12} sm={12} md={12} lg={7} style={{
                                textAlign: "center"
                            }} >
                                <img src="../images/apple.jpg" style={{ width: "400px", height: "auto", marginTop: "-150px" }} alt="" id="Grid2" ref={scrollRef} />
                            </Grid>



                            <Grid item xs={12} sm={12} md={12} lg={4} style={{ textAlign: "center", marginTop: "150px", color: "#86868b" }} >
                                <span style={{ fontSize: "1.2rem", fontWeight: 100 }} id="text1" ref={scrollRef}>
                                    "Cooking is like painting or writing a song. Just as there are only so many notes or colors, there are only so many flavors - it's how you combine them that sets you apart."
                                </span>
                            </Grid>

                        </Grid>
                    </div>
                    <Grid container spacing={5}>

                        <Grid item xs={12} sm={12} md={12} lg={7} style={{ textAlign: "center", marginTop: "55px", color: "#86868b" }}>
                            <Typography variant="h6" id="text2" ref={scrollRef1}>
                                "Cooking is like painting or writing a song. Just as there are only so many notes or colors, there are only so many flavors - it's how you combine them that sets you apart."
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={5} style={{
                            textAlign: "center", marginBottom: "20px"
                        }}>
                            <img src="../images/capsicum.jpg" style={{ width: "400px", height: "auto", opacity: 0.8, marginTop: "-178px" }} alt="" id="Grid3" ref={scrollRef1} />
                        </Grid>
                    </Grid>

                    <Grid container spacing={0}>

                        <Grid item xs={12} sm={12} md={12} lg={6} style={{
                            textAlign: "end", marginBottom: "20px"
                        }}>
                            <img src="https://www.foodiesfeed.com/wp-content/uploads/2022/11/tuna-poke-with-fresh-vegetables.jpg" style={{ width: "400px", height: "auto", opacity: 0.8, marginTop: "-178px" }} alt="" id="Grid4" ref={scrollRef2} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={6} style={{ textAlign: "center", maxWidth: "396px", marginTop: "20px", color: "#86868b" }}>
                            <Typography>"Crafted with precision, our recipe algorithm ensures that every ingredient harmonizes perfectly, elevating flavors and textures to delight your taste buds with each bite."</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={0}>


                        <Grid item xs={12} sm={12} md={12} lg={4} style={{ textAlign: "end", maxWidth: "396px", marginTop: "100px", marginLeft: "300px", color: "#86868b", position: "relative", left: "-49px" }}>
                            <Typography>
                                "Discover our culinary innovation, where our cutting-edge recipe technology optimizes flavors, textures, and presentation, ensuring every dish shines like a masterpiece on your plate."</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={6} style={{
                            textAlign: "center", marginBottom: "20px"
                        }}>
                            <img src="https://www.foodiesfeed.com/wp-content/uploads/2019/04/breakfast-sandwich-with-poached-eggs-and-sprouts.jpg" style={{ width: "400px", height: "auto", opacity: 0.8, marginTop: "-178px", marginRight: '304px' }} alt="" id="Grid5" ref={scrollRef3} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={12} lg={4} style={{ textAlign: "center", marginTop: "52px", maxWidth: "500px" }}>
                            <Typography variant="h1" style={{ marginLeft: "102px", fontSize: "2.6rem", color: "#86868b" }}>
                                Nurture Your Cooking  Skills
                                with Our Platform!
                            </Typography>

                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={8} style={{ marginTop: "149px", marginLeft: '312px', textAlign: "center" }}>
                            <img src="https://media.istockphoto.com/id/1366953086/photo/korean-dishes.jpg?b=1&s=612x612&w=0&k=20&c=EzVmZRb1cZ0IgsxV8kl3gKuAc4c-wnsvDaK5xeSeZt4=" style={{ width: "400px", height: "366px", borderRadius: '39px' }} id="Grid7" ref={scrollRef7} />

                            <img src="https://media.istockphoto.com/id/1398669454/photo/chilli-soya-chunks.jpg?b=1&s=612x612&w=0&k=20&c=FgQxgZvp5pkyf2eEWlBqoRK51d9KUx3_VT5Tcto62FY=" style={{ width: "398px", height: "370px", marginLeft: "4px", borderRadius: "38px", position: "relative", top: "-96px" }} id="Grid9" ref={scrollRef9} />

                            <img src="https://media.istockphoto.com/id/1155238046/photo/sweet-and-sour-chicken-in-a-bowl-with-rice.jpg?b=1&s=612x612&w=0&k=20&c=DiOws_otksK6hK7OF0p_Mjjz8amZymj-e4wo9R0c5Zw=" style={{
                                width: "404px", height: "376px", borderRadius: '46px', position: 'relative',
                                top: '-4px'
                            }} id="Grid10" ref={scrollRef10} />

                            <img src="https://www.foodiesfeed.com/wp-content/uploads/2019/01/pizza.jpg" style={{ width: "379px", height: "366px", marginLeft: "4px", borderRadius: "49px", position: "relative", top: "-89px" }} id="Grid8" ref={scrollRef8} />
                        </Grid>
                    </Grid>

                    <div id="text0" ref={scrollRef0} style={{ width: '578px', marginTop: "150px", marginBottom: "200px" }}>
                        <Typography variant="h2">Ready to get started?</Typography>
                        <center><Button variant="outlined" style={{ width: "150px", height: "50px", marginTop: "20px", marginBottom: "20px" }} onClick={(e) => router.push('/welcome')} >Join with Us</Button></center>
                    </div>

                    <Footer />
                </div>
            </div>
        </div>
    )
}
