import Router from 'express';
import { sample_users } from '../data';
import jwt from "jsonwebtoken";
import { User, UserModel } from '../models/user.model';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';

const router  = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        const userCounts = await UserModel.countDocuments();
        if(userCounts>0){
            res.send("Seed is already done!");
            return;
        }
        await UserModel.create(sample_users);
        res.send("Seed is done!");
    }
))

/*Database*/

router.post("/login", asyncHandler(
    async (req, res)=>{
        const {email, password} = req.body;
        const user = await UserModel.findOne({email});

        if(user && (await bcrypt.compare(password , user.password))){
            console.log("ici juste appres add dans edit");
            res.send(generateTokenResponse(user));
            console.log("ici")
        }else{
            res.status(401).send("User not found");
        }
    }
))


router.post("/register", asyncHandler(
    async (req, res)=>{
        const {name , email ,password} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            res.status(400).send("User already exists, please login!!");
            return;
        }
        
        const encyptedPassword = await bcrypt.hash(password, 10);
        
        const newUser: User = {
            id:'',
            name,
            email: email.toLowerCase(),
            password: encyptedPassword,
            isAdmin: false
        }

        const dbUser = await UserModel.create(newUser);

        res.send(generateTokenResponse(dbUser));

    }
))

const generateTokenResponse = (user:User) =>{
    const token = jwt.sign({
        email:user.email , isAdmin:user.isAdmin
    }
        ,"SomeRandomText"
        ,{expiresIn:"30d"}
    );
    
    return {
        id : user.id,
        email : user.email,
        name: user.name,
        isAdmin: user.isAdmin,
        token: token
    };
}


export default router;




/*
router.post("/login", (req, res)=>{
    const body = req.body;
    const user = sample_users.find(user => user.email === body.email && user.password === body.password);
    
    if(user){
        res.send(generateTokenResponse(user));
    }else{
        res.status(401).send("User not found");
    }
})
*/





