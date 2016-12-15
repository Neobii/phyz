Categories = new Meteor.Collection("categories");

var categories = [
 {label: "Back Aches", slug: "back-aches"},
 {label: "Leg Aches", slug: "leg-aches"},
 {label: "Finger Aches", slug: "finger-aches"}
];
// add label & slug

if(Meteor.isServer){  
  if(!Categories.findOne({})){
    categories.forEach(function(categories){
      Categories.insert({
        slug: categories.slug,
        label: categories.label
      });
    })
  }
}