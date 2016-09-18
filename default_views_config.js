(function ($) {
Backdrop.behaviors.default_views_config = {
  attach: function() {
    $('#edit-default-converted-result').click(function() {
     this.select();
    });
  }
}

})(jQuery);
