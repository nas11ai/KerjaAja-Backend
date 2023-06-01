const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server, { cors: { origin: " * ", }, });
const cors = require('cors');
const cookieParser = require("cookie-parser");
const path = require('path');

const {
  loginRouter,
  registerRouter,
  readExistingUserRouter,
  updateUserPhotoRouter,
  changeUserUsernameRouter,
  changeUserPasswordRouter,
  verifyUserPasswordRouter,
} = require("./user-features/controller");

const {
  createNewUserRecommendationRouter,
  readExistingUserRecommendationRouter,
  updateExistingUserRecommendationRouter,
  deleteExistingUserRecommendationRouter,
} = require('./user-recommendation-features/controller');

const {
  createNewProjectCategoryRouter,
  getExistingProjectCategoryRouter,
  updateExistingProjectCategoryRouter,
  deleteExistingProjectCategoryRouter,
} = require("./project-category-features/controller");

const {
  createNewProjectRouter,
  getExistingProjectRouter,
  updateExistingProjectRouter,
  deleteExistingProjectRouter,
} = require("./project-features/controller");

const {
  connecttoChatRouter,
  getUnreadMessagesRouter,
  readMessagesRouter,
  deleteMessagesRouter,
} = require("./chat-feature/controller");

const { PORT } = require("./utilities/config");
const { connectToDatabase } = require("./utilities/db");
const { errorHandler } = require('./middlewares');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.send("KerjaAja API is running 🥳");
})

app.use('/static', express.static(path.join(__dirname, 'assets')));

app.use('/users/login', loginRouter);
app.use('/users/register', registerRouter);
app.use('/users/read', readExistingUserRouter);
app.use('/users/change_username', changeUserUsernameRouter);
app.use('/users/change_password', changeUserPasswordRouter);
app.use('/users/verify_password', verifyUserPasswordRouter);
app.use('/users/profile_photo', updateUserPhotoRouter);

app.use('/user_recommendations/create', createNewUserRecommendationRouter);
app.use('/user_recommendations/read', readExistingUserRecommendationRouter);
app.use('/user_recommendations/update', updateExistingUserRecommendationRouter);
app.use('/user_recommendations/delete', deleteExistingUserRecommendationRouter);

app.use('/project_categories/create', createNewProjectCategoryRouter);
app.use('/project_categories/read', getExistingProjectCategoryRouter);
app.use('/project_categories/update', updateExistingProjectCategoryRouter);
app.use('/project_categories/delete', deleteExistingProjectCategoryRouter);

app.use('/projects/create', createNewProjectRouter);
app.use('/projects/read', getExistingProjectRouter);
app.use('/projects/update', updateExistingProjectRouter);
app.use('/projects/delete', deleteExistingProjectRouter);

app.use('/chat-feature/getUnreadMessage', getUnreadMessagesRouter);
app.use('/chat-feature/readMessages', readMessagesRouter);
app.use('/chat-feature/deleteMessages', deleteMessagesRouter);
app.use('/chat-feature', connecttoChatRouter(io));

async function main() {
  await connectToDatabase();
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main();

app.use(errorHandler);
