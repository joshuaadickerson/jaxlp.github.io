var meetup_uri = 'https://api.meetup.com/2/events?offset=0&format=json&limited_events=False&group_urlname=LPDuvalFL&photo-host=secure&page=5&fields=&order=time&status=upcoming&desc=false&sig_id=194838484&sig=092a798571b1d02a621fe23a677b7ede0fcb6032';

$(document).ready(function() {
    $.ajax({
        url: meetup_uri,
        dataType: 'jsonp',
        jsonpCallback: 'meetupCallback'
    });
});

function meetupCallback (response) {
    var upcomingEventsDiv       = $('#upcoming-events'),
        upcomingEventTemplate   = $('#upcoming-event-content').html();

    if (response.results) {
        response.results.forEach(function (ele) {
            var time = moment(ele.time);

            var day         = time.format('DD').substr(0, 3),
                month       = time.format('MMM').substr(0, 3),
                dayOfWeek   = time.format('ddd').substr(0, 3),
                eventTime   = time.format("hh:mm a");

            if (eventTime.substr(0, 1) === '0') {
                eventTime = eventTime.substr(1);
            }

            upcomingEventsDiv.append(Mustache.render(upcomingEventTemplate, {
                event: ele,
                name: ele.name,
                description: ele.description,
                day: day,
                month: month,
                time: eventTime,
                dayOfWeek: dayOfWeek,
                isoDate: time.format('YYYY-MM-DDTHH:mm:ssZ'),
                venue: ele.venue,
                url: ele.event_url
            }))
        });
    } else {
        upcomingEventsDiv.html('No upcoming events');
    }
}
