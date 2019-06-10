const db = require('./conn');

class User {
    constructor(id, first_name, last_name, email, password) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }

    async save() {
        try {
            const response = await db.one(`
                INSERT INTO userstb (first_name, last_name, email, password)
                VALUES ($1, $2, $3, $4)
                returning id`,
                [this.first_name, this.last_name, this.email, this.password]
            );
            console.log('Whatss up user id created', response.id);
            return response;
        } catch(err) {
            return err.message;
        }
    }

    async getUserByEmail() {
        try {
            const userData = await db.one(`
                SELECT id, first_name, last_name, password FROM userstb WHERE email = $1`, [this.email] 
            );
            return userData;
        } catch(err) {
            return err.message;
        }
    }
}

module.exports = User;