var SimplePeer = require('simple-peer')
var wrtc = require('electron-webrtc')()
var signalhub = require('signalhub')
var swarm = require('webrtc-swarm')
var swarmhub = require('swarmhub')

var hub = signalhub('swarm', ['https://peercat-signalhub.herokuapp.com'])
var hub1 = swarmhub(swarm(hub, { wrtc: wrtc }))
var hub2 = swarmhub(swarm(hub, { wrtc: wrtc }))

// this is not yet work, perhaps its electron-webrtc not allow two instance?
hub1.subscribe('/my-channel')
    .on('data', function (message) {
      console.log('hub 1 got a message:', message)
    })

hub2.dataSwarm.on('peer', function (peer, id) {
  console.log("hub2 broadcast");
  hub2.broadcast('/my-channel', { hello: 'world' })
})
