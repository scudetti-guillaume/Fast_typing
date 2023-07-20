const userModel = require("../models/auth.model.js");

module.exports.getMyData = async (req, res) => {
  userModel
    .findOne({ username: req.body.username })
    .select("-password")
    .then((user) => {
      if (!user) {
        return res.json({ msg: "User not found", status: false });
      } else {
        res.send(user);
      }
    })
    .catch((error) => res.status(401).send(error.message));
};

module.exports.updateData = async (req, res) => {
  try {
    const user = await userModel.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    user.speeds.push(parseInt(req.body.speed));
    user.totalAccuracy.push(parseInt(req.body.accuracy));
    user.score = req.body.score;
    user.totalMiss = req.body.totalMiss;
    user.totalGood = req.body.totalGood;
    user.accuracy = req.body.accuracy;
    user.playingTime = req.body.playingTime;
    const speedSum = user.speeds.reduce((a, b) => a + b, 0);
    const speedAvg = speedSum / user.speeds.length;
    user.keyPerSecond = speedAvg.toFixed(2);
    const accuracySum = user.totalAccuracy.reduce((a, b) => a + b, 0);
    const accuracyAvg = accuracySum / user.totalAccuracy.length;
    user.accuracy = accuracyAvg.toFixed(2);

    if (req.body.round > user.maxRound) {
      user.maxRound = req.body.round;
    }

    await user.save();
    console.log(user.speeds);
    res.json({
      message: "Données utilisateur mises à jour avec succès",
      user: {
        username: user.username,
        score: user.score,
        keyPerSecond: user.keyPerSecond,
        totalMiss: user.totalMiss,
        totalGood: user.totalGood,
        accuracy: user.accuracy,
        playingTime: user.playingTime,
        speeds: user.speeds,
        speedAvg: speedAvg,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour des données utilisateur",
      error: error,
    });
  }
};

module.exports.getLeaderboardScore = async (req, res) => {
  userModel
    .find()
    .sort({ score: -1 })
    .limit(5)
    .exec(function (err, players) {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).send(players);
      }
    });
};

module.exports.getLeaderboardAccuracy = async (req, res) => {
  userModel
    .find()
    .sort({ accuracy: -1 })
    .limit(5)
    .exec(function (err, players) {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).send(players);
      }
    });
};

module.exports.getLeaderboardSpeed = async (req, res) => {
  userModel
    .find()
    .sort({ keyPerSecond: -1 })
    .limit(5)
    .exec(function (err, players) {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).send(players);
      }
    });
};
