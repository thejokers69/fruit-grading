// src/createAdmin.js
import sequelize from './db.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

(async () => {
    try {
        await sequelize.sync();
        const adminUser = await User.create({
            username: 'admin',
            password: bcrypt.hashSync('admin', 8),
            role: 'admin'
        });
        console.log('Admin user created:', adminUser);
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
})();