class StaticController < Amber::Controller::Base
  def index
    "do nothing"
  end
end

EXAMPLE_SERVER = Amber::Server.instance

EXAMPLE_SERVER.config do |app|
  app.log = ::Logger.new(STDOUT)
  app.log.level = ::Logger::INFO

  pipeline :static do
    plug HTTP::StaticFileHandler.new("./public")
    plug HTTP::CompressHandler.new
  end

  socket_endpoint "/chat", UserSocket

  routes :static do
    # Each route is defined as follow
    # verb resource : String, controller : Symbol, action : Symbol
    get "/*", StaticController, :index
  end
end

EXAMPLE_SERVER.run
