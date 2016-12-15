Template.AssignedExercise.activeVideo = function(){
    if(!this.vimeo){
        if(!this.vimeoId){
            return false;
        }
        this.vimeo = new Vimeo([
            this.vimeoId
        ]);
    }
    return this.vimeo.getVideos()[0];
}