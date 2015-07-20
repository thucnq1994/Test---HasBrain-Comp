var mysql = require('mysql');
var dataProvider = {

    getSqlConnection : function () {
    
        var connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '123456',
            database : 'test'
        });
        
        connection.connect(function (error) {
        
            if (error) { throw error }
            console.log('MySql Connection Successful!!!');
            
        });
        
        return connection;
    },
    
    closeSqlConnection : function (currentConnection) {
    
        currentConnection.end(function (error) {
        
            if (error) { throw error }
            console.log('MySql Connection Closed Successful!!!');
        
        });
    
    }
};

exports.dataProvider = dataProvider;
