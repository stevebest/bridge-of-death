import readline

print 'Stop. Who would cross the Bridge of Death must answer me these questions three, ere the other side he see.'

print 'What... is your name?'
name = raw_input()

print 'What... is your quest?'
quest = raw_input()

if 'arthur' in name.lower():
	print 'What... is the air-speed velocity of an unladen swallow?'
elif 'robin' in name.lower():
	print 'What... is the capital of Assyria?'
else:
	print 'What... is your favourite colour?'
last_answer = raw_input()

print 'Go on. Off you go.'
