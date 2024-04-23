const express = require('express');
const app = express();
const cors = require("cors");
const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const User = require('./view/userSchema');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, '../receipe/public/images');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage });

app.use(bodyParser.json());

require('dotenv').config();


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'somgorai726@gmail.com',
        pass: 'edxt wzxt zbdx tjne',
    },
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

let PORT = 3001;
var dbConnnection;

console.log(User);
mongoose.connect('mongodb+srv://user2000:test234@cluster0.iwjtyp3.mongodb.net/Recipe?retryWrites=true&w=majority&appName=Cluster0').then(res => {
    console.log('connected succesfully');
});

MongoClient.connect('mongodb+srv://user2000:test234@cluster0.iwjtyp3.mongodb.net/Recipe?retryWrites=true&w=majority&appName=Cluster0').then(client => {
    console.log('connected man');
    dbConnnection = client.db();
});



//sending otp to the user and storing it in database
app.post('/api/otp', (req, res) => {

    const email = req.body.email;
    const username = req.body.username;
    const name = req.body.name;
    const password = req.body.password;

    console.log(email);

    // Check if email already exists

    User.findOne({ email: email, username: username })
        .then(existingUser => {
            if (existingUser) {
                return res.status(200).json({ error: 'Email address or Username is already exists' });
            }

            // If email doesn't exist, proceed with OTP generation and user creation
            var otp = Math.floor(Math.random() * 100000);

            bcrypt.hash(otp.toString(), 10, (err, hashedOtp) => { 


                // Generates token for verification
                const userOtp = jwt.sign({ userEmail: email }, 'bsfieusuifhqru0294190248124rhwbfbefsuef032', { expiresIn: "30s" });

                if (password.length > 6) {
                    // Creating hash password 
                    const newUser = new User({
                        email: email,
                        password: password,
                        name: name,
                        username: username
                    });

                    // Insert OTP into the database
                    dbConnnection.collection("Otp").updateOne(
                        { email: email },
                        { $set: { OTP: hashedOtp } },
                    ).then(result => {
                        if (result.matchedCount === 0) {
                            dbConnnection.collection('Otp').insertOne({
                                email: email,
                                OTP: hashedOtp
                            });
                        }
                    })
                    // Validate user data against schema
                    return newUser.validate()
                        .then(() => {
                            // Send OTP via email
                            const mailOptions = {
                                from: "somgorai726@gmail.com",
                                to: email,
                                subject: "Otp for Verification",
                                html: `<h2>Welcome!Thanks for registering in our site.</h2><br><h3>Your Otp is ${otp}</h3>`
                            };
                            transporter.sendMail(mailOptions, (err, info) => {
                                if (!err) {
                                    console.log("Email sent successfully");
                                } else {
                                    console.log("Failed to send Email", err);
                                }
                            });
                            // Send response with OTP token
                            res.send({ otp: hashedOtp, token: userOtp });
                        })
                        .catch(error => {
                            // Handle validation errors
                            res.status(200).send({ error: error.errors[Object.keys(error.errors)[0]].properties.message });
                        });
                }
                else {
                    // Password length check
                    res.status(200).send({ error: "Password must be at least 7 characters long" });
                }
            })
        })
        .catch(error => {
            // Handle database query errors
            console.error('Error checking existing email:', error);
            res.status(500).send({ error: 'Internal server error' });
        });
});

app.post('/api/comment', (req, res) => {

    const index = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const month = index[new Date().getMonth()];
    const day = new Date().getDate();

    dbConnnection.collection('Recipe_items').updateOne(
        { _id: new ObjectId(req.body.recipe_id) },
        {
            $push: {
                comments: {
                    unique_id: req.body.unique_id,
                    user_id: req.body.id,
                    name: req.body.name,
                    comment: req.body.comment,
                    date: `${month} ${day}th, ${new Date().getFullYear()}`,
                    image: req.body.image
                }
            }
        },
        { upsert: true }
    )
})
//verifying the entered otp with stored one
app.post('/api/feed', (req, res) => {

    console.log(req.body.id);


    dbConnnection.collection('users').aggregate([
        {
            "$match": {
                "_id": new ObjectId(req.body.id)
            }
        },
        {
            "$unwind": "$following"
        },
        {
            "$lookup": {
                "from": "Recipe_items",
                "localField": "following.userid",
                "foreignField": "user_id",
                "as": "result"
            }
        },
        {
            "$project": {
                "result.name": 1,
                "result.title": 1,
                "result.Recipe_pic": 1,
                "result.Desc": 1,
                "result.user_id": 1,
                "result.created_at": 1,
                "result._id": 1
            }
        },
        {
            "$group": {
                "_id": "$_id",
                "result": { "$push": "$result" }
            }
        },
        {
            "$unwind": "$result"
        },
        {
            "$unwind": "$result"
        },
        {
            "$sort": {
                "result._id": -1
            }
        },
        {
            $group: {
                _id: "$_id",
                result: { "$push": "$result" }
            }
        }
    ]
    ).toArray().then(data => {
        //    console.log(data?.[0]?.result);
        res.send(data?.[0]?.result);
    })
});

app.post('/api/chart', (req, res) => {

    dbConnnection.collection('Recipe_items').aggregate([
        {
            $match: {
                _id: new ObjectId(req.body.recipeId),
            }
        },
        {
            $unwind: "$rating"
        },
        {
            $group: {
                _id: "$rating.rating",
                count: {
                    $sum: 1
                }
            }
        },
        {
            $group: {
                _id: "null",
                result: {
                    $push: {
                        rating: "$_id",
                        count: "$count"
                    }
                }
            }
        }
    ]).toArray().then((data) => {
        res.send(data[0]?.result);
    })

})
app.post('/api/deleteComment', (req, res) => {

    console.log(req.body.id, req.body.recipe_id);

    dbConnnection.collection("Recipe_items").updateOne(
        { "_id": new ObjectId(req.body.recipe_id) }, // Assuming this is the document _id
        { $pull: { "comments": { "unique_id": req.body.id } } },
        { upsert: true }
    )

})

app.post('/api/getFollowersLength', (req, res) => {

    dbConnnection.collection('users').findOne({ _id: new ObjectId(req.body.id) }).then(data => {
        // console.log(data);
        res.send(data);
    })
})

// app.get('/api/changeRating', async (req, res) => {

//     dbConnnection.collection('Recipe_items').updateOne(
//         { 
//             _id: new ObjectId('661ce43c79abd22e8e71af34'),
//             "rating.userid":'661a4f9e235fc4ed4815a825'
//         },{
//             $set:{
//                 "rating.$.rating":"Very Satisfied"
//             }
//         }
       
//     ).then(response => {
//         console.log(response);
//         // const index = response.rating.findIndex(item => item.userid==='661a4f9e235fc4ed4815a826');
//         // console.log(index);

//         res.send(response);
//     }).catch(error => {
//         console.error("Error:", error);
//         res.status(500).send("Error occurred");
//     });
    
// })
app.post('/api/rating', (req, res) => {

    console.log(req.body.recipeId);

    dbConnnection.collection('Recipe_items').updateOne(
        { _id: new ObjectId(req.body.recipeId) },
        {
            $push: {
                rating: { "userid": req.body.userId, "rating": req.body.rating }
            }
        },
        { upsert: true }
    ).then(result => {
        console.log(result);
        res.send('rated');
    })
})

app.post('/api/verify-otp', (req, res) => {

    const otp = req.body.otp;
    const userOtp = req.body.token;
    const email = req.body.email;
    const username = req.body.username;
    const name = req.body.name;
    const password = req.body.password;

    console.log(otp, email, username, name, password, userOtp);
    jwt.verify(userOtp, 'bsfieusuifhqru0294190248124rhwbfbefsuef032', (err, decoded) => {

        if (decoded === undefined) {

            dbConnnection.collection('Otp').deleteOne({ email: email }).then(result => {
                console.log(result);
            });
            res.send({ 'error': "Otp has expired" });
        } else {
            dbConnnection.collection('Otp').findOne({ email: email }).then(result => {

                bcrypt.compare(otp, result.OTP)
                    .then((isMatch) => {
                        // true if otp matches result.OTP, otherwise false
                        if (isMatch) {

                            bcrypt.hash(password, 10, (err, hashedPassword) => {
                                //creating new instance of User schema  and passing the data to it   
                                const newUser = new User({
                                    email: email,
                                    password: hashedPassword,
                                    name: name,
                                    username: username,
                                    image: "https://mui.com/static/images/avatar/2.jpg"
                                })

                                newUser.save()
                                    .then((user) => {
                                        dbConnnection.collection('Otp').deleteOne({ email: email }).then(result => {
                                            console.log(result);
                                        });
                                        res.setHeader('email', email);
                                        res.send('User registered Successfully');

                                    })

                                // OTP matches, handle the case accordingly
                            })
                        } else {
                            // OTP does not match, handle the case accordingly
                            res.send({ 'error': 'Invalid Otp' })
                        }
                    })
                    .catch((error) => {
                        console.error('Error comparing OTP:', error);
                        // Handle error
                    });


            })
        }

    })
})
app.post('/api/fetching_recipes', (req, res) => {

    dbConnnection.collection('Recipe_items').find().sort({ _id: -1 }).toArray().then(response => {
        // console.log(response);
        res.send(response);
    })
})

app.post('/api/getMethod', (req, res) => {
    const id = req.body.id;

    // Assuming dbConnection is properly established
    dbConnnection.collection('Recipe_items').findOne({ _id: new ObjectId(id) })
        .then(result => {
            if (!result) {
                // If no document is found with the given id, send a 404 response
                return res.status(404).send({ error: 'Document not found' });
            }
            res.send({ result: result });
        })
        .catch(error => {
            // Handle any errors that occur during the query
            console.error('Error querying database:', error);
            res.status(500).send({ error: 'Internal server error' });
        });
});

app.post('/api/images', upload.array('image', 5), (req, res) => {

    console.log(req.files);
    // req.files.map((item)=>{
    //   console.log(item.filename);
    // })

})

app.get('/api/video/:id', (req, res) => {

    const id = req.params.id;


    dbConnnection.collection('Recipe_items').findOne({ _id: new ObjectId(id) })
        .then(result => {

            if (!result) {
                return res.status(404).send({ error: 'Document not found' });
            }
            const videoPath = result.video;


            const videoFullPath = path.join(__dirname, '..', 'receipe', 'public', 'images', videoPath);

            if (!fs.existsSync(videoFullPath)) {
                return res.status(404).send({ error: 'Video file not found' });
            }

            const stat = fs.statSync(videoFullPath);
            const fileSize = stat.size;

            const range = req.headers.range;
            if (range) {
                // console.log(range);
                //bytes=36891-37217

                const parts = range.replace(/bytes=/, '').split('-');
                const start = parseInt(parts[0], 10);
                const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
                const chunkSize = (end - start) + 1;

                const headers = {
                    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunkSize,
                    'Content-Type': 'video/mp4',
                };

                res.writeHead(206, headers);

                const videoStream = fs.createReadStream(videoFullPath, { start, end });

                videoStream.pipe(res);

                videoStream.on('error', (error) => {
                    console.error('Error streaming video:', error);
                    res.status(500).send({ error: 'Internal server error' });
                });
            } else {
                const headers = {

                    'Content-Length': fileSize,
                    'Content-Type': 'video/mp4',
                };
                console.log('range');
                res.writeHead(200, headers);
                fs.createReadStream(videoFullPath).pipe(res);

            }
        })
        .catch(error => {
            console.error('Error querying database:', error);
            res.status(500).send({ error: 'Internal server error' });
        });
});

app.post('/api/edit', upload.fields([{ name: 'image' }, { name: 'video' }]), (req, res) => {

    console.log(req.body.id);

    const videoFilename = req.files['video']?.[0]?.filename || req.body.video;
    const imageFilename = req.files['image']?.[0]?.filename || req.body.image;

    console.log(videoFilename);
    // console.log(imageFilename);

    const videoField = videoFilename !== null ? videoFilename : null;

    console.log(videoField);

    const index = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const month = index[new Date().getMonth()];
    const day = new Date().getDate();

    dbConnnection.collection('Recipe_items').updateOne(
        { _id: new ObjectId(req.body.id) },
        {
            $set: {
                name: req.body.name,
                title: req.body.title,
                Recipe_pic: imageFilename,
                Desc: req.body.desc,
                recipe_method: req.body.method,
                ingredients: JSON.parse(req.body.ingredients),
                user_id: new ObjectId(req.body.user_id),
                created_at: `${month} ${day}th, ${new Date().getFullYear()}`,
                video: videoField,

            }
        }
    ).then(result => {
        res.send('success');
    }).catch((err) => {
        console.log("ERROR", err);
    })
})

app.post('/api/userDetails', (req, res) => {

    dbConnnection.collection('users').findOne({ _id: new ObjectId(req.body.userid) }).then(data => {
        res.send(data);
    })
})
app.post('/api/deletePost', (req, res) => {

    dbConnnection.collection('Recipe_items').deleteOne({ _id: new ObjectId(req.body.id) }).then((result) => {
        if (!result.deletedCount) {
            return res.status(404).send("No recipe with that id was found.")
        } else {
            res.send('Deleted successfully');
        }
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });

})

app.post('/api/create', upload.fields([{ name: 'image' }, { name: 'video' }]), (req, res) => {

    const index = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const month = index[new Date().getMonth()];
    const day = new Date().getDate();
    const videoFilename = req.files['video']?.[0]?.filename || null;

    dbConnnection.collection('Recipe_items').insertOne({
        name: req.body.name,
        title: req.body.title,
        Recipe_pic: req.files['image'][0].filename,
        Desc: req.body.desc,
        recipe_method: req.body.method,
        ingredients: JSON.parse(req.body.ingredients),
        user_id: new ObjectId(req.body.id),
        created_at: `${month} ${day}th, ${new Date().getFullYear()}`,
        video: videoFilename,
        comments: []

    }).then((data) => {
        console.log(data);
        res.send('success');
    }).catch((err) => {
        console.log(err);
    });

})
app.post('/api/getRecipeDetails', (req, res) => {

    const user_id = req.body.userid;

    dbConnnection.collection('Recipe_items').aggregate([

        {
            $match: {
                user_id: new ObjectId(user_id)
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: '_id',
                as: 'result'
            }
        },
        {
            $addFields: {
                result: {
                    $arrayElemAt: ['$result', 0]
                }
            }
        },
        {
            $sort: {
                created_at: -1
            }
        }

    ]).toArray().then(result => {
        if (!result) { throw new Error("No data available") };


        // console.log({result:result,length:result[0]?.result?.followers?.length});

        res.send({ result: result, length: result[0]?.result?.followers?.length });

    })

})

app.post('/api/login', (req, res) => {

    dbConnnection.collection('users').findOne({ email: req.body.email }).then(result => {

        console.log(result);
        if (result) {
            if (result.email === req.body.email) {

                bcrypt.compare(req.body.password, result.password).then(result1 => {
                    console.log(result);
                    if (result1) {
                        console.log({ result: result, success: 'success' });
                        res.send({ result: result, success: 'success' });
                    } else {
                        console.log('Password is incorrect');
                        res.send({ 'error': 'Password is incorrect!!' })
                    }

                });
            }
        } else {
            console.log("User Not Found");
            res.send({ 'error': 'Email does not exists!' });
        }
    })
})
app.post('/api/change', upload.single('image'), (req, res) => {


    console.log(req.file);
    console.log(req.body.id);

    dbConnnection.collection('users').updateOne(
        { _id: new ObjectId(req.body.id) },
        {
            $set:
            {
                "image": req.file.filename
            }
        },
        { upsert: true }
    ).then(result => {

        res.send(req.file.filename)
    })

})
app.post('/api/follow', (req, res) => {

    dbConnnection.collection('users').updateOne(
        {
            _id: new ObjectId(req.body.userid)
        },
        {
            $push:
            {
                followers: {
                    "userid": new ObjectId(req.body.id),
                    "username": req.body.name,
                    "name": req.body.username,
                    "image": req.body.image
                }
            }
        },
        { upsert: true }
    )
    dbConnnection.collection('users').updateOne(
        {
            _id: new ObjectId(req.body.id)
        },
        {
            $push:
            {
                following: {
                    "userid": new ObjectId(req.body.userid),
                    "username": req.body.followername,
                    "image": req.body.userimage
                }
            }
        },
        { upsert: true }
    )
})

app.post('/api/unfollow', (req, res) => {

    dbConnnection.collection('users').updateOne(
        {
            _id: new ObjectId(req.body.userid)
        },
        {
            $pull:
            {
                followers: {
                    "userid": new ObjectId(req.body.id),

                }
            }
        },
        { upsert: true }
    )
    dbConnnection.collection('users').updateOne(
        {
            _id: new ObjectId(req.body.id)
        },
        {
            $pull:
            {
                following: {
                    "userid": new ObjectId(req.body.userid),

                }
            }
        },
        { upsert: true }
    )
})
app.post('/api/users', (req, res) => {

    dbConnnection.collection("users").findOne({ _id: new ObjectId(req.body.userid) }).then(result => {
        res.send(result);
    })
})
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));