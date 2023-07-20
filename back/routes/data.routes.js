const router = require("express").Router();
const dataController = require("../controllers/data.controller");

//route data
router.post("/my-data", dataController.getMyData);
router.post("/update-data", dataController.updateData);
router.get("/get-leaderboard-score", dataController.getLeaderboardScore);
router.get("/get-leaderboard-accuracy", dataController.getLeaderboardAccuracy);
router.get("/get-leaderboard-speed", dataController.getLeaderboardSpeed);

module.exports = router;
