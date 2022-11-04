var con = require("../config");

async function getWait() {
    const [rows, field] = await con.promise().execute('SELECT * FROM offers WHERE approval = 0')
    return rows
}

module.exports = { getWait }