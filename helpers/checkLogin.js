function CheckLogin() {
  if (req.session.loggedIn) {
    next()
  }else{
    res.redirect('/login')
  }
}

module.exports = CheckLogin;