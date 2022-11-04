var express = require('express');
var router = express.Router();
const service_fav = require('../services/service_Fav')
const middleware = require('../middleware/auth.middleware')

router.post('/', async function (req, res){
    
    const verify = middleware.verifyToken(req.headers.authorization)
    if (verify === "Invalid token"){
        return res.status(401).json("Unauthorized")
    }
    
    user_id = req.query.user_id;
    offer_id = req.query.offer_id;
    
    const result = await service_fav.Postfav(offer_id, user_id)
    return res.json({result});
})

router.delete('/', async function (req, res){
    
    const verify = middleware.verifyToken(req.headers.authorization)
    if (verify === "Invalid token"){
        return res.status(401).json("Unauthorized")
    }
    
    user_id = parseInt(req.query.user_id);
    offer_id = parseInt(req.query.offer_id);
    
    const result = await service_fav.deletefav(offer_id, user_id)
    return res.json({result});
    
})

  module.exports = router;
