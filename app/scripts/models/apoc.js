var app = app || {}

    app.apoc = Backbone.Model.extend({
        defaults: function(){
            return {
                inputColor: '', // This is what we are assin
                rgba: [],
                lumiance: 0,
                textColor: '#000',
                relationships: []
            }
        },
        initialize: function(){
            this.set('rgba', parseCSSColor(this.get('inputColor') ) )
            if ( this.get('rgba') === null){ //Check to See if we are actually color
                this.clear()
            } else {
                this.set('lumiance', this.lumiance() )
                this.set('textColor', this.fontColor() )
            }
        },
        fontColor: function(){
            return (this.get('lumiance') < 0.5 ) ? '#fff' : '#000'
        },
        lumiance: function() {
            var r = this.get('rgba')[0]
                , g = this.get('rgba')[1]
                , b = this.get('rgba')[2]

            // http://stackoverflow.com/questions/9733288/how-to-programmatically-calculate-the-contrast-ratio-between-two-colors
            var a = [r,g,b].map(function(v) {
                v /= 255
                return (v <= 0.03928) ?
                    v / 12.92 :
                    Math.pow( ((v+0.055)/1.055), 2.4 )
            })
            return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
        },
        suicide: function() {
        }

})
