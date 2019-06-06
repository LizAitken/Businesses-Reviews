const db = require('./connect.js');

class Restaurants {
    constructor(id, name, address, city, state, menu){
        this.id = id;
        this.name = name;
        this.address = address;
        this.city = city;
        this.address = address;
        this.state = state;
        this.menu = menu;
    }

    static async getAll() {
        try {
            const response = await db.any(`select * from businesstb`);
            return response;
        } catch(err) {
            return err.message;
        }
    }

    static async update(name, address, street, city, state, menu) {
        const query = `INSERT INTO restaurantstb (name, address, street, city, state, menu) VALUES ('${name}', '${address}', '${street}', '${city}', '${state}', '${menu}')`;

        try {
            let response = await db.result(query);
            return response;
        } catch(err) {
            console.log("ERROR", err.message);
            return err;
        };
    }

}


module.exports = Restaurants;