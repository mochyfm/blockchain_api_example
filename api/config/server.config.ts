export const SERVER_PORT = process.env.PORT || 3000;
export const DB_PORT = parseInt(process.env.DB_PORT || '3306', 10);
export const DB_HOST = process.env.DB_HOST || '127.0.0.1';
export const DB_USER = process.env.DB_USER || 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD || '1234';
export const DB_DATABASE = process.env.DB_DATABASE || 'bk_db';

export const CORS_OPTIONS = {
  origin: "http://localhost",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export const HELMET_OPTIONS = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "trusted-cdn.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
};
