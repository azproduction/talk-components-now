setTimeout(function () {
    // Require all ui modules matches that RegExp
    require.match(/^ui/);

    // Init all HTML Elements
    require('decl').apply();
}, 0);
