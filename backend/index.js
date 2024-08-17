import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();

// middleware for parsing request body
app.use(express.json());

// middleware for handling cors policy
// allow all origin with default cors(*)
// app.use(cors());
// option 2: allow custom origins
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ['Content-Type'],
  })
);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("welcome");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("successfully connected to database");
    app.listen(PORT, () => {
      console.log(`server is running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
