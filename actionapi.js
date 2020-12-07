const api = require('etherpad-lite-client');
const etherpad = api.connect({
  apikey: 'long api key fro APIKEY of etherpad lite',
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
					"text": ['Bharath Naik is legend'] // default text for the pad
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
					"validUntil": Math.floor(new Date().getTime()/1000.0) +(60*5)
				}
				etherpad.createSession(args, function(error, data) {
					if(error){
						console.error('createSession error: ')
						console.log(error)
					}else{
						console.log('createSession success:', data)
						}

				})
			}
		})
	}
})
