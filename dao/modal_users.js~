var data = require('./dataProvider.js');
var modal_users = {
    
    getAllUsers : function (callback) {
        
        var connection = data.dataProvider.getSqlConnection();
        
        var userList = [];
        var sqlStatement = 'SELECT `id`, `username`, `password`, `realname`, `user_group` FROM `users`';
        if (connection) {
            
            connection.query(sqlStatement, function(err, rows, fields){
            
                rows.forEach(function (row){
                    userList.push(row);
                });
                
                callback(userList);
            });
            
        }
        
        data.dataProvider.closeSqlConnection(connection);
    },
    
    getUserById : function (id, callback) {
        
        var connection = data.dataProvider.getSqlConnection();
        
        var userList = [];
        var sqlStatement = 'SELECT `id`, `username`, `password`, `realname`, `user_group` FROM `users` WHERE `id` = '+id+' LIMIT 1';
        if (connection) {
            
            connection.query(sqlStatement, function(err, rows, fields){
            
                rows.forEach(function (row){
                    userList.push(row);
                });
                
                callback(userList);
            });
            
        }
        
        data.dataProvider.closeSqlConnection(connection);
    },
    
    addNewUser : function (username, password, realname, user_group, callback) {
        
        var connection = data.dataProvider.getSqlConnection();
        
        var productList = [];
        var sqlStatement = "INSERT INTO `users` VALUES (-1, '"+username+"', '"+password+"', '"+realname+"', "+user_group+")";
        if (connection) {
            
            connection.query(sqlStatement, function(err, result) {
            
                if (err) {
                    throw err;
                    var returnMes = [{
                            msg:'Xóa người dùng thất bại! Xin vui lòng nhấn vào đường dẫn phía dưới để trở về trang danh sách người dùng và thử lại.',
                            url:'<a href="/auth/ulist.html">Trở về trang danh sách người dùng</a>'
                        }];
                } else {
                    var returnMes = [{
                            msg:'Thêm người dùng thành công! Nhấn vào đường dẫn phía dưới để trở về trang danh sách người dùng',
                            url:'<a href="/auth/ulist.html">Trở về trang danh sách người dùng</a>'
                        }];
                }
                
                callback(returnMes);
                
            });
            
        }
        
        data.dataProvider.closeSqlConnection(connection);
        
    },
    
    deleteUser : function (id, callback) {
        
        var connection = data.dataProvider.getSqlConnection();
        
        var sqlStatement = "DELETE FROM `users` WHERE `id`  = "+id;
        if (connection) {
            
            connection.query(sqlStatement, function(err, result) {
            
                if (err) {
                    throw err;
                    var returnMes = [{
                            msg:'Xóa người dùng thất bại! Xin vui lòng nhấn vào đường dẫn phía dưới để trở về trang danh sách người dùng và thử lại.',
                            url:'<a href="/auth/ulist.html">Trở về trang danh sách người dùng</a>'
                        }];
                } else {
                    var returnMes = [{
                            msg:'Xóa người dùng thành công! Nhấn vào đường dẫn phía dưới để trở về trang danh sách người dùng',
                            url:'<a href="/auth/ulist.html">Trở về trang danh sách người dùng</a>'
                        }];
                }
                
                callback(returnMes);
                
            });
            
        }
        
        data.dataProvider.closeSqlConnection(connection);
        
    },
    
    updateUser : function (id, password, realname, user_group, callback) {
        
        var connection = data.dataProvider.getSqlConnection();
        
        var sqlStatement = "UPDATE `users` SET `password`= '"+password+"', `realname`='"+realname+"',`user_group`="+user_group+" WHERE id="+id;
        
        if(typeof(password) === 'undefined' || password === ''){
            var sqlStatement = "UPDATE `users` SET `realname`='"+realname+"',`user_group`="+user_group+" WHERE id="+id;
        }
        if (connection) {
            
            connection.query(sqlStatement, function(err, result) {
            
                if (err) {
                    throw err;
                    var returnMes = [{
                            msg:'Cập nhật người dùng thất bại! Xin vui lòng nhấn vào đường dẫn phía dưới để trở về trang danh sách người dùng và thử lại.',
                            url:'<a href="/auth/ulist.html">Trở về trang danh sách người dùng</a>'
                        }];
                } else {
                    var returnMes = [{
                            msg:'Cập nhật người dùng thành công! Nhấn vào đường dẫn phía dưới để trở về trang danh sách người dùng',
                            url:'<a href="/auth/ulist.html">Trở về trang danh sách người dùng</a>'
                        }];
                }
                
                callback(returnMes);
                
            });
            
        }
        
        data.dataProvider.closeSqlConnection(connection);
        
    },
    
    login : function (username, password, callback) {
        
        var connection = data.dataProvider.getSqlConnection();
        
        var userList = [];
        var sqlStatement = 'SELECT `id`, `username`, `password`, `realname`, `user_group` FROM `users` WHERE `username` = "'+username+'" AND `password` = "'+password+'"';
        if (connection) {
            
            connection.query(sqlStatement, function(err, rows, fields){
            
                rows.forEach(function (row){
                    userList.push(row);
                });
                
                callback(userList);
            });
            
        }
        
        data.dataProvider.closeSqlConnection(connection);
        
    }
};

exports.modal_users = modal_users;
