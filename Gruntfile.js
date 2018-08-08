module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-aws');

  grunt.initConfig({

    s3: {
      options: {
        bucket: grunt.option('bucket'),
        region: grunt.option('region') || 'eu-west-1',
        cache: false,
        gzip: false
      },
      resources: {
        options: {
          headers: {
            CacheControl: 1296000
          }
        },
        cwd: 'dist',
        src: ['**', '!**/*.html'] // everything except html files
      },
      html: {
        options: {
          headers: {
            CacheControl: 'no-cache, no-store, max-age=0, must-revalidate'
          }
        },
        cwd: 'dist',
        src: '**/*.html'
      }
    }

  });

  grunt.registerTask('deploy', function () {
    // Usage: grunt deploy --bucket=<bucket> [--region=<region>]
    // For configuration of credentials see http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html
    // e.g. Loaded from the shared credentials file (~/.aws/credentials)
    //      Loaded from Environment Variables AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
    grunt.task.run([
      's3:resources',
      's3:html'
    ]);
  });
};
