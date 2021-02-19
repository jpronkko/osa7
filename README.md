# osa7
Uses dotenv, therefore backend requires mongo related variables to be defined in .env file (library-backend/.env), as well as a SECRET variable for jwt tokens, for example:

TEST_MONGODB_URI=mongodb://localhost/library 
DEV_MONGODB_URI=mongodb://localhost/library 
MONGODB_URI=mongodb+srv://[Insert specific Atlas URI to MongoDB here]retryWrites=true&w=majority SECRET=JokuSalaisuus
