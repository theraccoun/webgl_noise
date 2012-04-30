$(function() {
  $(".collapsible-header").click(function() {
    $(this).toggleClass('open');
    $(this).siblings('.collapsible-content').slideToggle();
  })
});
