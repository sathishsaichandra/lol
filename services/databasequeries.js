const connection = require("../config/connection");
var collection_queries = {};
collection_queries.Register = (data) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`select username from customer where username='${data.username}'`, (err, rows, fields) => {

                if (rows.length > 0) {
                    resolve('username is already exists');

                }
                else {
                    if (data.type == 'admin' || data.type == 'customer' || data.type == 'sp') {
                        connection.query(`insert into customer (type,username,phone,email,password) values ('${data.type}','${data.username}','${data.phone}','${data.email}','${data.password}')`, (err, rows, fields) => {
                            if (!err) {
                                resolve("successfully registered")
                            }
                            else {
                                resolve('invalid query');
                            }
                        });

                    } else {
                        resolve('type should be admin or customer or sp');
                    }}})
        } catch (e) {
            reject(e.message);
            console.log(e.message);
        }});
}
collection_queries.Login = (type, username) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`select password from  customer where type='${type}' and username='${username}'`, (err, rows, fields) => {
                if (rows && rows.length > 0) {
                    resolve(rows[0].password);
                } else {
                    resolve(boom.badRequest('invalid query'));
                }});
        } catch (e) {
            reject(boom.badRequest('invalid query'));
        }})
}
collection_queries.Update = (type, username, latitude, longitude) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`update customer set latitude='${latitude}',longitude='${longitude}' where type='${type}'and username='${username}'`, (err, rows, fields) => {
                if (!err) {
                    resolve(rows);
                }
                else {
                    reject(err)
                }})
            }
        catch (e) {
            reject(e);
        }})
}
collection_queries.find = (type, orig_latitude, orig_longitude, distance) => {
    var type=type;
    var ori_lat = orig_latitude;
var ori_lon =orig_longitude ;
    var distance=distance;
    return new Promise((resolve, reject) => {
        connection.query(`select latitude,longitude from customer where type='admin'`, (err, rows, fields) => {
            for (var i of rows) {        
                var dest_lat = i.latitude;
                var dest_lon = i.longitude;        
                connection.query(`select *,3956*2*asin(sqrt(pow(sin(abs(${ori_lat - dest_lat})*PI()/180/2),2) +cos(${ori_lat}*PI()/180)*cos(${dest_lat}*PI()/180)*pow(sin(abs(${ori_lon - dest_lon})*PI()/180/2),2))) as distance from akashk where type='${type}' having distance<'${distance}' `, (error, rows, field) => {
                        if (error) {
                            console.log(error.message);
        
                        }
                        else {
                            if (rows && rows.length > 0) {
                                
                                resolve(rows)
                            }
                            else{
                                resolve('data not exists');
                            } }})}})})
collection_queries.Fetch = (type, username, fetchOf) => {

    return new Promise((resolve, reject) => {
        if (type == 'admin' || type == "Admin") {
            connection.query(`select * from customer where type='${fetchOf}'`, (err, rows, fields) => {
                if (!err && rows.length > 0) {
                    resolve(rows);

                } else {
                    resolve(err.message);
                    console.log(err.message);

                }})}
        else {
            reject('type is not matching');
        }
    })
}
module.exports = collection_queries;
}