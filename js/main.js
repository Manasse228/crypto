$( document ).ready(function() {

    $('#tblremotelazy').puidatatable({
        lazy: true,
        caption: 'Remote Restful Webservice - Lazy',
        paginator: {
            rows: 25,
            totalRecords: 200
        },
        columns: [
            {field: 'name', headerText: 'Name', sortable: true, filter: true},
            {field: 'symbol', headerText: 'Symbol', sortable: true, filter: true},
            {field: 'rank', headerText: 'Rank'},
            {field: 'price_usd', headerText: 'Price'},
            {field: 'available_supply', headerText: 'AS'},
            {field: 'total_supply', headerText: 'TS'},
            {field: 'max_supply', headerText: 'MS'}
        ],
        datasource: function(callback, ui) {
            var uri = 'resource/json/test.json';
            if (ui.sortField) {
                uri += '/' + ui.sortField + '/' + ui.sortOrder;
            }

            $.ajax({
                type: "GET",
                url: uri,
                dataType: "json",
                context: this,
                success: function(response) {
                    //imitate lazy loading by slicing a new list from whole data,
                    // in real application the response should actually contain just the new chunk
                    callback.call(this, response.slice(ui.first, ui.first + 10));
                }
            });
        }
    });


});