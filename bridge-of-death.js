var net = require('net')

net.createServer(function (s) {
  s.setEncoding('utf-8');
  s.write('Stop. Who would cross the Bridge of Death must answer me\nthese questions three,\nere the other side he see.\n');

  s.write('What... is your name?\n');
  s.once('data', function (name) {
    s.write('What... is your quest?\n');
    s.once('data', function (quest) {
      if (/Arthur/i.test(name)) {
        s.write('What... is the air-speed velocity of unlaiden swallow?\n');
      } else if (/Robin/i.test(name)) {
        s.write('What... is the capital of Assyria?\n');
      } else {
        s.write('What... is your favourite colour?\n');
      }
      s.once('data', function (answer) {
        s.end('Go on. Off you go.\n');
      });
    });
  });
}).listen(1975);
