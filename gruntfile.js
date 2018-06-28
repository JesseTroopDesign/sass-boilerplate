// Load Grunt
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: { // Compile everything into one task with Watch Plugin
            css: {
                files: ['sass/*.scss'],
                tasks: ['sass', 'ftp_push', 'cssmin']
            },
            js: {
                files: ['src/*.js'],
                tasks: ['uglify', 'ftp_push']
            }
        },
        // Tasks
        sass: { // Begin Sass Plugin
            dist: {
                options: {
                    sourcemap: 'none'
                },
                files: [{
                    expand: true,
                    cwd: 'sass',
                    src: ['**/*.scss'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },
        cssmin: { // Begin CSS Minify Plugin
            options: {
                keepSpecialComments: '*'
            },
            target: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.css', '/'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },
        uglify: { // Begin JS Uglify Plugin
            build: {
                src: ['src/*.js'],
                dest: 'js/script.min.js'
            }
        },
        ftp_push: {
            your_target: {
                options: {
                    username: "user",
                    password: "password",
                    host: "server.com",
                    dest: "/root/wp-content/themes/theme/",
                    port: 21
                },
                files: [
                    {
                        expand: true,
                        cwd: '.',
                        src: [
                            "css/style.css",
                            "js/script.min.js"
                        ]
                    }
                ]
            }
        }

    });

    // Load Grunt plugins
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ftp-push');


    // Register Grunt tasks
    grunt.registerTask('default', ['watch']);
};