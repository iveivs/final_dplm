import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Поиск пользователя по email (username интерпретируется как email)
    const user = await User.findOne({ email: username });
    console.log("Найденный пользователь в базе данных:", user);

    if (!user) {
      console.log("Пользователь не найден");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Логируем введённый пароль и хэш
    console.log("Введённый пароль:", password);
    console.log("Хэш из базы данных:", user.password);

    // Сравниваем пароль
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Результат сравнения пароля:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Генерация токена
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({
      token,
      email: user.email,
      username: user.username,
    });
  } catch (error) {
    console.error("Ошибка авторизации:", error);
    res.status(500).json({ error: "Login failed" });
  }
};



export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'username email');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};
