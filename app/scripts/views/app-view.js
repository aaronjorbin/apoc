var ApocAppView = Backbone.View.extend({
    el : $('body'),
    rowTemplate: _.template( $('#rowTemplate').html() ),
    tableheadTemplate: _.template( $('#tabaleheadTemplate').html() ),
    events: {
        "keypress #inputcolor" : "createOnEnter" 
    },
    initialize: function() {
        this.input = this.$('#inputcolor')
        this.listenTo(Apocs, 'add', this.render)

    },
    render: function(){
        var html = []
            , row = this.rowTemplate
        html.push('<table>')
        html.push(this.tableheadTemplate({ colors: Apocs.pluck('inputColor') }) )
        Apocs.each( function(acolor){
            var l = acolor.get('lumiance')
                , inputColor = acolor.get('inputColor')
                , r = []
                , contrasts = []
                , al
                , grade

            Apocs.each( function(a,b,c){
                al = a.get('lumiance')
                contrasts = []
                contrasts.push( (al + 0.05) / (l + 0.05) )
                contrasts.push( (l + 0.05) / (al + 0.05) )

                var c = contrasts[0],
                    d = contrasts[1] 
                if ( a.get('inputColor') === acolor.get('inputColor') )
                    grade = '&nbsp;'
                else if (c < 3 && d <3  )
                    grade = 'fail'
                else if (c < 4.5 && d < 4.5)
                    grade = 'aa-large'
                else if (c < 7 && d < 7)
                    grade ='aa'
                else 
                    grade ='aaa'

                r.push({  
                    color: a.get('inputColor'),
                    contrast: contrasts ,
                    grade:  grade 
                })
            })

            if (! _.isEmpty(r) ) {
                html.push( row({
                    thiscolor: acolor.get('inputColor'),
                    text: acolor.get('textColor'),
                    othercolors: r
                }))
            }
        })
        html.push('</table>')

        $('#apoc').html(html.join(''))
    },
    createOnEnter: function(e){
        if (e.keyCode != 13) return

        Apocs.create({ inputColor: this.input.val() })
        this.input.val('')
        e.preventDefault()
    }


})
