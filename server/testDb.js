const db = require("./models/");

const testUser = async () => {
    try {
        const newUser = await db.User.create({
            name: "test1",
            email: "test1@gmail.com",
            password: "test1pass",
        });
    } catch (err) {
        console.log(`Error: ${err}`);
    }
};

testUser();
