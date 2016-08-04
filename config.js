    // database URL can be defined 1 of 3 ways
    // environment variable
    // from within the app using a global variable
    // or by setting the NODE_ENV to production
    // Defaults to 'shopping-list-dev' database
exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://localhost/shopping-list' :
                            'mongodb://localhost/shopping-list-dev');
    //Specify port with environment variable.
exports.PORT = process.env.PORT || 8080;