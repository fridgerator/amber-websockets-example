var socket, channel

let roomName = ''
let name = ''

var Room = {
  template: `
    <div class="room">
      <div class="row">
        <div class="col s12">
          <h4>Room : {{ roomName }}</h4>
        </div>
      </div>

      <div class="row">
        <div class="col s12">
          <div class="messages">
            <ul class="collection">
              <li class="collection-item message" v-for="message in chatMessages">
                {{ message.user }}: {{ message.message }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col s12">
          <div class="input-field">
            <input id="Message" type="text" @keyup.enter="sendMessage" v-model="message" />
            <label for="Message">Message</label>
          </div>
          
          <button @click="sendMessage()" class="btn waves-effect waves-light" type="submit" name="action">Submit
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
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
      this.chatMessages.push(msg)
      this.chatMessages = this.chatMessages.slice(0, 100)
      this.$nextTick(() => {
        this.$messages.scrollTop(this.$messages.prop('scrollHeight') + 100)
      })
    },
    sendMessage () {
      this.channel.push('msg:new', {message: this.message, user: name})
      this.message = ''
      $('input#Message').focus()
    }
  },
  mounted: function(){
    this.$messages = $('.messages')
    let socket = new Amber.Socket("/chat")
    socket.connect()
    .then(() => {
      this.channel = socket.channel(`chat_room:${roomName}`)
      this.channel.join()
      this.channel.on('msg:new', (msg) => this.onMessage(msg))
      this.channel.push('msg:new', {message: 'has joined the room', user: name})
    })

    $('input#Message').focus()
  }
}

var Rooms = {
  template: `
    <div class="rooms">
      <h4> Enter your name and pick a room </h4>

      <div class="input-field">
        <input type="text" id="name" v-model="name">
        <label for="name">Name</label>
      </div>

      <div class="collection">
        <a href="#!" class="collection-item room" v-for="room in rooms" @click.stop="joinRoom(room)">{{ room }}</a>
      </div>
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