module.exports = {
   checker: (req, res, next) => {
       const {session} = req
       if ( !session.user ) {
           session.user = {
               username: '',
               cart: [],
               total: 0
           }
        }
        next()
    }
}