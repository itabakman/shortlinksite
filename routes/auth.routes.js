const {Router} = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const {check,validationResult}= require('express-validator');
const bcrypt = require('bcryptjs')
const User = require('../models/User');
const config = require('config')
// /api/auth/register
router.post('/register',
[
    check('email','Email is wrong,ponyatno').isEmail(),
    check('password','Pass plokhoi').isLength({min:6})
],
async(req,res)=>{
try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
    return res.status(400).json({
        errors:errors.array(),
        message:'Oshibochka vishla v registracii'})        
    }

    const {email,password} =req.body
    
    const candidate = await User.findOne({email});

    if (candidate) {
        return res.status(400).json({message:'Takoy user est'});
    }

    const hashedPass =  await bcrypt.hash(password,12)
    const user = new User({email,password:hashedPass})

    await user.save()
    res.status(201).json({message:'User sozdan'})


} catch (e) {
    res.status(500).json({message:' Oshibochka vishla'})
}
});

// /api/auth/login
router.post('/login',
[
    check('email','Takogo myla net').normalizeEmail().isEmail(),
    check('password','Pass nepravilnii').exists()
],
async (req,res)=>{
    try {
    
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
        return res.status(400).json({
            errors:errors.array(),
            message:'Oshibochka vishla v registracii'})        
        }
       
        const {email,password} = req.body; 

        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).json({message:"Polzovatel ne naiden"})

        }

        const isMatch = await bcrypt.compare(password,user.password) //сравнение паролей

        if (!isMatch) {
        return res.status(400).json({message:"Parol neveren!"});
        }
        
        const token = jwt.sign(
            {userId:user.id},
            config.get('jwtSecret'),
            {expiresIn:'1h'}
            )
        res.json({token,userId:user.id})





    
    
    } catch (e) {
        res.status(500).json({message:' Chto takoe? Oshibochka vishla!'})
        }
    } 
);

module.exports = router;
