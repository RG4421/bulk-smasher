require('dotenv').config();

module.exports = {
    bulksmasher_queue: 'bulksmasher-queue',
    bulksmasher_jobs: 'bulksmasher-jobs',
    aws_remote_config: {
      accessKeyId: process.env.WORKER_ID,
      secretAccessKey: process.env.WORKER_KEY,
      region: 'us-east-2',
    }
};