const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUpoZmJCWHNRbE5LMklEUGtLSEVPZWZjWWlYZzdvb2VvbHlKYVczOVNuQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSVZLZ0pSVFI2Wnl5QXYrNnRQYnExRTRZd0ZVbzJYQ1FqVkdPVUFjREoybz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJQ0xkQURvS2Y4ZjR4dkRrekNLcXFpU2pRMWZnMitSUkUyVFhtK2NacTFBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhNWk4bW1EUTdQSmRjQU8vb2RScDgwdkZCeGZQZ0xpRXNJejRPNkdvZXpjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVHODdTRS9OLzZ1UmlJY1U2M0l0Z2t5TjU0cGlURis5YzRuUmhDb3JZbDQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ijhyc2lYcDlRQ3hvNTdwTEZsNWRuOVpiUHZySzhRMEFwV0NCNExLeTA3WEk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0RjOUJwS0JLT1BMYVhxR2orcjNrN3RseU1QdDZsNFRYTlhhKzlxYjhYUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMk9LQms0cHpKYkxuMFZaSFBETlFnTU9PRVh5S3JXSUJpcUVVblVVQlZqOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZ4aFdHN0dlVzhRNUR4UUlzQmpzU3dLdWZTZGczdnNEaEcvOFgrRVJLZThiT0Q2a3Z6bDRkcUVjUXgvSTNBeHc2cUtlK2c5Z2VXWWNHaDB2NkQ2L0N3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjIsImFkdlNlY3JldEtleSI6IkZDOEdjL0Vwa2hmQ1FrYkRIQzJNcCtud0FIUG9QcW5kNXFuVml2QVhqQU09IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMiwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMyLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjZwYnRtNWV1VEJHTnRNTFFvbmdhQUEiLCJwaG9uZUlkIjoiMjJiYjJhNjktMGJkMy00ZjU0LWIyMmQtMjEzOGQ2ZDFhNTA2IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFHRnZPOFVnOEp4bHFvV05JOTV2TWxjM3Vycz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJENkQ1aXI4Q0NEQ1c4dGpSdmtoNXh4TnJNdkk9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiTjRRWUJNS0oiLCJtZSI6eyJpZCI6IjQ4Njk5NTI1MjM0OjEyQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCdmqvwnZCS8J2auPCdmrDwnZqq8J2aq/CdmrTwnZq7IPCdmqnwnZqr8J2aqfCdkJjwnZqp8J2ar/CdkJgifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lDSDU2Y0hFTWJZcnIwR0dBOGdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InZVMlBsSWJnSGxhR01DZy9iemp0a3l3UlhNMS9YTzdBVS9ZRVFFN29Mbjg9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjNiMGlMc1NqaGRtRmlDVHRMbE5OdUJiT1d2QmNSVnQ0ZHR5T3F2bkkyVVNOZkV3eE1ZRjlYQVQzQ2xHTUlFTjhsUEVZT3E4ell4Umx4dXg1aTZ6ZEJ3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiIvWFM5UjgwRU9JMDJLajNEVzBidlNDSWx0Rkl0L2VVZk8zVjRhVW9kYUVmN0pWb0Z1ZlQ4YnZObFhQejVXR1NEdWpKRnNMbTkvcU1qYkRzZm9vNUxEZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjQ4Njk5NTI1MjM0OjEyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmIxTmo1U0c0QjVXaGpBb1AyODQ3Wk1zRVZ6TmYxenV3RlAyQkVCTzZDNS8ifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzkzMDQwMjB9',
    PREFIXE: process.env.PREFIX || "💔",
    GITHUB : process.env.GITHUB|| 'https://github.com/Fred1e/LUCKY_MD',
    OWNER_NAME : process.env.OWNER_NAME || "Fredi",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "48699525234",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "▶️",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/7irwqn.jpeg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || '🤧',              
    CHAT_BOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'viewed by alpha md',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'no',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    CAPTION : process.env.CAPTION || "✧⁠LUCKY_MD✧",
    BOT : process.env.BOT_NAME || '✧⁠LUCKY_MD✧⁠',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/calabar", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTI_DELETE_MESSAGE : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'no', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

