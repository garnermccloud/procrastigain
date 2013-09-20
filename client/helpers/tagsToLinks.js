tagsToLinks = function(tags) {
    var tagLinks = [];
     for (var i = 0; i < tags.length; i++) {
	 tagLinks[i] = tags[i].link(Router.path('taggedPostsList', {_id: tags[i]}));
	 
     }
    return tagLinks;
};
