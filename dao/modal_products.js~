var data = require('./dataProvider.js');
var modal_products = {
    
    get5NewestProducts : function (callback) {
        
        var connection = data.dataProvider.getSqlConnection();
        
        var productList = [];
        var sqlStatement = 'SELECT `id`, `name`, `desc`, `price` FROM `products`  ORDER BY `date_added` LIMIT 5';
        if (connection) {
            
            connection.query(sqlStatement, function(err, rows, fields){
            
                rows.forEach(function (row){
                    productList.push(row);
                });
                
                callback(productList);
            });
            
        }
        
        data.dataProvider.closeSqlConnection(connection);
        
    },
    
    getProductsByCat : function (id, callback) {
        
        var connection = data.dataProvider.getSqlConnection();
        
        var productList = [];
        var sqlStatement = 'SELECT `id`, `name`, `desc`, `price` FROM `products` WHERE `catid` = '+id+' ORDER BY `date_added`';
        if (connection) {
            
            connection.query(sqlStatement, function(err, rows, fields){
            
                rows.forEach(function (row){
                    productList.push(row);
                });
                
                callback(productList);
            });
            
        }
        
        data.dataProvider.closeSqlConnection(connection);
        
    },
    
    getProductById : function (id, callback) {
        
        var connection = data.dataProvider.getSqlConnection();
        
        var productList = [];
        var sqlStatement = 'SELECT `id`, `name`, `catid`, `desc`, `content`, `price`, `date_added`, `date_updated`, `user_added`, `user_updated` FROM `products` WHERE `id` = '+id+' LIMIT 1';
        if (connection) {
            
            connection.query(sqlStatement, function(err, rows, fields){
            
                rows.forEach(function (row){
                    productList.push(row);
                });
                
                callback(productList);
            });
            
        }
        
        data.dataProvider.closeSqlConnection(connection);
        
    },
    
    getAllProducts : function (callback) {
        
        var connection = data.dataProvider.getSqlConnection();
        
        var productList = [];
        //var sqlStatement = 'SELECT `id`, `name`, `price`, `date_added`, `user_added` FROM `products`  ORDER BY `date_added`';
        var sqlStatement = 'SELECT p.id,  p.name, p.price, p.date_added, u.username FROM products  p, users u WHERE p.user_added = u.id ORDER BY p.date_added';
        if (connection) {
            
            connection.query(sqlStatement, function(err, rows, fields){
            
                rows.forEach(function (row){
                    productList.push(row);
                });
                
                callback(productList);
            });
            
        }
        
        data.dataProvider.closeSqlConnection(connection);
        
    },
    
    addNewProduct : function (name, catid, desc, content, price, date_added, user_added, callback) {
        
        var connection = data.dataProvider.getSqlConnection();
        
        var sqlStatement = "INSERT INTO `products` VALUES (-1, '"+name+"', "+catid+", '"+desc+"', '"+content+"', "+price+",  '"+date_added+"', NULL, "+user_added+", NULL)";
        if (connection) {
            
            connection.query(sqlStatement, function(err, result) {
            
                if (err) {
                    throw err;
                    var returnMes = [{
                            msg:'Thêm sản phẩm thất bại! Xin vui lòng nhấn vào đường dẫn phía dưới để trở về trang danh sách sản phẩm và thử lại.',
                            url:'<a href="/auth/plist.html">Trở về trang danh sách sản phẩm</a>'
                        }];
                } else {
                    var returnMes = [{
                            msg:'Thêm sản phẩm thành công! Nhấn vào đường dẫn phía dưới để trở về trang danh sách sản phẩm',
                            url:'<a href="/auth/plist.html">Trở về trang danh sách sản phẩm</a>'
                        }];
                }
                
                callback(returnMes);
                
            });
            
        }
        
        data.dataProvider.closeSqlConnection(connection);
        
    },
    
    deleteProduct : function (id, callback) {
        
        var connection = data.dataProvider.getSqlConnection();
        
        var sqlStatement = "DELETE FROM `products` WHERE id  = "+id;
        if (connection) {
            
            connection.query(sqlStatement, function(err, result) {
            
                if (err) {
                    throw err;
                    var returnMes = [{
                            msg:'Xóa sản phẩm thất bại! Xin vui lòng nhấn vào đường dẫn phía dưới để trở về trang danh sách sản phẩm và thử lại.',
                            url:'<a href="/auth/plist.html">Trở về trang danh sách sản phẩm</a>'
                        }];
                } else {
                    var returnMes = [{
                            msg:'Xóa sản phẩm thành công! Nhấn vào đường dẫn phía dưới để trở về trang danh sách sản phẩm',
                            url:'<a href="/auth/plist.html">Trở về trang danh sách sản phẩm</a>'
                        }];
                }
                
                callback(returnMes);
                
            });
            
        }
        
        data.dataProvider.closeSqlConnection(connection);
        
    },
    
    updateProduct : function (id, name, catid, desc, content, price, date_updated, user_updated, callback) {
        
        var connection = data.dataProvider.getSqlConnection();
        
        var sqlStatement = "UPDATE `products` SET `name`= '"+name+"', `catid`="+catid+",`desc`='"+desc+"',`content`='"+content+"',`price`="+price+",`date_updated`='"+date_updated+"', `user_updated`="+user_updated+" WHERE id="+id;
        if (connection) {
            
            connection.query(sqlStatement, function(err, result) {
            
                if (err) {
                    throw err;
                    var returnMes = [{
                            msg:'Cập nhật sản phẩm thất bại! Xin vui lòng nhấn vào đường dẫn phía dưới để trở về trang danh sách sản phẩm và thử lại.',
                            url:'<a href="/auth/plist.html">Trở về trang danh sách sản phẩm</a>'
                        }];
                } else {
                    var returnMes = [{
                            msg:'Cập nhật sản phẩm thành công! Nhấn vào đường dẫn phía dưới để trở về trang danh sách sản phẩm',
                            url:'<a href="/auth/plist.html">Trở về trang danh sách sản phẩm</a>'
                        }];
                }
                
                callback(returnMes);
                
            });
            
        }
        
        data.dataProvider.closeSqlConnection(connection);
        
    }
};

exports.modal_products = modal_products;
