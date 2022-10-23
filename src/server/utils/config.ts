import dotenv from 'dotenv';
dotenv.config();

const config = {
  isDevelopment: process.env.NODE_ENV !== 'production',
  server: {
    port: process.env.PORT || 4200,
    db: {
      projectId: process.env.PROJECT_ID,
      clientEmail: process.env.CLIENT_EMAIL,
      privateKey: process.env.PRIVATE_KEY,
    },
  },
};

export default config;
