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
    // Логируем тело запроса
    console.log("Полученные данные от клиента:", req.body);

    const { username, password } = req.body;

    // Проверяем, пришли ли username и password
    if (!username || !password) {
      console.error("Не предоставлены username или password");
      return res.status(400).json({ error: "Username and password are required" });
    }

    const user = await User.findOne({ username });

    // Логируем, найден ли пользователь в базе данных
    console.log("Найденный пользователь в базе данных:", user);

    if (!user) {
      console.error("Пользователь с указанным username не найден");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Проверяем пароль
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Логируем результат проверки пароля
    console.log("Результат проверки пароля:", isPasswordValid);

    if (!isPasswordValid) {
      console.error("Неверный пароль");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Генерируем токен
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Логируем успешную авторизацию
    console.log("Пользователь успешно авторизован. Генерация токена...");

    res.json({
      token,
      email: user.email,
      username: user.username,
    });
  } catch (error) {
    // Логируем ошибки
    console.error("Ошибка при авторизации:", error);
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
