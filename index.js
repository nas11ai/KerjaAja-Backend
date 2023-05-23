const express = require('express');
const app = express();
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
} = require("./project-category-features/controller");

const { PORT } = require("./utilities/config");
const { connectToDatabase } = require("./utilities/db");
const { errorHandler } = require('./middlewares');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

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

const main = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
}

main();

app.use(errorHandler);
