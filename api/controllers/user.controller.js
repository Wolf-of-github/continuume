import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const test = (req, res) => {
  res.json({
    message: 'Api route is working!',
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only update your own account!'));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only delete your own account!'));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json('User has been deleted!');
  } catch (error) {
    next(error);
  }
};

// Function to create initial admin user
// export const createInitialAdmin = async (req, res) => {
//   try {
    
//     const existingAdmin = await User.findOne({ role: 'admin' });
//     if (existingAdmin) {
//       return res.status(400).json({ message: 'Admin user already exists' });
//     }
//     const adminUser = new User({
//       username: 'admin',
//       email: 'ishaanmapte@outlook.com',
//       password: bcryptjs.hashSync('masterPassword0108', 10),
//       role: 'admin'
//     });

//     await adminUser.save();
//     res.status(201).json({ message: 'Admin user created successfully' });

//   } catch (error) {
//     console.error('Error creating admin user:', error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
