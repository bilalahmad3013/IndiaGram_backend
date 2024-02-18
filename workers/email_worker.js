const queue= require('../config/kue');
const comment_mailer = require('../mailers/comment_mailer');  

queue.process('emails', function(job, done) {
    try {
        console.log('emails worker is doing the job', job.data);
        comment_mailer.newComment(job.data);
        done();
    } catch (error) {
        console.error('Error processing job:', error);
        done(error); // Pass the error to mark the job as failed
    }
});
