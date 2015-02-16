module.exports = function(grunt) {

    // configure the tasks
    grunt.initConfig({

        copy: {
            paperletters: {
                cwd:'subs/PaperLetters/dist',
                src: '**',
                dest: 'publish/PaperLetters/',
                expand: true
            },
            paperletters: {
                cwd:'subs/PaperLetters/dist',
                src: '**',
                dest: 'publish/PaperLetters/',
                expand: true
            },
            gaeagun: {
                cwd:'subs/GaeaGun',
                src: '**',
                dest: 'publish/GaeaGun/',
                expand: true
            },
            subs: {
                cwd:'subs/',
                src: ['js/**','css/**'],
                dest: 'publish/',
                expand: true
            },
            js: {
                src: 'js/*',
                dest: 'publish/',
                expand: true
            },
            assets: {
                src: ['assets/**','!assets/*.db'],
                dest: 'publish/',
                expand: true
            },
            bootstrap:{
                cwd:'subs/AMBootstrap/dist',
                src: ['js/bootstrap.min.js','css/bootstrap.min.css','fonts/*'],
                dest:'publish',
                expand:true
            },
            html:{
                src: ['index.html','partials/**','web.config'],
                dest: 'publish/',
                expand: true
            }
        },

        clean: {
            publish: {
                src: [ 'publish' ]
            }
        },

        cssmin: {
            publish: {
                files: {
                    'publish/css/AM.min.css': [ 'css/*.css' ]
                }
            }
        },

        uglify: {
            build: {
                //options: {
                //    mangle: true
                //},
                files: {
                    'publish/js/AM.min.js': [ 'js/*.js' ]
                }
            }
        },
    });

    // load the tasks
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    //grunt.loadNpmTasks('grunt-contrib-stylus');
    //grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-jade');
    //grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-contrib-connect');

    // define the tasks
    grunt.registerTask('compile-bootstrap', function() {
        var cb = this.async();
        grunt.util.spawn({
            grunt: true,
            args: ['dist'],
            opts: {
                cwd: 'subs/AMBootstrap'
            }
        }, function(error, result, code) {
            console.log(result.stdout);
            cb();
        });
    });
    grunt.registerTask('compile-paperletter', function() {
        var cb = this.async();
        grunt.util.spawn({
            grunt: true,
            args: ['dist'],
            opts: {
                cwd: 'subs/PaperLetters'
            }
        }, function(error, result, code) {
            console.log(result.stdout);
            cb();
        });
    });
    //grunt.registerTask(
    //    'stylesheets',
    //    'Compiles the stylesheets.',
    //    [ 'stylus', 'autoprefixer', 'cssmin', 'clean:stylesheets' ]
    //);
    //
    //grunt.registerTask(
    //    'scripts',
    //    'Compiles the JavaScript files.',
    //    [ 'coffee', 'uglify', 'clean:scripts' ]
    //);
    //
    grunt.registerTask(
        'publish',
        'publishes the site to publish directory.',
        [ 'clean','compile-bootstrap','compile-paperletter', 'copy', 'cssmin', 'uglify' ]
    );
    grunt.registerTask(
        'debug',
        'quick publishes the site to publish directory.',
        [ 'copy', 'cssmin', 'uglify' ]
    );
    //
    //grunt.registerTask(
    //    'default',
    //    'Watches the project for changes, automatically builds them and runs a server.',
    //    [ 'build', 'connect', 'watch' ]
    //);
};