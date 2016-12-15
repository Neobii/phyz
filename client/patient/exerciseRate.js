Template.exerciseRate.events({
	"click [data-action='rateBad']" : function(){
		console.log(this._id);
    Meteor.call("rateExercise", this._id, "bad");
    Session.set('changingRating', false);
	},
	"click [data-action='rateNeutral']" : function(){
	  Meteor.call("rateExercise", this._id, "neutral");
	  Session.set('changingRating', false)
	},
	"click [data-action='rateGood']" : function(){
    Meteor.call("rateExercise", this._id, "good");
    Session.set('changingRating', false)
	},
	"click [data-action='changeRating']" : function(){
	Session.set('changingRating', true);
	}
});

Template.exerciseRate.showRatingBox = function(){
	return Session.get("changingRating") || !this.metrics() || !this.metrics().rating;
}