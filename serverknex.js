var hapi = require('hapi');
//require("dotenv".config());
var jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");
var mysql = require('mysql');
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'practice'
  }
});
var server = new hapi.Server({
  host: 'localhost',
  port: 5001,
  routes: {
    cors: true
  },
});

server.route({
  method: 'GET',
  path: '/api/table',
  handler: async (request, reply) => {
    await knex.raw(`select *,date_format(DateofBirth, '%Y-%m-%d') as DateofBirth,date_format(DateofJoining, '%Y-%m-%d') as DateofJoining from details`)
      .then(data => {
        reply = 
          data
      })
    return reply;
  }
});


server.route({
  method: 'POST',
  path: '/api/login',
  handler: async (request, reply) => {
    var items=request.payload;
    await knex.raw(`select * from details where Name='${items.username}'and password='${items.password}'`)
      .then(data => {
        reply = data
        //console.log(data);
        if(reply[0].length!=0)
        {
          var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
         // console.log(token,'mgvghgd');
          reply = {
            token: token,
            message:'login',
            success: true
          }
      // Encrypt
      var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(items), 'secret key 123');
      console.log(ciphertext.toString());

      // Decrypt
      var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
      console.log(bytes.toString());
      var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      console.log(decryptedData);
        }
        else
        {
          reply ='failure';
        }
      })
      return reply;   
    }
  });

server.route({
  method: 'POST',
  path: '/api/encrypt',
  handler: async (request, reply) => {
    var items=request.payload;
   

         // Encrypt
         var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(items), 'secret key 123');
        //console.log(ciphertext.toString());
          reply =  ciphertext.toString();
        
       
      
      return reply;
  } 
    
  });


  server.route({
    method: 'POST',
    path: '/api/decrypt',
    handler: async (request, reply) => {
      let ed1=request.payload;
             // Decrypt
             console.log(ed1)
           var bytes  = CryptoJS.AES.decrypt(ed1, 'secret key 123');
           //console.log(bytes.toString());
           var plaintext = bytes.toString(CryptoJS.enc.Utf8);
           console.log(plaintext);   
           reply = plaintext;
        
        
        return reply;     
      }
    });



server.route({
  method: 'POST',
  path: '/api/details',
  handler: async (request, reply) => {
    let newdata=request.payload;
    await knex.raw(`Insert into details(Name,DateofBirth,Email,PhoneNumber,State,Gender,DepartmentId,password,DateofJoining) values('${newdata.name}','${newdata.dob}','${newdata.mail}','${newdata.ph}','${newdata.states}','${newdata.gender}','${newdata.dpmid}','${newdata.password}','${newdata.doj}')`)
      .then(data => {
        reply = 
          data
      })
    return reply;
  }
});

server.start((err) => {
  if (err) throw err;

})

server.route({
  method: 'POST',
  path: '/api/edit/{id}',
  handler: async (request, reply) => {
    let id=request.params.id;
    var newdetails=request.payload;
    await knex.raw(`UPDATE details SET Name='${newdetails.name}',DateofBirth='${newdetails.dob}',Email='${newdetails.mail}',PhoneNumber='${newdetails.ph}',State='${newdetails.states}',Gender='${newdetails.gender}',DepartmentId='${newdetails.dpmid}', password='${newdetails.password}',DateofJoining='${newdetails.doj}' WHERE Id=${id}`)
      .then(data => {
        reply = 
          data
      })
    return reply;
  }
});


server.route({
  method: 'POST',
  path: '/api/delete',
  handler: async (request, reply) => {
    var id=request.payload;
    await knex.raw(`Delete from details WHERE Id=${id}`)
      .then(data => {
        reply = 
          data
      })
    return reply;
  }
});




// server.route({
//   method: 'GET',
//   path: '/api/emptable',
//   handler: async (request, reply) => {
//     await knex.raw(`select * from emptable1 inner join emptable2 on emptable1.ecode=emptable2.eid`)
//       .then(data => {
//         reply = 
//           data
//       })
//     return reply;
//   }
// });


server.route({
  method: 'GET',
  path: '/api/emptable',
  handler: async (request, reply) => {
    await knex.raw(`SELECT details.Id,details.Name,departments.department,departments.id from details inner join departments on details.DepartmentId=departments.id `)
      .then(data => {
      
        reply = 
          data
      })
    return reply;
  }
});



console.log("Server is started")