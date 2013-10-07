var app = app || {}
app.ApocList = Backbone.Collection.extend({
    model: app.apoc,
    localStorage: new Backbone.LocalStorage('apoc'),
})
var Apocs = new app.ApocList
