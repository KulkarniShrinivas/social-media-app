import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path, { format } from "path";
import { fileURLToPath } from "url";

//routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";   
import postRoutes from "./routes/posts.js";

import { error } from "console";

//controllers
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js"

import { verifyToken } from "./middleware/auth.js";

import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts} from "./data/index.js";


//---------------------------------------//
/********** CONFIGURATIONS ***************/
//---------------------------------------//

// Get the file system path of the current module's file
const __filename = fileURLToPath(import.meta.url);

// Get the directory name of the current module's file
export const __dirname = path.dirname(__filename);

// Load environment variables from a .env file
dotenv.config();

const app = express();

// Parse incoming JSON request bodies
app.use(express.json());

// Enable security headers using the Helmet middleware
app.use(helmet());

// Set cross-origin resource policy to "cross-origin" using the Helmet middleware
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(morgan("common"));

// Parse incoming JSON request bodies with a limit of 30MB and extended option set to true
app.use(bodyParser.json({ limit: "30mb", extended: true }));

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Serve static assets from the "public/assets" directory
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));


//---------------------------------------//
/*********** FILE STORAGE *************/
//---------------------------------------//

const storage = multer.memoryStorage();

const upload = multer({
  storage, // Set the "storage" configuration object defined earlier as the storage option for Multer
});

// This function uploads a picture file to GitHub repository
const githubPictureUpload = async (req, res, next) => {
  try {
    // Read the content of the uploaded file
    const fileContent = req.file.buffer;

    // Specify the details of the new file in your GitHub repository
    const repoOwner = "KulkarniShrinivas";
    const repoName = "social-media-app";
    const targetFolder = "server/public/assets";
    const fileName = req.file.originalname;

    // Create or update the file in your GitHub repository
    const response = await octokit.repos.createOrUpdateFileContents({
      owner: repoOwner,
      repo: repoName,
      path: `${targetFolder}/${fileName}`,
      message: "Add New Picture",
      content: fileContent.toString("base64"),
    });

    console.log("File saved to GitHub:", response.data.content.html_url);

    // Send a successful response
    next();
  } catch (err) {
    // Handle errors during file upload
    console.error("Error uploading file:", err);
    res
      .status(500)
      .json({ error: err.message, msg: "Error uploading file to GitHub" });
  }
};
//Routes with Files

app.post("/auth/register/", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);


//Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

//setting up mongoose

const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server port: ${PORT}`)); 


    /* Add Data One Time */
    // User.insertMany(users);
    // Post.insertMany(posts);
})

.catch((error) => console.log(`${error} did not connect`));
















































