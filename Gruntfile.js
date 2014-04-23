'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({
  port: LIVERELOAD_PORT
});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // Let *load-grunt-tasks* require everything
  require('load-grunt-tasks')(grunt);
  // Read configuration from package.json
  var pkgConfig = grunt.file.readJSON('package.json');
  var jshintConfig = grunt.file.readJSON('.jshintrc');

  var loaders = [{
    test: /\.scss$/,
    loader: 'style!css!sass'
  }, {
    test: /\.js$/,
    loader: 'jsx-loader'
  }];

  grunt.initConfig({
    pkg: pkgConfig,
    webpack: {
      development: {
        context: __dirname + '/src/components/',
        entry: './global/global.js',
        output: {
          path: '<%= pkg.src %>/scripts/',
          filename: 'main.js'
        },
        debug: true,
        cache: true,
        stats: {
          colors: true,
          reasons: true
        },
        resolve: {
          modulesDirectories: ['bower_components', 'node_modules']
        },
        jshint: grunt.util._.merge(jshintConfig, {
          emitErrors: false,
          failOnHint: false
        }),
        module: {
          preLoaders: [{
            test: '\\.js$',
            exclude: 'node_modules',
            loader: 'jshint'
          }],
          loaders: loaders
        }
      }
    },
    watch: {
      webpack: {
        files: ['<%= pkg.src %>/components/{,*/}*.{js,scss}',
          '!<%= pkg.src %>/scripts/<%= pkg.mainOutput %>.js'
        ],
        tasks: ['webpack:development']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= pkg.src %>/{,*/}*.html',
          '<%= pkg.src %>/scripts/<%= pkg.mainOutput %>.js'
        ]
      }
    },
    connect: {
      options: {
        port: 8000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, pkgConfig.src)
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, pkgConfig.dist)
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    }
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'connect:livereload',
      'webpack:development',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('test', ['karma']);

  grunt.registerTask('build', []);

  grunt.registerTask('default', []);
};
