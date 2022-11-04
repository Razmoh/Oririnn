const queryString = require('query-string');
var con = require("../config");

async function getSearch(params) {

    // INIT QUERY & OPTIONS
    let offer_query = "SELECT * from offers WHERE price BETWEEN ? AND ? AND approval = 1 "
    let option_query = "SELECT * from options WHERE NOT id = 0 "
    let offer_options = []
    let option_options = []
    let user_id = 0

    //SET OFFER/OPTION QUERY & PARAMS
    if (!params.min ||!params.max ) 
    { return "Invalid request" }
    offer_options.push(params.min)
    offer_options.push(params.max)
    delete params.min
    delete params.max

    if (params.city) {
        offer_query += " AND city=?"
        offer_options.push(params.city)
        delete params.city
    }

    if (params.user_id) {
        user_id = params.user_id
        delete params.user_id
    }
    
    for (var key in params) {
        if (key === "chambres" || key === "lits") {
            option_query += ` AND ${key}>=? `
            option_options.push(params[key])
        }
        else {
            option_query += ` AND ${key}=? `
            if(params[key] === 'true') 
            option_options.push(1)
            else if (params[key] === 'false') 
            option_options.push(0)
            else
            option_options.push(params[key])
        }
    }
    
    //RUN OPTIONS QUERY
    const [option_rows, option_field] = await con.promise().execute(option_query, option_options)
    
    //RUN OFFER QUERY
    if (option_rows[0]) {
        
        // Add filter on Offers by found Options[offer_id]
        offer_query += " AND id IN ("
        option_rows.forEach(element => {
            offer_query += `${element["offer_id"]},`
        });
        offer_query = offer_query.slice(0, -1) + ")"
        
        const [offer_rows, offer_field] = await con.promise().execute(offer_query, offer_options)
        
        if (offer_rows[0]) {

            const [fav_rows, option_field] = await con.promise().execute("SELECT * FROM favorites WHERE user_id = ?", [user_id])

            // Check Favorites
            for (key in offer_rows) {
                const findFav = fav_rows.find(element => element.offer_id === offer_rows[key].id)
                if (findFav !== undefined) {
                    offer_rows[key].favorite = true
                }else {
                    offer_rows[key].favorite = false
                }
            }
            return offer_rows
        }
        else { return "No result" }
    }
    else { return "No result" }
}

module.exports = { getSearch }