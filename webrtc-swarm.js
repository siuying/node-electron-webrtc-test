var SimplePeer = require('simple-peer')
var wrtc = require('electron-webrtc')()
var signalhub = require('signalhub')
var swarm = require('webrtc-swarm')
var swarmhub = require('swarmhub')

var hub = signalhub('swarm', ['https://peercat-signalhub.herokuapp.com'])
var swarm1 = swarm(hub, { wrtc: wrtc })
var swarm2 = swarm(hub, { wrtc: wrtc })

swarm1.on('peer', function (peer, id) {
  console.log('connected to a new peer:', id)
  console.log('total peers:', swarm1.peers.length)
});

swarm2.on('peer', function (peer, id) {
  console.log('connected to a new peer:', id)
  console.log('total peers:', swarm2.peers.length)
});

var swarm3
setTimeout(() => {
  swarm3 = swarm(hub, { wrtc: wrtc });
}, 5000)
