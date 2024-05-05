// import express from 'express';
// import User from '../models/userModel.js';
// import Tweet from '../models/tweetModel.js';

// const router = express.Router();

// router.get("/:id/profile", async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const user = await User.findById(userId);
//     const tweets = await Tweet.find({ createdBy: userId });
//     const followersCount = await User.countDocuments({ following: userId });
//     const followingCount = user.following.length;

//     if (!user) {
//       return res.status(404).json({ message: "Användaren hittades inte" });
//     }

//     res.status(200).json({
//       user: {
//         id: user._id,
//         username: user.username,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email
//       },
//       tweets,
//       followersCount,
//       followingCount
//     });
//   } catch (error) {
//     console.error("Error fetching user profile:", error);
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;

import express from 'express';
import User from '../models/userModel.js';
import Tweet from '../models/tweetModel.js';  

const router = express.Router();

router.get("/:id/profile", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    const tweets = await Tweet.find({ createdBy: userId });
    const followersCount = await User.countDocuments({ following: userId });
    const followingCount = user.following.length;

    if (!user) {
      return res.status(404).json({ message: "Användaren hittades inte" });
    }

    res.status(200).json({
      user,
      tweets,
      followersCount,
      followingCount
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
