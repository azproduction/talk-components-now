'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        lmd: {
            example: 'example'
        },
        autoprefixer: {
            example: {
                src: 'index.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-lmd');
    grunt.loadNpmTasks('grunt-autoprefixer');

    grunt.registerTask('example', ['lmd', 'autoprefixer']);
};
