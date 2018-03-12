// http://www.libertarianquotes.com/quotes1.html

function getRandomQuote()
{
	var quotes = [
		{
			quote: "Using a broad brushstroke, I think Libertarian - most of America are socially accepting and fiscally responsible. I’m in that category. I think, broadly speaking, that’s a Libertarian. A Libertarian is going to be somebody who’s really strong on civil liberties.",
			cite: "Gary Johnson"
		},
		{
			quote: "A government which robs Peter to pay Paul, can always count on the support of Paul.",
			cite: "George Bernard Shaw"
		},
		{
			quote: "America needs fewer laws, not more prisons.",
			cite: "James Bovard"
		},
		{
			quote: "War is just one more big government program.",
			cite: "Joseph Sobran"
		},
		{
			quote: "Remember, democracy never lasts long. It soon wastes, exhausts, and murders itself. There never was a democracy yet that did not commit suicide.",
			cite: "John Adams (1814)"
		},
		{
			quote: "They that can give up essential liberty to obtain a little temporary safety, deserve neither liberty nor safety.",
			cite: "Benjamin Franklin"
		},
		{
			quote: "One of the greatest delusions in the world is the hope that the evils in this world are to be cured by legislation.",
			cite: "Thomas B. Reed (1886)"
		},
		{
			quote: "If you are not free to choose wrongly and irresponsibly, you are not free at all.",
			cite: "Jacob Hornberger (1995)"
		},
		{
			quote: "Giving money and power to government is like giving whiskey and car keys to teenage boys.",
			cite: "P.J. O'Rourke"
		},
		{
			quote: "The more corrupt the state, the more it legislates.",
			cite: "Tacitus"
		},
		{
			quote: "Government is not reason; it is not eloquence; it is force. Like fire, it is a dangerous servant and a fearful master.",
			cite: "George Washington"
		}
	];

	var quote = quotes[Math.floor(Math.random() * quotes.length)];

	return $('<blockquote cite="' + quote.cite + '">' +
	'    <span>' + quote.quote + '</span>' +
	'    <cite>&mdash; ' + quote.cite + '</cite>' +
	'</blockquote>')
}

$('#page-header').append(getRandomQuote());
