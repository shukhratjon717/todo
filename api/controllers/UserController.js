/**
 * UserController.js
 *
 * @description :: Server-side actions for handling user requests.
 */

module.exports = {
  /**
   * @desc Register a new user
   * @route POST /user/register
   */
  register: async function (req, res) {
    try {
      const { fullName, email, password } = req.allParams();

      // Check if email already exists
      let existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already in use" });
      }

      // Create new user
      let newUser = await User.create({ fullName, email, password }).fetch();
      return res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    } catch (error) {
      return res.serverError(error);
    }
  },

  /**
   * @desc Login a user
   * @route POST /user/login
   */
  login: async function (req, res) {
    try {
      const { email, password } = req.allParams();

      // Find user by email
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        "your_secret_key",
        { expiresIn: "1h" }
      );

      return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      return res.serverError(error);
    }
  },

  /**
   * @desc Get user details
   * @route GET /user/me
   */
  me: async function (req, res) {
    try {
      // Assuming user is authenticated via JWT middleware
      let userId = req.user.id; // Extracted from middleware
      let user = await User.findOne({ id: userId }).populate("tasks");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.serverError(error);
    }
  },

  /**
   * @desc Update user info
   * @route PUT /user/update
   */
  update: async function (req, res) {
    try {
      let userId = req.user.id;
      let updatedUser = await User.updateOne({ id: userId }).set(
        req.allParams()
      );
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      return res
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      return res.serverError(error);
    }
  },

  /**
   * @desc Delete user
   * @route DELETE /user/delete
   */
  delete: async function (req, res) {
    try {
      let userId = req.user.id;
      await User.destroyOne({ id: userId });
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      return res.serverError(error);
    }
  },
};
