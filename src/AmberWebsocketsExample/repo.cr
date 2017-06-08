module Repo
  extend Crecto::Repo

  config do |c|
    c.adapter = Crecto::Adapters::SQLite3
    c.database = "./db.sqlite"
  end
end
