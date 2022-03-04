const distribution = require('../../aws-cf-distribution.json');

if (distribution.ETag) {
  console.log(distribution.ETag);
} else {
  throw new Error('ETag not found on distribution config');
}
