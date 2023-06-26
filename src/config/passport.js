const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email })

          if (!user) {
            return done(null, false, { message: '이메일이 존재하지 않습니다.' })
          }

          const isMatch = await bcrypt.compare(password, user.password)

          if (isMatch) {
            return done(null, user)
          } else {
            return done(null, false, { message: '비밀번호가 잘못되었습니다.' })
          }
        } catch (error) {
          console.error('이메일이나 비밀번호가 잘못되었습니다.', error)
          return done(error)
        }
      }
    )
  )
}
