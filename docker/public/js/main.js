var socket, channel

let roomName = ''
let name = ''

var Room = {
  template: `
    <div class="room">
      <div>room : {{ roomName }}</div>

      <div class="messages">
        <div v-for="message in chatMessages" class="message">
          {{ message.user }}: {{ message.message }}
        </div>
      </div>

      <input type="text" @keyup.enter="sendMessage" v-model="message" />
      <input type="submit" @click="sendMessage" />
    </div>
  `,
  data: function() {
    return {
      chatMessages: [],
      message: ''
    }
  },
  methods: {
    onMessage (msg) {
      console.log('new message : ', msg)
      this.chatMessages.push(msg)
    },
    sendMessage () {
      this.channel.push('msg:new', {message: this.message, user: name})
      this.message = ''
    }
  },
  mounted: function(){
    let socket = new Amber.Socket("/chat")
    socket.connect()
    .then(() => {
      this.channel = socket.channel(`chat_room:${roomName}`)
      this.channel.join()
      this.channel.on('msg:new', (msg) => this.onMessage(msg))
    })
  }
}

var Rooms = {
  template: `
    <div class="rooms">
      <p> enter your name and pick a room </p>

      <input type="text" v-model="name">

      <div class="room" v-for="room in rooms" @click="joinRoom(room)">{{ room }}</div>
    </div>
  `,
  data: function() {
    return {
      rooms: ['room 1', 'room 2', 'room 3']
    }
  },
  methods: {
    joinRoom: function(room) {
      if (!name.length) return
      this.$emit('setRoom', room.replace(' ', '_'))
    }
  }
}

var app = new Vue({
  el: '#app',
  template: `
    <rooms v-bind:is="currentView" @setRoom="setRoom"></rooms>
    <room v-bind:is="currentView"></room>
  `,
  data: function() {
    return {
      roomName: null,
      currentView: 'rooms'
    }
  },
  components: {
    'rooms': Rooms,
    'room': Room
  },
  mounted: function() {
    socket = new Amber.Socket('/chat')
    socket.connect()
  },
  methods: {
    setRoom: function(name) {
      roomName = name
      this.currentView = 'room'
    }
  }
})