/** @type {import('next').NextConfig} */
import { config } from 'dotenv'; // Load environment variables from .env file
config();

const nextConfig = {
    env: {
      DATABASE_URL: process.env.DATABASE_URL, // Expose the variable to the client side if needed
    },
    api: {
        bodyParser: {
          sizeLimit: '500kb',
        },
      },
};

export default nextConfig;
