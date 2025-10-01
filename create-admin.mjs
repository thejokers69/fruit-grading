// create-admin.mjs
import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcryptjs';

// Generate the correct hash for password123
const password = 'password123';
const hash = bcrypt.hashSync(password, 8);

console.log('Password:', password);
console.log('Generated hash:', hash);
console.log('Verification:', bcrypt.compareSync(password, hash));

// Test with the existing hash from database
const existingHash = '$2b$08$AIf6S2P3yewckpOHHfGdkOMJSKmV9bSZs2R.QLOeG0MDAXHGC3Tze';
console.log('Testing existing hash with password123:', bcrypt.compareSync(password, existingHash));
console.log('Testing existing hash with admin:', bcrypt.compareSync('admin', existingHash));