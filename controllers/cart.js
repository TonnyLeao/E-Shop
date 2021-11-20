const Cart = require('../models/cart');
const Product = require('../models/product');
const mongoose = require('mongoose');

exports.addItemToCart = async(req, res) => {

    const findUser = await Cart.findOne({user: req.user._id})
    let userCartItem;
    if(findUser) {
         userCartItem = await findUser.cartItems
    }
    //const userCartItem = await findUser.cartItems
    const cartItems = await req.body.cartItems

    if(!findUser) {
        console.log("~~~~~~~~~~USER IS NULL, PLEASE CREATE CART~~~~~~~~~~~~~~~~~~~~")
        const cart = new Cart({
            user: req.user._id,
            cartItems: [req.body.cartItems]
        })

        cart.save();
    }

    else if(findUser) {
        console.log("@@@@@@@@@@@@@@@@ USER IS FOUND @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        const waistSize = cartItems.waistSize;
        const lengthSize = cartItems.lengthSize;
        const product = cartItems.product;
        const gender = req.body.cartItems.gender;
        const category = req.body.cartItems.category;


        const itemFound = userCartItem.find(c => c.product == product && c.waistSize === waistSize && c.lengthSize === lengthSize || c.product === product && c.lengthSize === lengthSize && c.gender === "female" && c.category !== "Jeans");
        
        if(itemFound) {
            console.log(itemFound, "!!!!!!!!!!!!!!!!!!!!!this is the FOUND ITEM!!!!!!!!!!!!!!!!!!")
            Cart.findOne({"user": req.user._id}, function(err, docs) {
                if(err){
                    console.log(err);
                }
                if(docs){
                    console.log(docs, "~~~~~~~~~~~~~~~~~~~~THIS IS THE DOCS~~~~~~~~~~~~~~~~~~~~~~~~~")

                        const productIndex = findUser.cartItems.findIndex(x => x.product == product && x.waistSize == waistSize && x.lengthSize == lengthSize || x.product == product &&  x.lengthSize == lengthSize && x.gender == "female" && x.category !== "Jeans");
                        
                        if(productIndex !== -1) {
                            docs.cartItems[productIndex].quantity = docs.cartItems[productIndex].quantity + cartItems.quantity;
                            docs.cartItems[productIndex].totalPrice = docs.cartItems[productIndex].totalPrice + cartItems.price
                        } 
                    docs.save();
                }
            })
        } else {
            console.log(itemFound, "~~~~~~~~~~~~~~~~~~~~~~~DID NOT FIND THE ITEM ~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
            Cart.findOne({"user" : req.user._id}, function(err, docs){
                if(err){
                    console.log(err);
                }
                if(docs){
                    docs.cartItems.push(cartItems);
                    console.log(docs, "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~DID NOT FIND THE ITEM, DOCS~~~~~~~~~~~~~~~~~~~~~~~~")
                }
                docs.save();
            } )
            
        }
    
    }

    console.log(findUser, "this is the user!")
    console.log(userCartItem, "this is the user cartItems!")
    console.log(cartItems, "this is the cartItems!")

    // Cart.findOne({ user: req.user._id })
    //     .exec((error, cart) => {
    //         if (error) return res.status(400).json({ error });
    //         if (cart) {

    //             const waistSize = req.body.cartItems.waistSize;
    //             const lengthSize = req.body.cartItems.lengthSize;
    //             const product = req.body.cartItems.product;
    //             const reqCartItems = req.body.cartItems;
    //             const gender = req.body.cartItems.gender;
    //             const category = req.body.cartItems.category;
    //             const itemFound = cart.cartItems.find(c => c.product == product && c.waistSize === waistSize && c.lengthSize === lengthSize || c.product === product && c.lengthSize === lengthSize && c.gender === gender && c.category !== "Jeans");


    //             console.log(product, "this is from req.body.cartItems.product")
    //             console.log(waistSize, "this is from req.body.waistSize.product")
    //             console.log(lengthSize, "this is from req.body.lengthSize.product")
    //             console.log(itemFound, "IS THE ITEM FOUND OR NOT????$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$~~~~~~~~")
    //             console.log(reqCartItems, "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~REQ.BODY.CARTITEMS~~~~~~~~~~~~~~~~~~~~~~~")

    //             if (itemFound) {
    //                 console.log(itemFound, "this is the itemFound!")

    //                 if(gender === "Female" && category !== "Jeans") {
    //                     console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~THIS IS FEMALE AND NOT JEANS~~~~~~~~~~~~~~~~~~~~~~~~~")
    //                     Cart.findOneAndUpdate({ "user": req.user._id, "cartItems.product": product, "cartItems.lengthSize": lengthSize}, {
    //                         "$set": {
    //                             "cartItems.$": {
    //                                 ...req.body.cartItems,
    //                                 quantity: itemFound.quantity + 1,
    //                                 lengthSize: lengthSize,
    //                                 waistSize: waistSize,
    //                                 totalPrice: Number(itemFound.totalPrice) + Number(req.body.cartItems.price)
    //                             }
    //                         }
    //                     })
    //                         .exec((error, _cart) => {
    //                             if (error) return res.status(400).json({ error });
    //                             if (_cart) {
    //                                 return res.status(201).json({ cart: _cart });
    //                             }
    //                         })
    //                 } else {
    //                     console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~THIS IS MALE/FEMALE AND FEMALE JEANS~~~~~~~~~~~~~~~~~~~~~~~~~")
    //                     Cart.findOneAndUpdate({ "user": req.user._id, "cartItems.product": product, "cartItems.waistSize": waistSize, "cartItems.lengthSize": lengthSize}, {
    //                         "$set": {
    //                             "cartItems.$": {
    //                                 ...req.body.cartItems,
    //                                 quantity: itemFound.quantity + 1,
    //                                 totalPrice: Number(itemFound.totalPrice) + Number(req.body.cartItems.price)
    //                             }
    //                         }
    //                     })
    //                         .exec((error, _cart) => {
    //                             if (error) return res.status(400).json({ error });
    //                             if (_cart) {
    //                                 return res.status(201).json({ cart: _cart });
    //                             }
    //                         })
    //                 }

    //             } else {
    //                 console.log("the else is happening now!")
    //                 Cart.findOneAndUpdate({ "user": req.user._id }, {
    //                     "$push": {
    //                         "cartItems": req.body.cartItems
    //                     }
    //                 })
    //                     .exec((error, _cart) => {
    //                         if (error) return res.status(400).json({ error });
    //                         if (_cart) {
    //                             return res.status(201).json({ cart: _cart });
    //                         }
    //                     })
    //             }

    //         } else {
    //             const cart = new Cart({
    //                 user: req.user._id,
    //                 cartItems: [req.body.cartItems]
    //             })

    //             cart.save((error, cart) => {
    //                 if (error) return res.status(400).json({ error });
    //                 if (cart) {
    //                     return res.status(201).json({ cart });
    //                 }
    //             })
    //         }
    //     })
}

exports.removeItemToCart = async(req, res) => {

    const findUser = await Cart.findOne({user: req.user._id})

    const cartItems = await req.body.cartItems
    const waistSize = cartItems.waistSize;
    const lengthSize = cartItems.lengthSize;
    const product = cartItems.product;
    const gender = cartItems.gender;
    const category = cartItems.category;

    
    Cart.findOne({"user": req.user._id}, function(err, docs){
        if(err){
            console.log(err);
        }
        if(docs){
            console.log(docs, "~~~~~~~~~~~~~~~~~~~~~~~~WE FOUND THE USER AND THIS IS THE DOCS~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
            const productIndex = findUser.cartItems.findIndex(x => x.product == product && x.waistSize == waistSize && x.lengthSize == lengthSize);
            
            if(docs.cartItems[productIndex].quantity == 1) {
                docs.cartItems.splice(productIndex, 1);
            } else {
                docs.cartItems[productIndex].quantity = docs.cartItems[productIndex].quantity - cartItems.quantity;
                docs.cartItems[productIndex].totalPrice = docs.cartItems[productIndex].totalPrice - cartItems.price
            }
            docs.save();
        }
    })
        
    

    console.log(findUser, "~~~~~~~~~~~~~~~~~~~~~~~~~~findUser~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    console.log(cartItems, "~~~~~~~~~~~~~~~~~~~~~~~~~~cartItems~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

    // Cart.findOne({ user: req.user._id })
    //     .exec((error, cart) => {
    //         if (error) return res.status(400).json({ error });
    //         if (cart) {

    //             const waistSize = req.body.cartItems.waistSize;
    //             const lengthSize = req.body.cartItems.lengthSize;
    //             const product = req.body.cartItems.product;
    //             const itemFound = cart.cartItems.find(c => c.product == product && c.waistSize === waistSize && c.lengthSize === lengthSize);
    //             console.log(itemFound, "this is the ITEM TO BE DELETED @@@")
    //             if (itemFound.quantity && itemFound.quantity > 1) {
    //                 console.log(itemFound, "this is the itemFound!")
    //                 Cart.findOneAndUpdate({ "user": req.user._id, "cartItems.product": product, "cartItems.waistSize": waistSize, "cartItems.lengthSize": lengthSize }, {
    //                     "$set": {
    //                         "cartItems.$": {
    //                             ...req.body.cartItems,
    //                             quantity: itemFound.quantity - 1,
    //                             image: itemFound.image,
    //                             totalPrice: itemFound.totalPrice - req.body.cartItems.price
    //                         }
    //                     }
    //                 })
    //                     .exec((error, _cart) => {
    //                         if (error) return res.status(400).json({ error });
    //                         if (_cart) {
    //                             return res.status(201).json({ cart: _cart });
    //                         }
    //                     })


    //             } else {
    //                 console.log("the else is happening now!")
    //                 Cart.findOneAndUpdate({ "user": req.user._id }, {
    //                     "$pull": {
    //                         "cartItems": req.body.cartItems
    //                     }
    //                 })
    //                     .exec((error, _cart) => {
    //                         if (error) return res.status(400).json({ error });
    //                         if (_cart) {
    //                             return res.status(201).json({ cart: _cart });
    //                         }
    //                     })
    //             }

    //         }
    //         // else {
    //         //     const cart = new Cart({
    //         //         user: req.user._id,
    //         //         cartItems: [req.body.cartItems]
    //         //     })

    //         //     cart.save((error, cart) => {
    //         //         if (error) return res.status(400).json({ error });
    //         //         if (cart) {
    //         //             return res.status(201).json({ cart });
    //         //         }
    //         //     })
    //         // }
    //     })
}

exports.getCartOrder = async (req, res, next) => {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
        return res.status(404).json({
            success: false,
            message: 'Cart not found'
        })
    }

    res.status(200).json({
        success: true,
        cart
    })
}

exports.emptyItemToCart = async(req, res) => {

    const findUser = await Cart.findOne({user: req.user._id})

    if(findUser) {
        findUser.cartItems = [];
        findUser.save();
    }

    if(!findUser) {
        return res.status(404).json({
            success: false,
            message: 'User not found, can not empty cart'
        })
    }

    res.status(200).json({
        success: true,
        findUser
    })   
}

exports.addGuestCart = async(req, res) => {
    const findUser = await Cart.findOne({user: req.user._id})
    
    const cartItems = await req.body.cartItems

    //Trying to store product ID/ W/L that are not found
    const productNotFound = [];

    if(findUser === null) {

        const cartOrder = [];

        for (let i = 0; i < cartItems.length; i++) {
            const firstItem = mongoose.Types.ObjectId(cartItems[i].id);
            const productItem = await Product.findById(firstItem);
            const firstItemQty = cartItems[i].quantity
            const waistSize = cartItems[i].waistSize;
            const lengthSize = cartItems[i].lengthSize;
            const price = productItem.price
            const firstItemName = productItem.name;
            const firstItemImg = productItem.images[0].url;
            const gender = productItem.gender
            const category = productItem.category


            const orderItems = {
                product: firstItem,
                price: price,
                quantity: firstItemQty,
                name: firstItemName,
                image: firstItemImg,
                waistSize: waistSize,
                lengthSize: lengthSize,
                totalPrice: Number((firstItemQty * price)),
                gender: gender,
                category: category
            }
            cartOrder.push(orderItems);
        }

        
            const consoleStuff = await console.log("THE FINDUSER IS NILL, SOMETHING WILL HAPPEN NOW!!!!!!!!!!!!!!!!!!!")
            consoleStuff;
        

        

        const cart = new Cart({
            user: req.user._id,
            cartItems: cartOrder
        })

        cart.save()

        // cart.save((error, cart) => {
        //     if (error) return res.status(400).json({ error });
        //     if (cart) {
        //         return res.status(201).json({ cart });
        //     }
        // })

        // console.log(cartItems, "this is the req.body.cartItems!");
        // console.log(cartItems[0], "the first one")
        // const firstItem = mongoose.Types.ObjectId(cartItems[0].id);
        // const firstItemQty = cartItems[0].quantity
        // const waistSize = cartItems[0].waistSize;
        // const lengthSize = cartItems[0].lengthSize;
        // const price = cartItems[0].price;
        // const firstItemName = cartItems[0].name;
        // const firstItemImg = cartItems[0].image;

        // const productItem = await Product.findById(firstItem);

        // const cart = new Cart({
        //     user: req.user._id,
        //     cartItems: {
        //         product: firstItem,
        //         price: price,
        //         quantity: firstItemQty,
        //         name: firstItemName,
        //         image: firstItemImg,
        //         waistSize: waistSize,
        //         lengthSize: lengthSize,
        //         totalPrice: Number((firstItemQty * price))
        //     }
        // })

        // cart.save((error, cart) => {
        //     if (error) return res.status(400).json({ error });
        //     if (cart) {
        //         return res.status(201).json({ cart });
        //     }
        // })


        // console.log(productItem, "this is the product Item from the backend!")


        // const productItem = await Product.findById(cartItems[0]);


    } else if (findUser.cartItems.length === 0){

        const cartOrder = [];

        for (let i = 0; i < cartItems.length; i++) {
            const firstItem = mongoose.Types.ObjectId(cartItems[i].id);
            const productItem = await Product.findById(firstItem);
            const firstItemQty = cartItems[i].quantity
            const waistSize = cartItems[i].waistSize;
            const lengthSize = cartItems[i].lengthSize;
            const price = productItem.price
            const firstItemName = productItem.name;
            const firstItemImg = productItem.images[0].url;
            const gender = productItem.gender
            const category = productItem.category

            const orderItems = {
                product: firstItem,
                price: price,
                quantity: firstItemQty,
                name: firstItemName,
                image: firstItemImg,
                waistSize: waistSize,
                lengthSize: lengthSize,
                totalPrice: Number((firstItemQty * price)),
                gender: gender, 
                category: category
            }
            cartOrder.push(orderItems);
        }


        // Cart.findOne({"user": req.user._id}, function(err, docs){
        //     if(err) {
        //         console.log(err)
        //     }
        //     if(docs) {
        //         console.log(docs, "THIS IS THE DOCS ###############");
        //     }
        // })
        Cart.findOneAndUpdate({user: req.user._id}, {
            "$push": {
                "cartItems": cartOrder
            }
        })
        .exec((error, _cart) => {
            if (error) return res.status(400).json({ error });
            if (_cart) {
                return res.status(201).json({ cart: _cart });
            }
        })
    } else if (findUser.cartItems.length > 0) {

        for (let i = 0; i < cartItems.length; i++) {
            const firstItem = mongoose.Types.ObjectId(cartItems[i].id);
            const productItem = await Product.findById(firstItem);
            const firstItemQty = cartItems[i].quantity
            const waistSize = cartItems[i].waistSize;
            const lengthSize = cartItems[i].lengthSize;
            const price = productItem.price
            const firstItemName = productItem.name;
            const firstItemImg = productItem.images[0].url;
            const gender = productItem.gender;
            const category = productItem.category
    
    
            Cart.findOne({"user": req.user._id}, function(err, docs) {
                if(err) {
                    console.log(err);
                } 
                if(docs){
                    const productExist = docs.cartItems.findIndex(x => x.product == cartItems[i].id && x.waistSize == cartItems[i].waistSize && x.lengthSize == cartItems[i].lengthSize)
                    console.log(cartItems[i])
                    
                    if(productExist !== -1) {
                        console.log(productExist, "what is the index of this?!?!")
                        docs.cartItems[productExist].quantity = docs.cartItems[productExist].quantity + firstItemQty
                        docs.cartItems[productExist].totalPrice =  docs.cartItems[productExist].totalPrice + (firstItemQty * price)
                        
                        
                    } else {
                        console.log(cartItems[i], "DOES NOT EXIST@@@@@@@@@@@")
                        
                        const orderItem = {
                            product: firstItem,
                            price: price,
                            quantity: firstItemQty,
                            name: firstItemName,
                            image: firstItemImg,
                            waistSize: waistSize,
                            lengthSize: lengthSize,
                            totalPrice: Number((firstItemQty * price)),
                            gender: gender, 
                            category: category
                        }
    
                        // docs.cartItems.push(orderItem);
                        docs.cartItems[docs.cartItems.length] = orderItem
                    }
                    
                    docs.save();
                }
            })
        }
    }
}

// exports.addGuestCartWithItem = async(req, res) => {

//     const findUser = await Cart.findOne({user: req.user._id})
//     const localCartItems = await req.body.cartItems

//     for (let i = 0; i < localCartItems.length; i++) {
//         const firstItem = mongoose.Types.ObjectId(localCartItems[i].id);
//         const productItem = await Product.findById(firstItem);
//         const firstItemQty = localCartItems[i].quantity
//         const waistSize = localCartItems[i].waistSize;
//         const lengthSize = localCartItems[i].lengthSize;
//         const price = productItem.price
//         const firstItemName = productItem.name;
//         const firstItemImg = productItem.images[0].url;


//         Cart.findOne({"user": req.user._id}, function(err, docs) {
//             if(err) {
//                 console.log(err);
//             } 
//             if(docs){
//                 const productExist = docs.cartItems.findIndex(x => x.product == localCartItems[i].id && x.waistSize == localCartItems[i].waistSize && x.lengthSize == localCartItems[i].lengthSize)
//                 console.log(localCartItems[i])
                
//                 if(productExist !== -1) {
//                     console.log(productExist, "what is the index of this?!?!")
//                     docs.cartItems[productExist].quantity = docs.cartItems[productExist].quantity + firstItemQty
//                     docs.cartItems[productExist].totalPrice =  docs.cartItems[productExist].totalPrice + (firstItemQty * price)
                    
                    
//                 } else {
//                     console.log(localCartItems[i], "DOES NOT EXIST@@@@@@@@@@@")
                    
//                     const orderItem = {
//                         product: firstItem,
//                         price: price,
//                         quantity: firstItemQty,
//                         name: firstItemName,
//                         image: firstItemImg,
//                         waistSize: waistSize,
//                         lengthSize: lengthSize,
//                         totalPrice: Number((firstItemQty * price))
//                     }

//                     docs.cartItems.push(orderItem);
//                 }
                
//                 docs.save();
//             }
//         })
//     }
// }