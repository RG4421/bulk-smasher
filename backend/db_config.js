require('dotenv').config();

module.exports = {
    bulksmasher_queue: 'bulksmasher-jobs-queue',
    bulksmasher_status: 'bulksmasher-jobs-status',
    aws_remote_config: {
      accessKeyId: process.env.WORKER_ID,
      secretAccessKey: process.env.WORKER_KEY,
      region: 'us-east-2',
    }
};