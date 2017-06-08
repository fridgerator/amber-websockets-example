struct UserSocket < Amber::WebSockets::ClientSocket
  channel "chat_room:*", ChatChannel

  def on_connect
    # do some authentication here
    # return true or false, if false the socket will be closed
    true
  end
end

class ChatChannel < Amber::WebSockets::Channel
  def handle_joined
  end

  def handle_message(msg)
    rebroadcast!(msg)
  end
end
