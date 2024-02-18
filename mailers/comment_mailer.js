const nodemailer = require('../config/nodemailer');

//this is anoter way of exporting a method.
exports.newComment = (comment) => {
    let htmlString = nodemailer.renderTemplate({ comment: comment }, '/comments/new_comment.ejs')
   
    nodemailer.transporter.sendMail({
        from: 'ba7254491@gmail.com',
        to: comment.commentedUser,
        subject: "New Comment Published!",
        html: htmlString
    }), (err, info) => {
        if (err) {
            console.log('Error in sending the mail')
            return;
        }
        console.log('Message sent', info)
        return;
    }
}