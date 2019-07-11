/*
This script allows for hiding content until a specified time has passed.
To do this, simply add the class "visible-after" to the element, and add
the custom "data-visible-after" attribute to the element as well which
should be equal to the timestamp on or after which that element should be
visible.  For example:

<div class="visible-after" data-visible-after="2019070917">
	...
</div>

this element would be visible only starting at 5PM on 7/9/19.

This script also allows marking elements as "TA only".  This means the
elements will only be visible if the ta query param is present in the URL.
For instance, index.html will not show the elements, but index.html?ta will.

In TA mode, all elements, even ones which are not supposed to be visible
until later, are visible.
*/
$(document).ready(function(){
	const urlParams = new URLSearchParams(window.location.search);
	const isTAMode = urlParams.get('ta');

	// If the URL param is included, it will be a string (maybe empty)
	if (isTAMode == null) {
		// only show certain content if they should be released
		$(".visible-after").each(function(i) {
		    var dateStr = $(this).attr("data-visible-after");
		    var releaseDate = moment(dateStr, "YYYYMMDDHH");
		    if (!releaseDate.isSameOrBefore(moment())) {
		    	$(this).remove();
		    	console.log(this);
		    }
		});
	}

	// Remove any ta-only elements
	$(".ta-only").each(function(i) {
	    if (isTAMode == null) {
	    	$(this).remove();
	    }
	});
});