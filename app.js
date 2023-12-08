const express = require('express');
const { PORT } = require("./config");
const { AuthRouter } = require('./Auth/authRouter');
const { PostRouter } = require('./Post/postRouter');
const { CommentRouter } = require('./Comment/commentRouter');


const app = express();

app.use(express.json());


// Routes
app.use('/api/auth', AuthRouter);
app.use('/api/posts', PostRouter);
app.use('/api/comments', CommentRouter)










//server
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}...`);
  });
