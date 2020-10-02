const express = require('express');
const router = express.Router();
const products = require('../modules/products');
const variants = require('../modules/variants');
const User = require("../modules/user")

const jwt = require("jsonwebtoken");
const verify = require("../verification");


//******************************************************************************************************** */
// Read the details of product including variants

router.get("/product/:id", verify, async (req, res) => {

    try {
        res.json({
            list: await products.find({ _id: req.params.id }).populate({ path: 'variants' })
        })
    } catch (error) { console.log(error); }


});

//
//SIGNUP************************************************************************************************** */
//
router.post("/signup", async (req, res) => {
    if (await User.findOne({ email: req.body.email, password: req.body.password })) {
        res.send("user already exist");
    }
    else {
        var uservalue = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,

        };
        console.log(uservalue);
        User.create(uservalue, (error, User) => {
            if (error) {
                console.error(error);
            } else {

                res.send("data stored");
            }
        });

    }

});


//************************************************************************************************ */
//LOGIN

router.post("/login", async (req, res) => {
    var ss = {
        email: req.body.email,
        password: req.body.password,
    };

    if (req.body.password && req.body.email) {
        User.authenticate(req.body.email, req.body.password, (error, user) => {
            const token = jwt.sign(ss, "Securitykey")

            console.log(token);
            res.header("Authorization").json({
                "token": token
            });
        });

    }
    else {
        var err = new Error("enter both ");
        err.status = 401
        next(err);
    }

});







//********************************************************************************************************* */
// To create new Database In mongodb

router.post("/product", (req, res) => {
    var values = {
        name: req.body.name,
        price: req.body.price,
        images: req.body.images,
        variants: req.body.variants

    };
    console.log(values);
    products.create(values, (error, products) => {
        if (error) {
            console.error(error);
        } else {

            res.send("data stored");
        }
    });
});


router.put("/product/:id",async(req,res)=>
{
    const id = req.params.id;
    const updates = req.body;
    const options = {new:true};
    const re = await products.findByIdAndUpdate(id , updates, options);
    res.send("done updating");
});   

router.delete("/product/:id",async(req,res)=>
{
    products.findByIdAndDelete(req.params.id,(req,res)=>
    {
        console.log("deleted as per request");
        
    })
    
});


//************************************************************************************************ */

router.post("/variants", (req, res) => {
    var values = {
        color: req.body.color,
        size: req.body.size,
        delivery: req.body.delivery


    };
    console.log(values);
    variants.create(values, (error, variants) => {
        if (error) {
            console.error(error);
        } else {
            console.log(variants._id)
            res.send("data stored");
        }
    });
});

router.put("/variants/:id",async(req,res)=>
{
    const id = req.params.id;
    const updates = req.body;
    const options = {new:true};
    const re = await variants.findByIdAndUpdate(id , updates, options);
    res.send("done updating");
});   

router.delete("/variants/:id",async(req,res)=>
{
    variants.findByIdAndDelete(req.params.id,(req,res)=>
    {
        console.log("deleted as per request");
        
    })
    
});

module.exports = router;