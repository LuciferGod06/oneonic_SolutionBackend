const express = require('express');
const bcrypt =  require('bcrypt');
const cors = require('cors');

const {connection} = require('./config/db');
const {UserModel } = require("./model/User.model")
const {ProductRouter} = require('./routes/product.routes');
const { ProductModel } = require('./model/Product.model');

const app = express();

app.use(express.json());
app.use(cors());


app.get('/',(req,res)=>{
    res.send("Base API endpoint")
})



app.get('/t',async(req,res)=>{
    
    try {
        const product = await ProductModel.find();
        res.send({product:product});        
    } catch (error) {
            console.log(error)
    }

})

app.post('/signup',async(req,res)=>{
    let {name,email,password} = req.body;

    bcrypt.hash(password, 3, async function(err, hash) {
        const newUser = new UserModel({
            name,
            email,
            password : hash
        }) 
    try {
        await newUser.save();
        res.send({msg:'signup succesfull'})
    } catch (error) {
        console.log(error)
        res.status(500).send("Something went wrong");
    }   
    }); 
   
})

app.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    const user = await UserModel.findOne({email});
    const hashedPassword = user.password ;
    if(!user){
        res.send("Signup First");
    }
    else{
        bcrypt.compare(password, hashedPassword, function(err, result) {
            if(result){
                res.send({msg:'login successfull'})
            }
            else{
                res.send({msg:'Login Failed ,invalid Credentials'})
            }
        });
    }
})


app.use('/product',ProductRouter)
  


app.listen(8000,async()=>{
try{

    await connection
    console.log('connected to db succesfully')
}
catch(err){
    console.log('error will connecting to db')
console.log(err)
}

    console.log("Listining on 8000")
})