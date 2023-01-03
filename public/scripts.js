$(document).ready(function() {
	// updateFrontPageStats();
	// setInterval(updateFrontPageStats, 2000);
	
	$("#shortenLinkButton").click(function() {
		if ($(this).text() == "Shorten!") {
			$(this).text("New link?");
			var url = $("#shortenLink").val();

			$.ajax({
				type: "POST",
				url: "/short",
				data: { url: url },
				success: function(data){
					//alert( "Data Saved: " + data);
					// alert(status);
					$("#shortenLinkCopy").val(data);
					$("#shortenLink").hide('slide', { direction: 'left' }, 1000);
					$("#shortenLinkCopy").show('slide', { direction: 'right' }, 1000);
					$("#shortenLinkCopy").select();
				},
				error: function(err) {
					alert(err.responseText);
				}
			});
			
			// $.post("/short", { url: url }, function(data, status) {
			// 	alert(status);
			// 	$("#shortenLinkCopy").val(data);
			// 	$("#shortenLink").hide('slide', { direction: 'left' }, 1000);
			// 	$("#shortenLinkCopy").show('slide', { direction: 'right' }, 1000);
			// 	$("#shortenLinkCopy").select();
			// });
		} else {
			$(this).text("Shorten!");
			
			$("#shortenLink").val("");
			$("#shortenLink").show();
			$("#shortenLinkCopy").hide();
		}
	});
});

// function updateFrontPageStats() {
// 	console.log("test");
// 	$.get("system/count.php", function(data) {
// 		data = data.split('|');
		
// 		$("#liveLinkCreated").html( updateNumber( 0, data[0] ) );
// 		$("#liveLinkClicked").html( updateNumber( 0, data[1] ) );
// 	});
// }

function updateNumber(main, plus) {
	//main = main.replace(/\,/g, '');
	main = parseInt(main) + parseInt(plus);
	
	var n = main.toString();
	
	while (true) {
		var n2 = n.replace(/(\d)(\d{3})($|,|\.)/g, '$1,$2$3');
		if (n == n2)
			break;
		
		n = n2;
	}
	
	return n;
}