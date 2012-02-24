/*
 * Hojoki API example for:  /activities/push
 * Contact adam@hojoki.com to get an API token
 * We use kind of a "manual OAuth 2" process up to now ;)
 */

// Minimal API client
function APIClient(token) {
    return {
        activities: {
            push: function(activity) {
                jQuery.ajax('https://api.hojoki.com/v1/activities/push', {
                    type: 'POST', headers: { Authorization: "Bearer " + token }, data: { activity: JSON.stringify(activity) }
                });
            }
        }
    };
};

var apiClient = new APIClient("<token>");
apiClient.activities.push({
    // optional: you can set the actor of the activity, this is an email address
    // if you don't set it, Hojoki will show "someone"
    actor: { email: "actor@myapp.com" },

    // required: the activity's verb, only valid value is "save" up to now
    // we will expand the catalogue of supported values soon
    verb: "save",

    // optional: a published time stamp
    // if not set, Hojoki will use the timestamp of your API call
    published: "2012-02-16T11:41:19.632+01:00",

    // now, let's tell Hojoki about the activity's object
    object: {
        // required: the type of the object, only valid value is "Status"
        // we will expand the catalogue of supported values soon
        type: "Status",

        // optional: an id of the object to track multiple activities of the same object
        // Hojoki will provide some nice search and filtering if you provide this id (e.g. object history)
        id: "fixID",

        // required: the content of the object (here: a Status update)
        content: "Hello Hojoki! With one inline hashtag: #test",

        // optional: a collection of tags for an object; improves searching and filtering in Hojoki
        tags: ["tag1", "tag2"],

        // optional: a list of recipients for this object, e.g. if someone is mentioned in the status update
        // e.g. Hojoki uses this attribute for tasks (who has to do it)?
        recipients: [{ email: "recipient@myapp.com" }]
    }
});