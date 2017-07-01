# AmberWebsocketsExample

This is an example of Amber/Crystal using WebSockets.

## Installation

```
 $ crystal deps
```
```
 $ amber r
```

## Usage

Use to create a live app using Amber, possibly Mongo, Redis, Angular, React.js to help with your quest.

App ideas: Chat program, issue tracker, collaborative drawing, multiplayer games, collaborate music with web audio and web midi, web dj/shoutcast/radio type stuff, chat with new user of website in a popup window, multiplayer excel/word, receive a live news/blog feed from the server, etc

## Development

Fork, clone, run with ```amber r``` or ```amber w``` to run or watch. Watch will reload (recompile and run) on changes.

```
  socket_endpoint "/chat", UserSocket
```

Mounts the socket endpoint (the route that the server will accept WebSocket connections at.)

```
struct UserSocket < Amber::WebSockets::ClientSocket
  channel "chat_room:*", ChatChannel

  def on_connect
    # do some authentication here
    # return true or false, if false the socket will be closed
    true
  end
end
```

This is the User Socket with no authentication.
Creates channel chat_room.

```
class ChatChannel < Amber::WebSockets::Channel
  def handle_joined
  end

  def handle_message(msg)
    rebroadcast!(msg)
  end
end
```

This is the Chat Channel. It simply rebroadcasts every message that it receives (this is common for chat technologies.)

For information on how the frontend works, please see public/js/main.js. It's too long to display here in a code block but not hard to comprehend.

## Contributing

1. Fork it ( https://github.com/[your-github-name]/AmberWebsocketsExample/fork )
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create a new Pull Request

## Contributors

- [[fridgerator]](https://github.com/[fridgerator]) Nick Franken - creator, maintainer
- [[mixflame]](https://github.com/[mixflame]) Jon Silverman - documentation
