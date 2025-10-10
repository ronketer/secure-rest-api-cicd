const { StatusCodes } = require('http-status-codes');
const Todo = require('../models/Todo');
const { NotFoundError, BadRequestError, ForbiddenError } = require('../errors/index');

const createTodo = async (req, res) => {
  // once in this route user is authenticated 
  // todo: add trycatch block : datalevel validation and request level validaiton 
  req.body.createdBy = req.user.userId;
  const todo = await Todo.create({ ...req.body });

  res.status(StatusCodes.CREATED).json({
    id: todo.id,
    title: todo.title,
    description: todo.description,
  });
};

const updateTodo = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.userId;
  const todoId = req.params.id;

  if (!title && !description) {
    throw new BadRequestError('At least one of Title or Description must be provided for update');
  }

  const todo = await Todo.findOneAndUpdate(
    { id: todoId, createdBy: userId },
    { title, description },
    { new: true }
  );

  if (!todo) {
    throw new NotFoundError(`No Todo with id ${todoId}`);
  }
  // user can only edit their own todo
  if(!todo.createdBy.equals(userId)) {
    throw new ForbiddenError('Forbidden');
  }

  res.status(StatusCodes.OK).json({
    id : todo.id,
    title: todo.title,
    description: todo.description,
  });
};

const deleteTodo = async (req, res) => {
  const todoId = req.params.id;
  const userId = req.user.userId;
  const todo = await Todo.findOneAndDelete(
    { id: todoId, createdBy: userId }
  );
  if(!todo) {
    throw new NotFoundError(`no Todo with id ${todoId}`);
  }

  res.status(StatusCodes.NO_CONTENT).json({msg: 'Todo deleted successfully'});
};

const getAllTodo = async (req, res) => {
  const userId = req.user.userId;
  
  let page = parseInt(req.query.p) || 1; // let because we need to validate value 
  
  const limit = 10; 

  if (page < 1) {
    page = 1;

  }

  const totalTodos = await Todo.countDocuments({ createdBy: userId });
  const pageCount = Math.ceil(totalTodos / limit) || 1;

  if (page > pageCount) {
    page = pageCount;

  }

  const skip = (page - 1) * limit;

  const todos = await Todo.find({ createdBy: userId })
  // sort first, than skip , than limit results to the value of limit.
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.status(StatusCodes.OK).json({
    data: todos.map((todo) => ({
      id: todo.id,
      title: todo.title,
      description: todo.description,
    })),
    page,
    pageCount,
    totalTodos,
  });
};

const getTodo = async (req, res) => {
  const todoId = req.params.id;
  const userId = req.user.userId;

  const todo = await Todo.findOne({ id: todoId, createdBy: userId });

  if (!todo) {
    throw new NotFoundError(`No Todo with id ${todoId}`);
  }
  res.status(StatusCodes.OK).json({ todo });
};

module.exports = {
  createTodo,
  updateTodo,
  deleteTodo,
  getAllTodo,
  getTodo,
};


