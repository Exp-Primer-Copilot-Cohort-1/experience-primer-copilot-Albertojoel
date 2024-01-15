// Create web server with Node.js
// Run with: node commet.js

// Load modules
var http = require('http');
var url = require('url');
var fs = require('fs');

// Create server
var server = http.createServer(function (req, res) {
  // Get URL path
  var path = url.parse(req.url).pathname;
  // If path is /, send index.html
  if (path == '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(fs.readFileSync('./index.html'));
    res.end();
  // If path is /comment, send comment.json
  } else if (path == '/comment') {
    res.writeHead(200, {'Content-Type': 'text/json'});
    res.write(fs.readFileSync('./comment.json'));
    res.end();
  // If path is /post, receive comment and save to comment.json
  } else if (path == '/post') {
    req.on('data', function (data) {
      var comment = JSON.parse(data);
      var comments = JSON.parse(fs.readFileSync('./comment.json'));
      comments.push(comment);
      fs.writeFileSync('./comment.json', JSON.stringify(comments));
    });
    res.writeHead(200, {'Content-Type': 'text/json'});
    res.end();
  }
});

// Listen on port 3000
server.listen(3000);
console.log('Server running at http://localhost:3000/');
