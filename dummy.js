const api = require('etherpad-lite-client');
const etherpad = api.connect({
  apikey: '2eebd85eb81f5bf82a08b79446c915832a19f980a4b00bcfe36ba2c710095ceb',
  host: 'localhost',
  port: 9001,
})
// new pad name
var randomPadName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

		// new pad author
		var userName = 'Luca' // user name
		var userID = 110; // user id (by my platform)
		var args ={
			"name": userName,
			"authorMapper": userID
		}
		etherpad.createAuthorIfNotExistsFor(args, function(error, data) {
		if(error){
			console.error('Error: ' + error)
		}else{
			console.log('createAuthorIfNotExistsFor success:')
			var authorID = data.authorID // author id generated by etherpad

			// new group for new author
			const args ={
				"groupMapper": userID
			}
			etherpad.createGroupIfNotExistsFor(args, function(error, data) {
			if(error){
				console.error('Error: ' + error)
			}else{
				console.log('createGroupIfNotExistsFor success:')

				// new pad for the group
				var groupID = data.groupID
				var args ={
					"groupID": groupID, //
					"padName": randomPadName,
					"text": ['prova'] // default text for the pad
				}
				etherpad.createGroupPad(args, function(error, data) {
					if(error){
						console.error('createGroupPad error: ')
						console.log(error)
					}else{
						console.log('createGroupPad success:')
						console.log(data)
					}
				})
				// new session
				var args ={
					"groupID": groupID,
					"authorID": authorID,
					"validUntil": 1702999999
				}
				etherpad.createSession(args, function(error, data) {
					if(error){
						console.error('createSession error: ')
						console.log(error)
					}else{
						console.log('createSession success:', data)

						// javascript cookie with the sessionID
						//document.cookie = 'sessionID =' + data.sessionID;

						// oper the pad on screen
						// I don't understand what is the src url I can use for the iFrame
						//$('#mainEditor').html('<iframe name="embed_readwrite" src="#######" width="80%" height="600" frameborder="0"></iframe>');
					}

				})
			}
		})
	}
})
