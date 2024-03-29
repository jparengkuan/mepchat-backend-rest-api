import recipeRoute from "./routes/recipe.route";

require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import config from 'config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './utils/connectDB';
import userRouter from './routes/user.route';
import authRouter from './routes/auth.route';
import teamRouter from './routes/team.route';
import userRoleRouter from './routes/userRole.route';
import mepListRoute from "./routes/mepList.route";
import mepTaskRoute from "./routes/mepTask.route";
import ingredientRoute from "./routes/ingredient.route";
import dishRoute from "./routes/dish.route";
import dishCategoryRoute from "./routes/dishCategory.route";
import recipeCategoryRoute from "./routes/recipeCategory.route";

const app = express();

// Middleware

// 1. Body Parser
app.use(express.json({ limit: '20mb' }));

// 2. Cookie Parser
app.use(cookieParser());

// 3. Logger
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// 4. Cors
app.use(
  cors({
    //origin: config.get<string>('origin'),
    credentials: true,
  })
);

// 5. Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/teams', teamRouter);

/** Recipe routes */
app.use('/api/recipes', recipeRoute);

/** RecipeCategory routes */
app.use('/api/recipeCategory', recipeCategoryRoute);

/** MepList routes */
app.use('/api/meplist', mepListRoute);

/** MepTask routes */
app.use('/api/meptask', mepTaskRoute);

/** Ingredient routes */
app.use('/api/ingredient', ingredientRoute);

/** Dish routes */
app.use('/api/dish', dishRoute);

/** DishCategory routes */
app.use('/api/dishCategory', dishCategoryRoute);

/** User roles routes */
app.use('/api/user/roles', userRoleRouter);

// Testing
app.get('/healthChecker', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to MEP-CHAT!',
  });
});

// UnKnown Routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

const port = config.get<number>('port');
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
  // ? call the connectDB function here
  connectDB();
});

