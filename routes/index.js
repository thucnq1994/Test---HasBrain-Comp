var express = require('express');
var session = require('express-session');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var modal_products = require('../dao/modal_products.js');
    var modal_categories = require('../dao/modal_categories.js');
    
    var lock = 2;
    var productList = [];
    var categoryList = [];
    
    var finishRequest = function() {
        res.render('index', {
            newestProductList : productList,
            categoryList : categoryList
        });
    }
    
    modal_products.modal_products.get5NewestProducts(function (newestProductList){
        productList = newestProductList;
        
        lock -= 1;

        if (lock === 0) {
          finishRequest();
        }
    });
    
    modal_categories.modal_categories.getAllCategory(function (_categoryList){
        categoryList = _categoryList;
        
        lock -= 1;

        if (lock === 0) {
          finishRequest();
        }
    });
    
});

/* GET category page. */
router.get('/cat/:id.html', function(req, res, next) {
    
    var modal_products = require('../dao/modal_products.js');
    var modal_categories = require('../dao/modal_categories.js');
    
    var id = req.params.id || 0;
    var lock = 2;
    var productList = [];
    var categoryList = [];
    
    var finishRequest = function() {
        res.render('category', {
            newestProductList : productList,
            categoryList : categoryList
        });
    }
    
    modal_products.modal_products.getProductsByCat(id, function ( _productList){
        productList = _productList;
        
        lock -= 1;

        if (lock === 0) {
          finishRequest();
        }
    });
    
    modal_categories.modal_categories.getAllCategory(function (_categoryList){
        categoryList = _categoryList;
        
        lock -= 1;

        if (lock === 0) {
          finishRequest();
        }
    });
    
});

/* GET detail page. */
router.get('/detail/:id.html', function(req, res, next) {
    
    var modal_products = require('../dao/modal_products.js');
    var modal_categories = require('../dao/modal_categories.js');
    
    var id = req.params.id || 0;
    var lock = 2;
    var productList = [];
    var categoryList = [];
    
    var finishRequest = function() {
        
        if(productList.length != 1){
            res.render('404');
        } else {
            res.render('detail', {
                productList : productList,
                categoryList : categoryList
            });
        }
        
    }
    
    modal_products.modal_products.getProductById(id, function ( _productList){
        productList = _productList;
        
        lock -= 1;

        if (lock === 0) {
          finishRequest();
        }
    });
    
    modal_categories.modal_categories.getAllCategory(function (_categoryList){
        categoryList = _categoryList;
        
        lock -= 1;

        if (lock === 0) {
          finishRequest();
        }
    });
    
});

/* GET auth page. */
router.get('/auth', function(req, res, next) {
    if(req.session.curUser){
        res.render('auth_dashboard', { });
    } else {
        res.render('auth_index', { });
    }
});

/* POST auth page. */
router.post('/auth', function(req, res, next) {
    
    var modal_users = require('../dao/modal_users.js');
    
    var username = req.body.username;
    var password = req.body.password;
    
    var lock = 1;
    var userList = [];
    
    var finishRequest = function() {
    
        req.session.curUser = userList[0];
    
        if(userList.length === 1){
            res.redirect('/auth/dashboard.html');
        } else {
            res.render('auth_index', { mess : 'Đăng nhập thất bại. Xin vui lòng thử lại.'});
        }
    }
    
    modal_users.modal_users.login(username, password, function (_userList){
        userList = _userList;
        
        lock -= 1;

        if (lock === 0) {
          finishRequest();
        }
    });
    
});

/* GET auth page. */
router.get('/auth/logout.html', function(req, res, next) {
    req.session.destroy(function(err) {
        if (err) {
            throw err;
            console.log(err);
        } else {
            res.redirect('/auth');
        }
    });
});

/* GET admin dashboard page. */
router.get('/auth/dashboard.html', function(req, res, next) {
    if(req.session.curUser){
        res.render('auth_dashboard', { });
    } else {
        res.redirect('/auth');
    }
});

/* GET admin product list page. */
router.get('/auth/plist.html', function(req, res, next) {

    if(req.session.curUser){
    
        var modal_products = require('../dao/modal_products.js');
    
        var lock = 1;
        var productList = [];
        
        var finishRequest = function() {
            res.render('auth_plist', {
                productList : productList
            });
        }
        
        modal_products.modal_products.getAllProducts(function (_productList){
            productList = _productList;
            
            lock -= 1;

            if (lock === 0) {
              finishRequest();
            }
        });
        
    } else {
        res.redirect('/auth');
    }

});

/* GET admin product delete page. */
router.get('/auth/pdel/:id.html', function(req, res, next) {

    if(req.session.curUser){
    
        var modal_products = require('../dao/modal_products.js');
    
        var id = req.params.id || 0;
        
        var lock = 1;
        var returnMes = [];
        
        var finishRequest = function() {
            res.render('auth_mes', {
                returnMes : returnMes
            });
        }
        
        modal_products.modal_products.deleteProduct(id, function (_returnMes){
            returnMes = _returnMes;
            
            lock -= 1;

            if (lock === 0) {
              finishRequest();
            }
        });
    
    } else {
        res.redirect('/auth');
    }
    
});

/* GET admin user list page. */
router.get('/auth/ulist.html', function(req, res, next) {

    if(req.session.curUser && req.session.curUser.user_group === 1){
    
        var modal_users = require('../dao/modal_users.js');
    
        var lock = 1;
        var productList = [];
        
        var finishRequest = function() {
            res.render('auth_ulist', {
                userList : userList
            });
        }
        
        modal_users.modal_users.getAllUsers(function (_userList){
            userList = _userList;
            
            lock -= 1;

            if (lock === 0) {
              finishRequest();
            }
        });
    
    } else {
        res.redirect('/auth');
    }

});

/* GET admin product delete page. */
router.get('/auth/udel/:id.html', function(req, res, next) {

    if(req.session.curUser && req.session.curUser.user_group === 1){
    
        var modal_users = require('../dao/modal_users.js');
    
        var id = req.params.id || 0;
        
        var lock = 1;
        var returnMes = [];
        
        var finishRequest = function() {
            res.render('auth_mes', {
                returnMes : returnMes
            });
        }
        
        modal_users.modal_users.deleteUser(id, function (_returnMes){
            returnMes = _returnMes;
            
            lock -= 1;

            if (lock === 0) {
              finishRequest();
            }
        });
    
    } else {
        res.redirect('/auth');
    }
});

/* GET admin product add page. */
router.get('/auth/padd.html', function(req, res, next) {

    if(req.session.curUser){
    
        var modal_categories = require('../dao/modal_categories.js');
    
        var lock = 1;
        var categoryList = [];
        
        var finishRequest = function() {
            res.render('auth_padd', {
                categoryList : categoryList
            });
        }
        
        modal_categories.modal_categories.getAllCategory(function (_categoryList){
            categoryList = _categoryList;
            
            lock -= 1;

            if (lock === 0) {
              finishRequest();
            }
        });
    
    } else {
        res.redirect('/auth');
    }

});

/* POST admin product add page. */
router.post('/auth/padd.html', function(req, res, next) {
    
    if(req.session.curUser){
    
        var modal_products = require('../dao/modal_products.js');
    
        var name = req.body.name;
        var catid = req.body.catid;
        var desc = req.body.desc;
        var content = req.body.content;
        var price = req.body.price;
        var date_added = '2015-07-20 22:03:26';
        var user_added = 1;
        
        var lock = 1;
        var returnMes = [];
        
        var finishRequest = function() {
            res.render('auth_mes', {
                returnMes : returnMes
            });
        }
        
        modal_products.modal_products.addNewProduct(name, catid, desc, content, price, date_added, user_added, function (_returnMes){
            returnMes = _returnMes;
            
            lock -= 1;

            if (lock === 0) {
              finishRequest();
            }
        });
    
    } else {
        res.redirect('/auth');
    }
    
});

/* GET admin product edit page. */
router.get('/auth/pedit/:id.html', function(req, res, next) {
    
    if(req.session.curUser){
    
        var modal_products = require('../dao/modal_products.js');
        var modal_categories = require('../dao/modal_categories.js');
        
        var id = req.params.id || 0;
        
        var lock = 2;
        var productList = [];
        var categoryList = [];
        
        var finishRequest = function() {
            res.render('auth_pedit', {
                categoryList : categoryList,
                productList : productList
            });
        }
        
        modal_products.modal_products.getProductById(id, function (_productList){
            productList = _productList;
            
            lock -= 1;

            if (lock === 0) {
              finishRequest();
            }
        });
        
        modal_categories.modal_categories.getAllCategory(function (_categoryList){
            categoryList = _categoryList;
            
            lock -= 1;

            if (lock === 0) {
              finishRequest();
            }
        });
    
    } else {
        res.redirect('/auth');
    }
    
});

/* POST admin product edit page. */
router.post('/auth/pedit/:id.html', function(req, res, next) {
    
    if(req.session.curUser){
    
        var modal_products = require('../dao/modal_products.js');
    
        var id = req.body.id;
        var name = req.body.name;
        var catid = req.body.catid;
        var desc = req.body.desc;
        var content = req.body.content;
        var price = req.body.price;
        var date_updated = '2015-07-20 11:11:11';
        var user_updated = 3;
        
        var lock = 1;
        var returnMes = [];
        
        var finishRequest = function() {
            res.render('auth_mes', {
                returnMes : returnMes
            });
        }
        
        modal_products.modal_products.updateProduct(id, name, catid, desc, content, price, date_updated, user_updated, function (_returnMes){
            returnMes = _returnMes;
            
            lock -= 1;

            if (lock === 0) {
              finishRequest();
            }
        });
    
    } else {
        res.redirect('/auth');
    }
    
});


/* GET admin user add page. */
router.get('/auth/uadd.html', function(req, res, next) {
    if(req.session.curUser && req.session.curUser.user_group === 1){
    
        res.render('auth_uadd', { });
    
    } else {
        res.redirect('/auth');
    }
    
});

/* POST admin user add page. */
router.post('/auth/uadd.html', function(req, res, next) {
    
    if(req.session.curUser && req.session.curUser.user_group === 1){
    
        var modal_users = require('../dao/modal_users.js');
        
        var username = req.body.username;
        var password = req.body.password;
        var realname = req.body.realname;
        var user_group = req.body.user_group;
        
        var lock = 1;
        var returnMes = [];
        
        var finishRequest = function() {
            res.render('auth_mes', {
                returnMes : returnMes
            });
        }
        
        modal_users.modal_users.addNewUser(username, password, realname, user_group, function (_returnMes){
            returnMes = _returnMes;
            
            lock -= 1;

            if (lock === 0) {
              finishRequest();
            }
        });
    
    } else {
        res.redirect('/auth');
    }

});

/* GET admin user edit page. */
router.get('/auth/uedit/:id.html', function(req, res, next) {
    
    if(req.session.curUser && req.session.curUser.user_group === 1){
    
        var modal_users = require('../dao/modal_users.js');
    
        var id = req.params.id || 0;
        
        var lock = 1;
        var userList = [];
        
        var finishRequest = function() {
            res.render('auth_uedit', {
                userList : userList
            });
        }
        
        modal_users.modal_users.getUserById(id, function (_userList){
            userList = _userList;
            
            lock -= 1;

            if (lock === 0) {
              finishRequest();
            }
        });
    
    } else {
        res.redirect('/auth');
    }
    
});

/* POST admin user edit page. */
router.post('/auth/uedit/:id.html', function(req, res, next) {
    
    if(req.session.curUser && req.session.curUser.user_group === 1){
    
        var modal_users = require('../dao/modal_users.js');
    
        var id = req.body.id;
        var password = req.body.password;
        var realname = req.body.realname;
        var user_group = req.body.user_group;
        
        var lock = 1;
        var returnMes = [];
        
        var finishRequest = function() {
            res.render('auth_mes', {
                returnMes : returnMes
            });
        }
        
        modal_users.modal_users.updateUser(id, password, realname, user_group, function (_returnMes){
            returnMes = _returnMes;
            
            lock -= 1;

            if (lock === 0) {
              finishRequest();
            }
        });
    
    } else {
        res.redirect('/auth');
    }
    
});


module.exports = router;
