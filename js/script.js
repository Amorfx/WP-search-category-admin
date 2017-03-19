(function( $ ){
    $(document).ready(function(){
        adminSearch.init();
    });
    var adminSearch = {
        getNameSearchField: function(){
            return 'wpsca-search-field';
        },
        getNameSearchButton: function(){
            return 'wpsca-search-button';
        },
        init : function(){
            var globalObject = this;

            $.expr[':'].Contains = function(a, i, m) {
                return $(a).text().toUpperCase()
                        .indexOf(m[3].toUpperCase()) >= 0;
            };

            var nameSearchField = this.getNameSearchField();
            var nameButtonGo = this.getNameSearchButton();

            var search_box = '<input type="text" name="'+ nameSearchField +'" id="'+ nameSearchField +'" class="meta-box-search-field" placeholder="Recherche" />';

            $('#category-tabs').before(search_box);

            globalObject.initSearch('autocomplete', $('#'+nameSearchField));
        },

        initSearch: function(method, element){
            switch(method){
                case 'click':
                    this.initClick(element);
                    break;
                case 'autocomplete':
                    this.initAutocomplete(element);
                    break;
            }
        },

        initClick: function(element){
            var that = this;
            var nameField = this.getNameSearchField();

            $('body').on('click', '#'+element.attr('id'), function(e){
                e.preventDefault();
                var $el = $(this);
                var s = $el.siblings('#'+nameField).val();
                that.searchCat(s, $el);
            });
        },

        initAutocomplete: function(element){
            var that = this;
            element.keyup($.debounce(500, function(){
                var s = $(this).val();
                that.searchCat(s, element);
            }));
        },

        searchCat: function(s, elementEvent){
            if ( $.trim(s) == "" ){
                elementEvent.parents('.categorydiv').first().find('.categorychecklist li').show();
            }
            else
            {
                var result = elementEvent.parents('.categorydiv').first().find('.categorychecklist li:Contains("'+s+'")');

                elementEvent.parents('.categorydiv').first().find('.categorychecklist li').hide();
                result.each(function(){
                    $(this).show();
                });
            }
        }


    };
})( jQuery );