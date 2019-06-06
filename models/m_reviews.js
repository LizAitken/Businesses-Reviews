const db = require('./connect.js');

class Reviews {
    constructor(id, score, context, restaurant_id, user_id){
        this.id = id;
        this.score = score;
        this.context = context;
        this.restaurant_id = restaurant_id;
        this.user_id = user_id;
    }

    static async getAll() {
        try {
            const response = await db.any(`select * from reviewstb`);
            return response;
        } catch(err) {
            return err.message;
        }
    }

    static async update(score, context, restaurant_id, user_id) {
        const query = `INSERT INTO reviewstb (score, context, restaurant_id, user_id) VALUES ('${score}', '${context}', '${restaurant_id}', '${user_id}')`;

        try {
            let response = await db.result(query);
            return response;
        } catch(err) {
            console.log("ERROR", err.message);
            return err;
        };
    }

}


module.exports = Reviews;