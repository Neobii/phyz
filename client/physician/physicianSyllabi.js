Template.physicianSyllabi.events({
	"click [data-action='assignSyllabusToUser']": function(e, t){
    var patientId = $(t.find("[name='selectPatient']")).val()
    var syllabusId = $(e.currentTarget).attr('data-syllabus-id');
    Meteor.call("changePatientSyllabus", patientId, syllabusId);
	}
})