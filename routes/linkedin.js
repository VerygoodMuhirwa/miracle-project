const express = require("express")
const passport = require("passport")
const router = express.Router()

router.get("/linkedin", passport.authenticate("linkedin", { state: "L5KDFJ" }))
router.get(
  "/linkedin/callback",
  passport.authenticate("linkedin", {
    successRedirect: "http://localhost:5002/auth/login/success",
    failureRedirect: "http://localhost:5l73/signUp",
  })
);
router.get("/login/success", (req, res) => {
    if (req.user) {
        res.json(req.user)
    }
})

router.get("/logout", (req, res) => {
    req.logOut((error) => {
        if (error) { return }
        res.redirect("/")
    })
})
module.exports = router

