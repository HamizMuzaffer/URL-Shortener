const express = require("express");
const urlRoute = require("./routes/url")
const app = express();
const staticRoute = require("./routes/StaticRouter")
const path = require("path")
const PORT = 3001
const URL = require("./models/url")
const {connectToMongoDb} = require('./connect')



connectToMongoDb("mongodb://localhost:27017/url-shortener")
.then(()=> console.log("DB Connected"))

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/url",urlRoute)
app.use("/",staticRoute)
app.set("view engine", "ejs")
app.set("views",path.resolve("./views"))

app.get("/test",async (req,res)=>{
    const allUrls = await URL.find({})
    return res.render("home", {
        urls : allUrls,

    })
})
app.get("/:shortId",async (req,res)=>{
const shortId = req.params.shortId;
const entry = await URL.findOneAndUpdate({
shortId
},
{$push: {
    visitHistory : {
        timestamps : Date.now()
    }
}}
)
res.redirect(URL.urlRedirect)

})







app.listen(PORT,()=>{
    console.log('Server up and Running');
})
