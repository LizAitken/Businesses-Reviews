const db = require('./conn'),
    bcrypt = require('bcryptjs');

class User {
    constructor(id, first_name, last_name, email, password) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }

    async checkPassword(hashedPassword) {
        return bcrypt.compareSync(this.password, hashedPassword);
    };

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

    async login() {
        try {
            const response = await db.one(`
                SELECT id, first_name, last_name, password FROM userstb WHERE email = $1`, [this.email] 
            );
            const isValid = await this.checkPassword(response.password);
            console.log("hash is", response.password);
            console.log("Is valid?", isValid);
            //The !! means it is absolutely 'true' as opposed to leaving it out, which would respond to everything truthy
            if (!!isValid) {
                const { first_name, last_name, id } = response;
                
                return { isValid, first_name, last_name, user_id:id }

            } else {
                //just return false isValid
                return { isValid }
            };
        } catch(err) {
            return err.message;
        }
    }
}

module.exports = User;