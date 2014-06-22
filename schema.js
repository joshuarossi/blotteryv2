/**
 * Created by josh on 6/21/14.
 */
SimpleSchema.debug = true;
Schema = {};

//Schema.UserCountry = new SimpleSchema({
//    name: {
//        type: String
//    },
//    code: {
//        type: String,
//        regEx: /^[A-Z]{2}$/
//    }
//});

Schema.UserProfile = new SimpleSchema({
    firstName: {
        type: String,
        regEx: /^[a-zA-Z-]{2,25}$/,
        optional: true
    },
    lastName: {
        type: String,
        regEx: /^[a-zA-Z]{2,25}$/,
        optional: true
    },
    birthday: {
        type: Date,
        optional: true
    },
    gender: {
        type: String,
        allowedValues: ['Male', 'Female'],
        optional: true
    },
    website: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        optional: true
    },
    bio: {
        type: String,
        optional: true
    },
//    country: {
//        type: Schema.UserCountry,
//        optional: true
//    },
    withdrawal_address: {
        type: String,
        optional: true
    },
    bitcoin_address: {
        type: String,
        optional: true
    },
    bitcoin_balance: {
        type: Number,
        optional: true
    }
});

Schema.User = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    username: {
        type: String,
        regEx: /^[a-z0-9A-Z_]{3,15}$/
    },
    emails: {
        type: [Object]
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date,
        optional: true
    },
    modifiedAt: {
        type: Date,
        optional: true
    },
    profile: {
        type: Schema.UserProfile,
        optional: true,
        blackbox: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    }
});

UI.registerHelper("Schema", Schema.User);
Meteor.users.attachSchema(Schema.User);
