Template.adminCategories.events({
  "click [data-action='add-category']" : function(e, t){
    e.preventDefault();
    var newCategory = {};
    newCategory.label = $("[name='categoryLabel']").val();
    newCategory.slug = App.convertToSlug(newCategory.label);
    Categories.insert(newCategory);
    $("[name='categoryLabel']").val('');
  }
});

Template.categoryListComp.events({
  'click [data-action="update-category"]': function(e, t){
    e.preventDefault();
    var updateLabel = $(t.find("[name='categoryLabel']")).val();
    Categories.update({_id: Session.get("adminEditingCategory")},
        {$set: {
            label: $(t.find("[name='categoryLabel']")).val(),
            slug: App.convertToSlug(updateLabel)
        }});
    Session.set("adminEditingCategory", false);
  },
  "click [data-action='cancel-category']" : function(e, t){
    e.preventDefault();
    Session.set("adminEditingCategory", false)
  },
    "click [data-action='delete-category']" : function(e, t){
    e.preventDefault();
    console.log($(e.currentTarget).attr("data-target-id"));
    Categories.remove({_id: $(e.currentTarget).attr("data-target-id")});
  },
  "click [data-action='edit-category']" : function(e, t){
    e.preventDefault();
    Session.set("adminEditingCategory", $(e.currentTarget).attr("data-target-id"))
  }
})