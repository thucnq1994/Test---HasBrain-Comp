var express = require('express');
var session = require('express-session');
var async = require('async');
var multer  = require('multer')
var router = express.Router();
var upload = multer({dest: './public/uploads/' }).single('image');
var modal_users = require('../dao/modal_users.js');
var modal_products = require('../dao/modal_products.js');
var modal_categories = require('../dao/modal_categories.js');

var isAdmin = function(req, res, next){
    if(req.session.curUser.user_group === 1){
        next();
    } else {
        res.redirect('/auth/dashboard.html');
    }
}

var isLoggedIn = function(req, res, next){
    if(req.session.curUser){
        next();
    } else {
        res.redirect('/auth');
    }
}

/* GET homepage. */
router.get('/', function(req, res, next) {
    
    var productList = [];
    var categoryList = [];
    
    async.parallel([
        function(callback) {
            modal_categories.modal_categories.getAllCategory(function (_categoryList){
                categoryList = _categoryList;
                callback();
            });
        },
        function(callback) {
            modal_products.modal_products.get5NewestProducts(function (_productList){
                productList = _productList;
                callback();
            });
        }
    ], function(err) {
        if (err) return next(err);
        res.render('index', {
            newestProductList : productList,
            categoryList : categoryList
        });
    });
    
});

/* GET category page. */
router.get('/cat/:id.html', function(req, res, next) {
    
    var id = req.params.id || 0;
    var productList = [];
    var categoryList = [];
    
    async.parallel([
        function(callback) {
            modal_categories.modal_categories.getAllCategory(function (_categoryList){
                categoryList = _categoryList;
                callback();
            });
        },
        function(callback) {
            modal_products.modal_products.getProductsByCat(id, function ( _productList){
                productList = _productList;
                callback();
            });
        }
    ], function(err) {
        if (err) return next(err);
        res.render('category', {
            newestProductList : productList,
            categoryList : categoryList
        });
    });
    
});

/* GET detail page. */
router.get('/detail/:id.html', function(req, res, next) {
    
    var id = req.params.id || 0;
    var productList = [];
    var categoryList = [];
    
    async.parallel([
        function(callback) {
            modal_categories.modal_categories.getAllCategory(function (_categoryList){
                categoryList = _categoryList;
                callback();
            });
        },
        function(callback) {
            modal_products.modal_products.getProductById(id, function ( _productList){
                productList = _productList;
                callback();
            });
        }
    ], function(err) {
        if (err) return next(err);
        if(productList.length != 1){
            res.render('404');
        } else {
            res.render('detail', {
                productList : productList,
                categoryList : categoryList
            });
        }
    });
    
});

/* GET auth page. */
router.get('/auth', function(req, res, next) {
    if(req.session.curUser){
        res.redirect('/auth/dashboard.html');
    } else {
        res.render('auth_index');
    }
});

/* POST auth page. */
router.post('/auth', function(req, res, next) {

    var username = req.body.username;
    var password = req.body.password;
    
    modal_users.modal_users.login(username, password, function (userList){
        
        if(userList.length === 1){
            req.session.curUser = userList[0];    
            res.redirect('/auth/dashboard.html');
        } else {
            res.render('auth_index', { mess : 'Đăng nhập thất bại. Xin vui lòng thử lại.'});
        }
        
    });
    
});

/* GET auth page. */
router.get('/auth/logout.html', function(req, res, next) {
    req.session.destroy(function(err) {
        if (err) {
            throw err;
        } else {
            res.redirect('/auth');
        }
    });
});

/* GET admin dashboard page. */
router.get('/auth/dashboard.html', isLoggedIn, function(req, res, next) {
    res.render('auth_dashboard');
});

/* GET admin dashboard page. */
router.get('/demo',
    function(req, res, next) { res.render('upload');
});

var upload1 = multer({dest: './uploads/' }).single('image');
router.post('/demo', function(req, res, next) {
    upload1(req, res, function (err) {
        if (err) {
          // An error occurred when uploading
          return
        }

        // Everything went fine
        console.log(req.file);
      })
    
    
});


/* GET admin product list page. */
router.get('/auth/plist.html', isLoggedIn, function(req, res, next) {

    modal_products.modal_products.getAllProducts(function (productList){
        res.render('auth_plist', { productList : productList });
    });

});

/* GET admin product delete page. */
router.get('/auth/pdel/:id.html', isLoggedIn, function(req, res, next) {

    var id = req.params.id || 0;
    
    modal_products.modal_products.deleteProduct(id, function (returnMes){
        res.render('auth_mes', { returnMes : returnMes });
    });
    
});

/* GET admin user list page. */
router.get('/auth/ulist.html', isLoggedIn, isAdmin, function(req, res, next) {

    modal_users.modal_users.getAllUsers(function (userList){
        res.render('auth_ulist', { userList : userList });
    });

});

/* GET admin product delete page. */
router.get('/auth/udel/:id.html', isLoggedIn, isAdmin, function(req, res, next) {

    var id = req.params.id || 0;
    
    modal_users.modal_users.deleteUser(id, function (returnMes){
        res.render('auth_mes', { returnMes : returnMes });
    });
});

/* GET admin product add page. */
router.get('/auth/padd.html', isLoggedIn, function(req, res, next) {

    modal_categories.modal_categories.getAllCategory(function (categoryList){
        res.render('auth_padd', { categoryList : categoryList });
    });

});

/* POST admin product add page. */
router.post('/auth/padd.html',  isLoggedIn, function(req, res, next) {
    upload(req, res, function (err) {
        if (err) {
          // An error occurred when uploading
          return
        }

        var name = req.body.name;
        var catid = req.body.catid;
        var desc = req.body.desc;
        var content = req.body.content;
        var price = req.body.price;
        
        var str = req.file.originalname.split(".");
        var image = req.file.filename + '.' + str[str.length - 1];
        
        var today = new Date();
        var dd = today.getDate();
        var MM = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var H = today.getHours();
        var i = today.getMinutes();
        var s = today.getSeconds();
        if(dd<10){ dd='0'+dd } 
        if(MM<10){ MM='0'+MM }
        if(H<10){ H='0'+H }
        if(i<10){ i='0'+i }
        if(s<10){ s='0'+s }
        var date_added = yyyy+'-'+MM+'-'+dd + ' ' + H + ':' + i + ':' + s; // yyyy-MM-dd H:i:s
        
        var user_added = req.session.curUser.id;
        
        modal_products.modal_products.addNewProduct(name, catid, desc, content, price, date_added, user_added, image, function (returnMes){
            res.render('auth_mes', { returnMes : returnMes });
        });
    })
});

/* GET admin product edit page. */
router.get('/auth/pedit/:id.html', isLoggedIn, function(req, res, next) {
    
    var id = req.params.id || 0;
    var productList = [];
    var categoryList = [];
    
    async.parallel([
        function(callback) {
            modal_categories.modal_categories.getAllCategory(function (_categoryList){
                categoryList = _categoryList;
                callback();
            });
        },
        function(callback) {
            modal_products.modal_products.getProductById(id, function (_productList){
                productList = _productList;
                callback();
            });
        }
    ], function(err) {
        if (err) return next(err);
        res.render('auth_pedit', {
            categoryList : categoryList,
            productList : productList
        });
    });
    
});

/* POST admin product edit page. */
router.post('/auth/pedit/:id.html', isLoggedIn, function(req, res, next) {
    
    var id = req.body.id;
    var name = req.body.name;
    var catid = req.body.catid;
    var desc = req.body.desc;
    var content = req.body.content;
    var price = req.body.price;
    
    var today = new Date();
    var dd = today.getDate();
    var MM = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var H = today.getHours();
    var i = today.getMinutes();
    var s = today.getSeconds();
    if(dd<10){ dd='0'+dd } 
    if(mm<10){ mm='0'+mm }
    var date_updated = yyyy+'-'+MM+'-'+dd + ' ' + H + ':' + i + ':' + s; // yyyy-MM-dd H:i:s
    
    var user_updated = req.session.curUser.id;
    
    modal_products.modal_products.updateProduct(id, name, catid, desc, content, price, date_updated, user_updated, function (returnMes){
        res.render('auth_mes', { returnMes : returnMes });
    });
    
});


/* GET admin user add page. */
router.get('/auth/uadd.html', isLoggedIn, isAdmin, function(req, res, next) {
    res.render('auth_uadd');
});

/* POST admin user add page. */
router.post('/auth/uadd.html', isLoggedIn, isAdmin, function(req, res, next) {
    
    var username = req.body.username;
    var password = req.body.password;
    var realname = req.body.realname;
    var user_group = req.body.user_group;
    
    modal_users.modal_users.addNewUser(username, password, realname, user_group, function (returnMes){
        res.render('auth_mes', { returnMes : returnMes });
    });

});

/* GET admin user edit page. */
router.get('/auth/uedit/:id.html', isLoggedIn, isAdmin, function(req, res, next) {

    var id = req.params.id || 0;
    
    modal_users.modal_users.getUserById(id, function (userList){
        res.render('auth_uedit', { userList : userList });
    });

});

/* POST admin user edit page. */
router.post('/auth/uedit/:id.html', isLoggedIn, isAdmin, function(req, res, next) {

    var id = req.body.id;
    var password = req.body.password;
    var realname = req.body.realname;
    var user_group = req.body.user_group;
    
    modal_users.modal_users.updateUser(id, password, realname, user_group, function (returnMes){
        res.render('auth_mes', { returnMes : returnMes });
    });
        
});


module.exports = router;
