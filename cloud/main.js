Parse.Cloud.job('deleteOldEvents', function(request, status) {
    var today = new Date();
    var days = 7;
    var time = (days * 24 * 3600 * 1000);
    var expirationDate = new Date(today.getTime() - (time));

    var query = new Parse.Query('Events');
        // All records starting more than 7 days ago
    query.lessThan('end_date', expirationDate);
    query.each(function(record) {
        return record.destroy({useMasterKey:true});
    },{useMasterKey:true}).then(function(result) {
        console.log("deleteOldEvents job completed.");
        status.success("deleteOldEvents job completed.");
    }, function(error) {
        alert("Error in deleteOldEvents: " + error.code + " " + error.message);
        status.error("Error in deleteOldEvents: " + error.code + " " + error.message);
    });
});
