import express from "express";

const app = express();
const users = [{ username: "neta" }];

// app.use((req,res,next)=>{
//     console.log(req.method);
//     console.log(req.url);
//     next()
// })

app.use(express.json())

app.get("/", (req, res) => {
    res.send("welcome to home");
});

app.get("/users", (req, res) => {
    console.log(req.query);
    const { username } = req.query;
    console.log(username);
    res.json(users);
});

app.get("/about", (req, res) => {
    res.send("about us");
});

app.get("/greet", (req, res) => {
    res.json("msg :hi from get endpoint:" + new Date().toLocaleString())
})

app.get("/greet/:name",(req,res)=>{
    res.json({msg:"i got name "  + req.params.name})
})
  
app.get("/test",async (req,res)=>{
    const name = "bob";
    const response = await fetch(`http://localhost:3005/greet/${name}`)
    const data = await response.json()
    if (data.msg && data.msg.includes(name)){
        res.json({result:"ok"})
        return
    }
    else{
        res.json({result:"fail"})
        return
    }
})

app.post("/action",async (req,res)=>{
    if(req.body.action === "joke"){
        const response = await fetch("https://official-joke-api.appspot.com/random_joke")
        const data = await response.json()
        res.json("joke " + data.setup + data.punchline)
        return
    }
    else if (req.body.action === "cat fact"){
        const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=11",{headers: {"x-api-key": "live_vI1f6otjvTBOdHphePs4MYcnXHssciFvPdEITPOsKpRSM8HAbwcGwKHt2ly267k6"}})
        const data = await response.json()
        res.json({"length":data.length})
        return
    }
    else{
        return res.status(400).json({ msg: "body is malformed" })
    }
})


app.listen(3005, () => {
    console.log("express server running on http://localhost:3005");
});