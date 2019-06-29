const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const requireLogin = require('../middlewares/requireLogin');
const { accessKeyId, secretAccessKey, region } = require('../config/keys');

const s3 = new AWS.S3({ accessKeyId, secretAccessKey, region });

module.exports = app => {
  app.get('/api/upload', requireLogin, (req, res) => {
    const key = `${req.user.id}/${uuid()}.pdf`;

    s3.getSignedUrl(
      'putObject',
      {
        Bucket: 'my-blogster-buket',
        ContentType: 'application/pdf',
        Key: key
      },
      (_err, url) => res.send({ key, url })
    );
  });
};
