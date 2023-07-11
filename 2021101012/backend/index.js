const mongoose = require("mongoose");
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

mongoose.set('strictQuery', false);
const DB = "mongodb+srv://Akhil:Akhil16@cluster0.mdqcuzk.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(DB).then(() => {
    console.log("connection succesful");
}).catch((err) => {
    console.log(err)
});
const secretkey = "mynameisakhilguptaiamfromiiithyderabad";

const userSchema = {
    firstname: String,
    firstname: { type: String, required: true },
    lastname: String,
    lastname: { type: String, required: true },
    username: String,
    username: { type: String, required: true, unique: true },
    email: String,
    email: { type: String, required: true },
    age: String,
    contact: String,
    pass: String,
    pass: { type: String, required: true },
    // About : String
}

const profileSchema = {
    username: String,
    followers: [String],
    following: [String],
}

const SubGredditSchema={
    username : String,
    name : String,
    name: { type: String, required: true },
    followers : [String],
    post : [String],
    postuser : [String],
    // nopisg:String,
    // noppisgun:String,
    description:String,
    banned_keywords:[String],
    tags : [String],
}

const joinrequestSchema = {
    subgredditname : String,
    username : String
}

const commentSchema = {
    subgredditname : String,
    index : Number,
    post : String,
    comment : [String]
}

const reportSchema = {
    subgredditname : String,
    post : String,
    postuser : String,
    ignore : Number,
    username : String,
    reason : String,
    position : Number
}

const User = new mongoose.model("users", userSchema);
const profile = new mongoose.model("profiledata", profileSchema);
const SubGreddit =new mongoose.model("subgreddit", SubGredditSchema);
const Join = new mongoose.model("joinrequest", joinrequestSchema);
const comments = new mongoose.model("comments",commentSchema);
const report = new mongoose.model("report",reportSchema);

app.post("/api/register", function (req, res) {
    bcrypt.hash(req.body.pass, 10, function (err, hash) {
        const newUser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            age: req.body.age,
            contact: req.body.contact,
            pass: hash,
            // About : req.body.About
        });

        const newProfile = new profile({
            username: req.body.username,
        });

        newUser.save(function (err) {
            if (err) {
                console.log(err);
                res.send({ message: 0 });
            } else {
                newProfile.save().then(() => {
                    console.log("Saved user");
                    res.send({ message: 1 });
                }).catch((err) => {
                    console.log(err);
                });
            }
            // newUser.save().then(()=>{
            //     res.send({message:1});
            // }).catch((err)=>{
            //     console.log(err);
            //     res.send({message:0});
            // })
        });
    });
});

    app.post("/api/login", function (req, res) {
        const { username, pass } = req.body;
        User.findOne({ username: username }, (err, us) => {
            if (err) {
                res.send({ messages: 12 })
            } else {
                if (us) {
                    bcrypt.compare(pass, us.pass, function (err, result) {
                        if (result == true) {
                            const token = jwt.sign(us.toJSON(), secretkey);
                            const tosend = { messages: 1, tok: token };
                            res.send(tosend);
                        }
                        else {
                            res.send({ messages: 0 });
                        }
                    });
                } else {
                    res.send({ messages: 12 });
                }
            }
        });
    });

    const authorization = function (req, res, next) {
        const token = req.body.store;
        if (token) {
            try {
                const decode = jwt.verify(token, secretkey);

                req.body.decode = decode;
                next();
            } catch (err) {
                console.log(err);
            }
        } else {
            res.send("Token not found");
            console.log("Authorization Error");
        }
    };

    app.post("/api/update", authorization, function (req, res) {
        const data = req.body.user;
        User.findOneAndUpdate({ username: data.username }, data, (err, us) => {
            if (err) {
                console.log("THIS IS AN UPDATE ERROR IN SERVER");
                console.log(err);
                return res.send({ message: 0 });
            }
            else {
                return res.send({ message: 1 });
            }
        });
    });

    app.post("/api/getdata", authorization, (req, res) => {
        const user = req.body.decode;
        User.findOne({ username: user.username }, (err, us) => {
            if (err) {
                res.send({ message: 0 });
                console.log(err);
            }
            else {
                if (us) {
                    profile.findOne({ username: user.username }, (err, ds) => {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            res.send({ message: us, profile: ds });
                        }
                    })
                }
            }
        })
    })

    app.post("/api/getdataotherprofile", authorization, (req, res) => {
        const user = req.body.name;
        User.findOne({ username: user }, (err, us) => {
            if (err) {
                res.send({ message: 0 });
                console.log(err);
            }
            else {
                if (us) {
                    profile.findOne({ username: user }, (err, ds) => {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            res.send({ message: us, profile: ds });
                        }
                    })
                }
            }
        })
    })

    app.post("/api/followerandfollowing", authorization, (req, response) => {
        const token = req.body.decode.username;
        const username = req.body.username;
        console.log(username)
        profile.findOne({ username: username }).then((res) => {
            res.followers.push(token);
            res.save().then(() => {
                profile.findOne({ username: token }).then((res) => {
                    res.following.push(username);
                    res.save();
                    response.send({message : true});
                });
            }).catch((err) => {
                console.log(err);
            });
        })
    })
    
    app.post("/api/unfollowing", authorization, (req, response) => {
        const token = req.body.decode.username;
        const username = req.body.username;
    
        profile.findOne({ username: username }).then((res) => {
            res.followers.splice(res.followers.indexOf(token),1);
            res.save().then(() => {
                profile.findOne({ username: token }).then((res) => {
                    res.following.splice(res.following.indexOf(username),1);
                    res.save();
                    response.send({message : true});
                });
            }).catch((err) => {
                console.log(err);
            });
        })
    })
    
    app.post("/api/checkfollowers",authorization,(req, response) => {
        const token = req.body.decode.username;
        const username = req.body.username;
        profile.findOne({ username: token }).then((res) => {
            if(res.following.includes(username))
            {
                response.send({message : true});
            }
            else
            {
                response.send({message : false});
            }
        })
    })
    
    app.post("/api/getfollowinglist",authorization,(req,response)=>{
        const token = req.body.decode.username;
        profile.findOne({ username: token }).then((res) => {
            response.send({message : res.following});
        })
    })
    
    app.post("/api/getfollowerlist",authorization,(req,response)=>{
        const token = req.body.decode.username;
        profile.findOne({ username: token }).then((res) => {
            response.send({message : res.followers});
        })
    })
    
    app.post("/api//removefollowers",authorization,function(req,response) {
        const token = req.body.decode.username;
        const username = req.body.username;
        console.log(token)
        console.log(username)
        profile.findOne({ username: username }).then((res) => {
            res.following.splice(res.following.indexOf(token),1);
            res.save().then(() => {
                profile.findOne({ username: token }).then((res) => {
                    res.followers.splice(res.followers.indexOf(username),1);
                    res.save();
                    response.send({message : true});
                });
            }).catch((err) => {
                console.log(err);
            });
        })

    })
    app.post("/api/createsubgreddit",authorization, function (req, res) {
            const token = req.body.decode.username;
            // console.log(token)
            console.log(req.body)
            const newSubGreddit = new SubGreddit({
                username:token,
                name: req.body.val.name,
                // nopisg: req.body.val.nopisg,
                // noppisgun: req.body.val.noppisgun,
                description: req.body.val.description,
                banned_keywords: req.body.val.banned_keywords,
                tags: req.body.val.tags,
                // contact: req.body.contact,
                // About : req.body.About
            });
            newSubGreddit.save(function (err) {
                if (err) {
                    console.log(err);
                    res.send({ message: 0 });
                } else {
                        console.log("Saved SubGreddit");
                        res.send({ message: 1 });
                }
                // newUser.save().then(()=>{
                //     res.send({message:1});
                // }).catch((err)=>{
                //     console.log(err);
                //     res.send({message:0});
                // })
            });
    });
    
    app.post("/api/getsubgredditdata",authorization,(req,response)=>{
        SubGreddit.find({username : req.body.decode.username})
        .then((val)=>{
            response.send({message : val});
        }).catch((err)=>{
            console.log(err);
            response.send({message : []});
        })
    })

    app.post("/api/getallsubgredditdata",authorization,(req,response)=>{
        SubGreddit.find({})
        .then((val)=>{
            response.send({message : val});
        }).catch((err)=>{
            console.log(err);
            response.send({message : []});
        })
    })

    app.post("/api/pendingdata",authorization,(req,response)=>{
        const token = req.body.decode.username;
        const subgredditname = req.body.subgredditname;
        const newjoin = new Join({
            subgredditname : subgredditname,
            username : token
        })
    
        newjoin.save().then(()=>{
            response.send({message : 1});
        }).catch((err)=>{
            console.log(err);
        })
    })
    
    app.post("/api/othersubgredditdata",authorization,(req,res)=>{
        const name = req.body.name;
        SubGreddit.findOne({name : req.body.name})
        .then((val)=>{
            if(val === null)
            {
                res.send({
                    condition: -1,
                })
                return 
            }
            var exist = val.followers.includes(req.body.decode.username);
            res.send({message: val , condition : exist});
        }).catch((err)=>{
            console.log(err);
            res.send({message : []});
        })
    })
    
    app.post("/api/checkpending",authorization,(req,res)=>{
        const username = req.body.decode.username;
        const name = req.body.name;
        Join.find({subgredditname : name})
        .then((val)=>{
            var exist = val.filter((e)=>{
                return e.username === username
            });
            var retval = exist.length === 0 ? null : exist[0];
            res.send({message : retval});
        })
    })
    
    app.post("/api/getjoiningdata" ,authorization,(req,res)=>{
        Join.find({subgredditname : req.body.name})
        .then((val)=>{
            res.send(val);
        }).catch((err)=>{
            console.log(err);
        })
    })
    
    app.post("/api/acceptuser" , authorization , (req,response)=>{
        const data = req.body.data;
        const username = data.username;
        const subgredditname = data.subgredditname;
        SubGreddit.findOne({name : subgredditname})
        .then((res)=>{
            res.followers.push(username);
            res.save();
            Join.findOneAndDelete({subgredditname : subgredditname , username : username},(err,us)=>{
                if(err){
                    console.log("Error in Rejecting user");
                }
            });
            response.send({message : 1});
        }).catch((err)=>{
            console.log(err);
        })
    })
    
    app.post("/api/rejectuser",authorization,(req,res)=>{
        const data = req.body.data;
        const username = data.username;
        const subgredditname = data.subgredditname;
        SubGreddit.findOne({name : subgredditname})
        .then((val)=>{
            Join.findOneAndDelete({subgredditname : subgredditname , username : username},(err,us)=>{
                if(err){
                    console.log("Error in Rejecting user");
                }
                res.send({message:1})
            })
        }).catch((err)=>{
            console.log(err);
        })
    })
    
    app.post("/api/newpost",authorization,(req,res)=>{
        const data = req.body.post;
        const name = req.body.name;
        const username = req.body.username;
        SubGreddit.findOne({name : name})
        .then((val)=>{
            val.post.push(data);
            val.postuser.push(username);
            val.save();
            res.send({message : val});
        }).catch((err)=>{
            console.log(err);
        })
    })
    
    app.post("/api/newcomments",authorization,(req,res)=>{
        const subgredditname = req.body.subgredditname;
        const comment = req.body.comment;
        const post = req.body.post;
        const index = req.body.index;
        comments.findOne({
            subgredditname : subgredditname,
            post : post,
            index : index
        }).then((val)=>{
            val == null ? comments.create({
                subgredditname : subgredditname,
                post : post,
                index : index,
                comment : [comment]
            }) : val.comment.push(comment); val.save();
        }).catch((err)=>{
            console.log(err);
        })
        res.send({message : 1});
    })
    
    app.post("/api/search",authorization,(req,res)=>{
        const string = req.body.string;

        // console.log(string)
        // console.log("efrvdsc")
        // console.log(string.toUpperCase())
        SubGreddit.find({name : {
            $regex: string, 
            $options:"i",
        }}).then((val)=>{
            res.send({message : val});
        }).catch((err)=>{
            console.log(err);
        })
    })
    
    
    app.post("/api/allcomments", authorization ,(req,response)=>{
        const subgredditname = req.body.subgredditdata;
        // console.log(subgredditname)
        const index = req.body.index;
        comments.findOne({subgredditname : subgredditname , index : index})
        .then((res)=>{
            if(res == null)
            {
                response.send({message : []})
                // console.log(message)
                return 
            }
            response.send({message : res.comment});
        }).catch((err)=>{
            console.log(err);
        })
    })
    
    
    app.post("/api/report",authorization,(req,res)=>{
        const post = req.body.post;
        const subgredditname = req.body.subgredditname;
        const position = req.body.position;
        var postuser;
        // console.log(postuser);
        // console.log('position: ',position) 
        SubGreddit.findOne({name : subgredditname})
        .then((val)=>{
            //   console.log(val)
            postuser = val.postuser[position]
            const username = req.body.username;
            console.log(username)
            console.log(subgredditname)
            const reason = req.body.reason;
            const reportme = new report({
                post : post,
                postuser : postuser,
                username : username,
                ignore : 0,
                reason : reason,
                subgredditname : subgredditname,
                position : position
            })
            reportme.save().then(()=>{
                res.send("done");
            }).catch((err)=>{
                console.log(err);
            })
        })
    })
    
    app.post("/api/allreport",authorization,(req,res)=>{
        const subgredditname = req.body.subgredditname;
        report.find({subgredditname : subgredditname})
        .then((val)=>{
            res.send({message : val});
        }).catch((err)=>{
            console.log(err);
        })
    })
    
    app.post("/api/removepost" , authorization , (req,res)=>{
        const subgredditname = req.body.subgredditname;
        const reportindex = req.body.reportindex;
        const otherindex = req.body.otherindex;
        const post = req.body.post;
        SubGreddit.findOne({name : subgredditname})
        .then((val)=>{
            val.post[otherindex] = null;
            val.postuser[otherindex] = null;
            val.save();
            // console.log(val.post[otherindex])
            // val.save();
            comments.findOneAndDelete({subgredditname : subgredditname,index : otherindex},(err,us)=>
            {
                if(err)
                {
                    console.log(err)
                }
                else
                {
                    // us.delete();
                    report.findOneAndDelete({subgredditname : subgredditname , post : post} , (err,us)=>{
                        if(err)
                        {
                            console.log(err)
                        }
                        else{
                            // us.delete();
                        }
                    })
                }
            })
            res.send({message : 1})
        })
        .catch((err)=>{
            console.log(err)
        })
    })
    
    app.post("/api/removesubgreddit" , authorization , (req,res)=>{
        const subgredditname = req.body.subgredditname;

        // const post = req.body.post;
        SubGreddit.findOne({name : subgredditname})
        .then((val)=>{
            val.delete();
            res.send({message : 1})
        })
        .catch((err)=>{
            console.log(err)
        })
    })

    app.post("/api/ignore",authorization,(req,res)=>{
        const position = req.body.position;
        const post = req.body.post;
        const subgredditname = req.body.subgredditname;
        const reason = req.body.reason;
        report.findOne({subgredditname: subgredditname , position : position , post : post, reason : reason})
        .then((val)=>{
            console.log(val);
            res.send({message : val})
        }).catch((err)=>{
            console.log(err)
        })
    })
    
    app.post("/api/updateignore",authorization,(req,res)=>{
        const position = req.body.position;
        const post = req.body.post;
        const subgredditname = req.body.subgredditname;
        const reason = req.body.reason;
        report.findOne({subgredditname: subgredditname , position : position , post : post,reason:reason})
        .then((val)=>{
            val.ignore = 1 ,
            val.save();
            res.send({message : val})
        }).catch((err)=>{
            console.log(err)
        })
    })  
    app.listen(4000, () => {
        console.log('server activated');
    });
    
