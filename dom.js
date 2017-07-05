$(function(){
	//get json file
	$.ajax({url:'a42580.json',success:function(d){
    $('#movie').text(d.title);
	$('#pic').attr('src', d.image);
	$('#date').text(d.date.substr(0,10));
	$('#screen').text(d.screen);
	$('#runtime').text(d.runtime);
	
	//gets the rating image according to the rating
	if(d.rating === '18'){
		$('<img id="rating"></img>').attr('src', '18.png').appendTo('#rating');
	}else {
		$('#rating').text(d.rating);
	}
	
    var t = $('<table/>').appendTo('#theatre');
    // The row loop - each step in this loop deals with one row of the
    // table and one row of the table
    
	for(var i=0;i<d.rowLabels.length;i++){
      // Create a table row
      var tr = $('<tr/>')
        .append($('<th/>',{text:d.rowLabels[i]}))
        .appendTo(t);
      // This sample program deals with the first two seats
		var k =1;		
		for(var j=0; j< d.umap[i].length ;j++){		
		  
		  // umap indicates if the seat is used
		  // X indicates taken by someone else
		  // O indicates available
		  // M indicates my seat
		  // space indicates no seat
		  var u0 = d.umap[i].charAt(j);
		  // tmap indicates the type of seat
		  // L or R for left or right sofa, A for armchair, space for none
		  var td = $('<td/>');		  		  
		  
		  var t0 = d.tmap[i].charAt(j);
		  if (t0==='L')
			td.addClass('left-sofa');			
		  if (t0==='R') 
			td.addClass('right-sofa');		  
		  if (t0==='A')
			td.addClass('armchair');		  
		
		if (u0==='X')
			td.addClass('taken');
		  if (u0==='O')
			td.addClass('free');
		  if (u0==='M')
			td.addClass('mine');
		
		
		// adding seat number to seats that are not empty
				
		if (t0!==' ') {
		var seatno = d.rowLabels[i].substr(1,2) + k;
		td.text(k);
		td.attr('id' , seatno);
		k++;
		}
		tr.append(td);				
		}
    }

    // Removes all classes "mine" and seat list when the dropdown clicked 	
	$('#select').click(function(){
		$(".mine").addClass('free');
		$(".mine").removeClass('mine');	
		$('#bookingSummary ul').remove();		
		//resets the seat number counter
		if(parseInt($('#select').val())=== 1) {
			$('#seatcount').text("Please select " + parseInt($('#select').val()) + " seat to continue.");
		}else {
			$('#seatcount').text("Please select " + parseInt($('#select').val()) + " more seats to continue.");
		}
	});
	//shows the total price according to the selected amount		
	//changes the total price according to the selected amount	
	//adds and removed classes to selected seats	
    $('td').click(function(){
	//seat count
	var booked = $('.mine').length;
	if($(this).hasClass('free') && booked<$('#select').val()) {
		$(this).addClass('mine');
		$(this).removeClass('free');
	}else {
		if($(this).hasClass('mine')) {
			$(this).addClass('free');
			$(this).removeClass('mine');
		}	
	
	}
	//calculate price by checking what type and how many seats beeen selected.
	var price = 0;
	price = (($('.armchair.mine').length) * 15) + (($('.right-sofa.mine').length) * 11) + (($('.left-sofa.mine').length) * 11);
	if ($('#total').text() !== "") {
		$('#total').text('');
				
	}
	$('#total').append('&pound;' + price);	
	//lists the selected seats	
	var selected= $('.mine').map(function(){return $(this).attr('id');} );
	var ul = $('<ul/>');
	for(var i=0;i<selected.length;i++){
	  ul.append($('<li/>', {text:selected[i]}));	  
	}
	$('#bookingSummary ul').remove();
	$('#bookingSummary').append(ul);
	//allows or disables the buy now button for check out
	if ($('.mine').length===parseInt($('#select').val())){
		$('#buy').removeClass('disabled');
	}else {
		$('#buy').addClass('disabled');
	}
	//updates how many tickets needs to be selected
	if ($('.mine').length === parseInt($('#select').val())){
		$('#seatcount').text('Please click Buy Now to continue.');
	}else {
		var sno = (parseInt($('#select').val()) - $('.mine').length);
		if(sno === 1) {
			$('#seatcount').text('Please select ' + sno + ' seat to continue.');
		}
		else {
			$('#seatcount').text('Please select ' + sno + ' more seats to continue.');
		}
	}
    });
	
	
	
		
  }})
});
