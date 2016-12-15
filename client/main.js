App = {};
App.convertToSlug = function(text)
{
  return text
    .toLowerCase()
    .replace(/ /g,'-')
    .replace(/[^\w-]+/g,'')
    ;
}
App.prettifyDate = function(timestamp){
  if(!timestamp){
    return "";
  }
  return moment(timestamp).calendar();
}