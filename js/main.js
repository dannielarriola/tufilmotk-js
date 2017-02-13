$.get('movies.json', function (data) {
    $('.buscar').show();
    $('.preloader').hide();
    $("#buscar").keyup(function () {
        var result = [];
        var searchtxt = $('#buscar').val().toLowerCase();
        if (searchtxt.length > 2) {
            var count = 1;
            _.forEach(data, function (item) {
                if (count <= 50) {
                    if (item.title.toLowerCase().indexOf(searchtxt) !== -1 ||
                        item.title_english.toLowerCase().indexOf(searchtxt) !== -1 ||
                        item.title_long.toLowerCase().indexOf(searchtxt) !== -1 ||
                        item.imdb_code.toLowerCase().indexOf(searchtxt) !== -1 ||
                        item.title_english.toLowerCase().indexOf(searchtxt) !== -1 ||
                        item.year.toString() == searchtxt
                    ) {
                        result.push(item);
                        showResults(result);
                        count++;
                    }
                } else {
                    return false;
                }

            });
        }
    });
})


var showResults = function (result) {
    $("#resultados").html('');
    for (var i in result) {
        var template = "<div class='col s12 m3'> \
                <div class='card'> \
                    <div class='card-image'> \
                    <img src='"+ result[i].medium_cover_image + "' class='tooltipped' data-position='right' data-delay='50' data-tooltip='" + result[i].title_long + "'> \
                        <a class='btn-floating dropdown-button halfway-fab waves-effect waves-light red' data-activates='torrents"+ result[i].id + "'><i class='material-icons'>add</i></a> \
                        <ul id='torrents"+ result[i].id + "' class='dropdown-content'>";

        for (var j in result[i].torrents) {
            template += "<li><a href='" + result[i].torrents[j].url + "'>Torrent " + result[i].torrents[j].quality + "</a></li>";
            template += "<li><a href='magnet:?xt=urn:btih:" + result[i].torrents[j].hash + "&dn=" + result[i].title + "'>Magnet " + result[i].torrents[j].quality + "</a></li>";
        }
        template += "<li><a href='//www.yifysubtitles.com/movie-imdb/" + result[i].imdb_code + "' target='_blank'>Subtitulos</a></li>";
        template += "</ul></div> \
                    <span class='card-title titulo'>"+ result[i].title.substring(0, 20) + "</span> \
                    <div class='card-content'> \
                    </div> \
                </div></div>";
        $("#resultados").append(template);
    }

    $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrainWidth: false, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'right', // Displays dropdown with edge aligned to the left of button
        stopPropagation: false // Stops event propagation
    }
    );
    $('.tooltipped').tooltip({ delay: 50 });
}