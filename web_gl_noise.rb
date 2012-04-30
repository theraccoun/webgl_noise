class WebGLNoise < Sinatra::Base
  require 'rubygems'
  get '/?' do
    redirect '/index.html'
  end
end
