class WebGLNoise < Sinatra::Base
  require 'rubygems'

  get '/' do
    erb :index
  end
end
