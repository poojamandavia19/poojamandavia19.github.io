<!DOCTYPE html>
<html>
    <head>
        <script src="https://code.jquery.com/jquery-1.12.2.min.js"></script>
        <script src="airtable.browser.js"></script>
    </head>
    <body>
        <h1>Artists</h1>
        <div id="artists"></div>

        <hr/>
        <button id='create'>Create</button>
        <div id="created"></div>
    </body>


    <script>
var Airtable = require('airtable');
// Get a base ID for an instance of art gallery example
var base = new Airtable({ apiKey: 'FILL_OUT_API_KEY' }).base('FILL_OUT_BASE_ID');

var deleteArtist = function(record) {
    record.destroy(function(err) {
        if (err) {
            console.log('Error destroying ', recordId, err);
        } else {
            console.log('Destroyed ', record.getId());
            $('div[data-record-id="'+record.getId()+'"]').remove();
        }
    });
};

var loadArtists = function() {
    $('#artists').empty();

    base('Artists').select({
        sort: [
            {field: 'Name', direction: 'asc'}
        ]
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            console.log('Retrieved ', record.get('Name'));

            var $artistInfo = $('<div>');
            $artistInfo.append($('<h3>').text(record.get('Name')));
            $artistInfo.append($('<div>').text(record.get('Bio')));
            var x = $('<button>').text('Delete').click(function() {
                deleteArtist(record);
            });
            $artistInfo.append(x)
            $artistInfo.attr('data-record-id', record.getId());

            $('#artists').append($artistInfo);
        });

        fetchNextPage();
    }, function done(error) {
        console.log(error);
    });
};

$('#create').click(function(){
    base('Artists').create({
        "Name": "Al Held",
        "Bio": "Al Held began his painting career by exhibiting Abstract Expressionist works in New York; he later turned to hard-edged geometric paintings that were ...",
        "Genre": [
            "American Abstract Expressionism",
            "Color Field"
        ],
        "On Display?": true
    }, function(err, record) {
        if (err) { console.log(err); return; }
        loadArtists();
    });
});

loadArtists();

</script>
</html>