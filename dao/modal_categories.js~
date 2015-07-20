var data = require('./dataProvider.js');
var modal_categories = {
    
    getAllCategory : function (callback) {
        
        var connection = data.dataProvider.getSqlConnection();
        
        var categoryList = [];
        var sqlStatement = 'SELECT `id`, `name` FROM `category`  ORDER BY `id`';
        if (connection) {
            
            connection.query(sqlStatement, function(err, rows, fields){
            
                rows.forEach(function (row){
                    categoryList.push(row);
                });
                
                callback(categoryList);
            });
            
        }
        
        data.dataProvider.closeSqlConnection(connection);
    }
};

exports.modal_categories = modal_categories;
