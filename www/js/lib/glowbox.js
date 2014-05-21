define(function () {

    // Private scope
    var soundMatrix = new Array(5),
        samples = new Array(5),
        canvas,
        ctx,
        playInterval = -1,
        bmp = 180,
        timeout = Math.round((60000 / bmp) / 4),
        index = 0;

    function _bindCanvas(id) {
        ctx = $('#' + id)[0].getContext('2d');
        setInterval (_render, 15);
        console.log("Canvas bind");
        for (var i = 0; i < 5; i++) {
            soundMatrix[i] = new Array(16);
            for (var j = 0; j < 16; j++) {
                soundMatrix[i][j] = false;
            }
        }

        soundMatrix = 
            [[true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],
            [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
            [true, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]];

        $('#' + id).click(_changeSquare);

        samples[0] = new Howl({ urls: ['./samples/hihat.mp3']});
        samples[1] = new Howl({ urls: ['./samples/snare.mp3']});
        samples[2] = new Howl({ urls: ['./samples/bassdrum.mp3']});
        samples[3] = new Howl({ urls: ['./samples/hihat.mp3']});
        samples[4] = new Howl({ urls: ['./samples/hihat.mp3']});
    }

    function _bindPlay (id) {
        $('#' + id).click(_play);

    }

    function _bindStop (id) {
        $('#' + id).click(_stop);

    }

    function _playColumn () {
        index = (index + 1) % 16;
        for (var i = 0; i < 5; i++)
            if (soundMatrix[i][index])
                samples[i].play();
    }

    function _play() {
        if (playInterval === -1)
            playInterval = setInterval(_playColumn, timeout);
    }

    function _stop() {
        clearInterval(playInterval);   
        playInterval = -1;
    }

    function _render () {
        var wStep = 960 / 16,
            hStep = 520 / 5;
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 16; j++) {

                // Si es bloque música y j == index -> Random
                // Si es bloque música y j =! index -> Blanco
                // Si j == index
                // Si no, negro
                if (soundMatrix[i][j] && (j === index))
                    ctx.fillStyle = '#' + Math.floor(Math.random * 16777215).toString(16);
                else if (soundMatrix[i][j] && (j!==index))
                   ctx.fillStyle = '#FFFFFF';
                else if (j === index && playInterval !== -1)
                    ctx.fillStyle = '#222222';
                else
                    ctx.fillStyle = '#000000';

                ctx.fillRect(j* wStep, i * hStep, wStep, hStep);
            }
        }

    }

    function _setBmp (newBmp) {
        _stop();

        bmp = newBmp;
        timeout = Math.round(60000 / bmp);

        _play();

    }

    function _changeSquare (e) {

        var x = e.originalEvent.offsetX,
            y = e.originalEvent.offsetY,
            wStep = 960 / 16,
            hStep = 520 / 5,
            squareX = (x - (x % wStep)) / wStep,
            squareY = (y - (y % hStep)) / hStep;

        soundMatrix[squareY][squareX] = !soundMatrix[squareY][squareX];
    }

    // Public API
    return {
        bindCanvas: _bindCanvas,
        bindPlay: _bindPlay,
        bindStop: _bindStop,
        play: _play,
        stop: _stop,
        changeSquare: _changeSquare,
        setBmp: _setBmp
    }; 
});
