// YOUR CODE HERE:

var app = {
  chosenRoom: undefined,
	rooms: [],
	messages: [],
	mostRecentID: "0",
	mostRecentTime: "",
	server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
	dataQuery: "",
	init: function() {
		$('#main').on('click', '.username', app.handleUsernameClick);
		$('#send').on('submit', app.handleSubmit);
    $('#roomSelect').change(app.switchRoom);
		app.fetch(app.server);
		setInterval(function() {
			app.fetch(app.server)
		}, 3000);
	}
};

app.send = function(message){
	$.ajax({
	  // This is the url you should use to communicate with the parse API server.
	  url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
	  type: 'POST',
	  // data: JSON.stringify(message),
	  data: message,
	  contentType: 'application/json',
	  success: function (data) {
	    console.log('chatterbox: Message sent');
	  },
	  error: function (data) {
	    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
	    console.error('chatterbox: Failed to send message', data);
	  }
	});
};

app.fetch = function(url){
	$.ajax({
	  // This is the url you should use to communicate with the parse API server.
	  url: url,
	  type: 'GET',
	  // data: JSON.stringify(message),
	  data: {order: '-createdAt', limit: 1000},
	  contentType: 'application/json',
	  success: function (data) {
	  	app.handleData(data);
	  	console.log(data);
	    console.log('chatterbox: Message found');
	  },
	  error: function (data) {
	    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
	    console.error('chatterbox: Failed to retrieve message', data);
	  }
	});
};

app.clearMessages = function() {
	$('#chats').children().remove();
};

app.renderMessage = function(message) {
  var $username = $('<div>').addClass('username').html(message.username);
  var $text = $('<div>').html(`${message.text}`);
  var $roomname = $('<div>').addClass('roomname').text(message.roomname);
  var $message = $('<div>').addClass('message').append($username, $text, $roomname);
  if (message.text !== undefined && !message.text.includes('<') ) {
    $('#chats').append($message);
  }
  if (app.chosenRoom !== undefined) { //display all messages
    $('.message').filter(function(item) {
      return $('.roomname', this).text() === app.chosenRoom
    }).show();
    $('.message').filter(function(item) {
      return $('.roomname', this).text() !== app.chosenRoom
    }).hide();
    // $('#main').append($username);
  } 
};

app.renderRoom = function(roomname) {
	var $room = $('<option>').val(roomname).text(roomname);
	$('#roomSelect').append($room);
};

app.handleUsernameClick = function(event) {
	console.log('handle username');
	event.preventDefault();
};

app.handleData = function(data) {
  if(data.results[0].objectId !== app.mostRecentID) {
  	app.clearMessages();
		app.messages = data.results;
		app.mostRecentID = data.results[0].objectId;
		app.clearMessages();
		for (var i = 0; i < app.messages.length; i++) {
			if (app.messages[i].roomname && !app.rooms.includes(app.messages[i].roomname)) {
				app.rooms.push(app.messages[i].roomname);
				app.renderRoom(app.messages[i].roomname);
			}
			app.renderMessage(app.messages[i]);
		}
	}	
};

app.handleSubmit = function(event) {
	var username = window.location.search.slice(10);
	var roomname = "lobby";
	var text = $('input[name="text"]').val();
	var message = {
		username: username,
		text: text,
		roomname: roomname
	};
	app.send(JSON.stringify(message));
  var text = $('input[name="text"]').val(""); //this erases what was previously in the input
	event.preventDefault();
};

app.switchRoom = function(event) {
  var chosenRoom = $(this).val();
  app.chosenRoom = chosenRoom;
  console.log(app.chosenRoom);
  if (chosenRoom === "All Messages") {
    console.log('got here');
    $('#chats').find('.message').show();
  } else {
    $('.message').filter(function(item) {
      return $('.roomname', this).text() === app.chosenRoom
    }).show();
    $('.message').filter(function(item) {
      return $('.roomname', this).text() !== app.chosenRoom
    }).hide();
  }
};

$('document').ready(function(){
	app.init();
});




