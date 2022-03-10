'use strict';

module.exports = function(grunt) {
    
    require('time-grunt')(grunt);

    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'});

    grunt.initConfig({
            sass: {
                dist: {
                    files: {'css/styles.css': 'css/stles.scss'}
                }
            },
            watch: {
                files: 'css/*.scss',
                tasks: ['sass']
            },
            browserSync: {
                dev: {
                    bsFiles: {
                        src: ['css/*.css', '*html', 'js/*.js']
                        },
                    options: {
                        watchTask: true,
                        server: { baseDir: './' }
                        }
                    }
                },
        copy: {
            html: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            },
            fonts: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'node_modules/font-awesome',
                    src: ['fonts/*.*'],
                    dest: 'dist'
                }]
            }
        },
        clean: {
            build: {
                src: ['dist/']
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: ['img/*.{png,jpg,gif,img,jpeg}'],
                    dest: 'dist'
                }]
            }
        },
        useminPrepare: {
            foo: {
                dest: 'dist',
                src: ['contact.html', 'About Us', 'index.html'],
                options: {
                    flow: {
                        steps: {
                            css: ['cssmin'],
                            js: ['uglify'],
                            post: {
                                css: [{
                                    name: 'cssmin',
                                    createConfig: function(context, block) {
                                        var generated = context.options.generated;
                                        generated.options = {
                                            keepSpecialComments: 0, rebase: false
                                        };
                                    }
                                }]
                            }
                        }
                    }
                }
            }
        },
        concat: {
            options: {
                seperator: ';'
            },
            dist: {}
        },
            uglify: {
                dist: {}
            },
            cssmin: {
            dist: {}
            },

            //Filrev adds additional extension t the main name so that a new version of website, a browser may download all new current versions for your page.
            //It means file revision.
            filrev: {
                options: {
                    encoding: 'utf8',
                    algorithm: 'md5',
                    lenght: 20
                },
                release: {
                    files: [{
                        src: ['dist/js/*.js', 'dist/css/*.css']
                    }]
                },
                usemin: {
                    html: ['dist/contact.html', 'dist/About Us', 'dist/index.html'],
                    options: {
                        assetsDirs: ['dist', 'dist/css', 'dist/js']
                    }
                },
                htmlmin: {
                    dist: {
                        options: {
                            collapseWhitespace: true
                        },
                        files: {
                                'dist/index.html': 'dist/index.html',
                                'dist/contact.html': 'dist/contact.html',
                                'dist/About Us.html': 'dist/About Us'
                        }
                    }
                }
            }
    });
    //Executing scss task into css...
    grunt.registerTask('css',['sass']);
    
    //Executing browserSync & watch grunt...
    grunt.registerTask('default', ['browserSync', 'watch']);

    //Executing clean,s copy, imagemin & fonts...s
    grunt.registerTask('build',[
        'clean', 'copy', 'imagemin', 'usemin', "concat", 'cssmin', 'uglify', 'filerev', 'usemin', 'htmlmin'
    ]);
}