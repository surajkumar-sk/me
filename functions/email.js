var nodemailer = require('nodemailer')
require('dotenv').config({ path: './.env' });


async function main(data) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
    });
  // let transporter = nodemailer.createTransport({
  //   host: "smtp.ethereal.email",
  //   port: 587,
  //   secure: false, // true for 465, false for other ports
  //   auth: {
  //     user: testAccount.user, // generated ethereal user
  //     pass: testAccount.pass, // generated ethereal password
  //   },
  // });

  var message = {
    from: data.email, // sender address
    to: 'sk10121815@gmail.com', // list of receivers
    subject: "Email from Website", // Subject line
    text: "email:" +data.email + "message:"+ data.message, // plain text body
  };

  // send mail with defined transport object
  try { 
    await transporter.sendMail(message);
    return{
      statusCode:200
    }
  } catch (error) {
    console.log(error);
    return{
      statusCode:400
    }
  }
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

exports.handler = async function(event,context){
  const req = JSON.parse(event.body);
  const data = {email:req.email,message:req.message}
  res = await main(data);
  if(res.statusCode == 400){
    return{
      statusCode:400,
      body:'Unable to send Email'
    };
  }
  else if(res.statusCode == 200){
    return{
      statusCode:200,
      body:'Email Sent Successfully'
    };
  }
  
}