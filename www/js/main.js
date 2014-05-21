require.config({
   baseUrl: 'js/lib'
});

require(['jquery.min', 'howler.min', 'glowbox'], 
    function ($, howler, Glowbox) {
        Glowbox.bindCanvas('canvas');
        Glowbox.bindPlay('play');
        Glowbox.bindStop('stop');
        Glowbox.play();
    }
);


