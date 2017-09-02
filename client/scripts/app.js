// YOUR CODE HERE:
var app = {};
var rooms = [];
app.init = function () {

};

var latestDate = "";

app.send = function (message) {
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

app.fetch = function (url) {
  $.ajax({
    url: url,
    type: 'GET',
    // data: 'order=-createdAt',
    data: {'order':'-createdAt','limit':'1000'},
    contentType: 'application/json',
    // credentials: 'include',
    success: function (data) {
      console.log(data);
      app.handleData(data);
      
      console.log('chatterbox: Message found');
    },
    error: function () {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to find message', data);
    }
  });
};

app.clearMessages = function () {
  $('#chats').html('');
};

app.renderMessage = function (message) {
  // var $username = $('<div>').addClass('username').html(JSON.stringify(message.username));
  // var $text = $('<div>').addClass('text').html(JSON.stringify(message.text));
  // var $roomName = $('<div>').addClass('roomname').html(JSON.stringify(message.roomname));
  var $username = $('<div>').addClass('username').html(JSON.stringify(`${message.username}`));
  var $text = $('<div>').addClass('text').html(JSON.stringify(`${message.text}`));
  var $roomName = $('<div>').addClass('roomname').html(JSON.stringify(`${message.roomname}`));
  var $message = $('<div>').addClass('messageComponent');
  $message.prepend($username, $text, $roomName);
  // $message.prepend($username);
  
  if (!rooms.includes(message.roomname)) {
  	if (message.roomname !== undefined && message.roomname !== "") {
  		rooms.push(message.roomname);
  		$('.dropdown-content').append($('<a href="#">')).html(JSON.stringify(message.roomname));
  	}
  }
  $('#chats').append($message);
  // $('#main').prepend($username); 
};

app.renderRoom = function (roomName) {
  $('#roomSelect').prepend('<div>roomName</div>');
};



app.handleUsernameClick = function () {
  // $('#chats').on("click", ".username", function() {
    
  // });
};

app.handleSubmit = function() {
  // Take message from input box
  // Call app.send
  
};

app.handleData = function(data) {
  var messageArr = data.results; //array of messages
  //break down into each message
  for (var i = 0; i < messageArr.length; i++) {
    //call renderMessage on each one
    app.renderMessage(messageArr[i]);
    // if (i === messageArr.length - 1) {
    // 	console.log(messageArr[i].createdAt)
    // }
  }

};

$(document).ready(function() {
    
  $('#main').on('click', '.username', app.handleUsernameClick);
  $('#main').on('click', '.username', function() {
    app.handleUsernameClick();
    //console.log('got here');
  });


  $('#send').on('submit', '.submit', function() {
    app.handleSubmit();
    console.log('got here');
  });
  // app.fetch('http://parse.sfm6.hackreactor.com/', app.renderMessage);
  

  
  // $(window).load(function() {
  //   setInterval(function() {
  //     app.fetch('http://parse.sfm6.hackreactor.com/chatterbox/classes/messages');
  //   }, 5000);
  // });



var message = {
          username: 'Tiffany',
          text: 'did it work?',
          roomname: 'blah'
        };
  
  // app.send(message);
  app.fetch('http://parse.sfm6.hackreactor.com/chatterbox/classes/messages');
  // var message = {
  //         username: 'Mel Brooks',
  //         text: 'It\'s good to be the king',
  //         roomname: 'lobby'
  //       };
  // app.send(JSON.stringify(message));
});
console.log(rooms);

