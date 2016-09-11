String.prototype.toCamelCase = function() {
   return this.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index == 0 ? match.toLowerCase() : match.toUpperCase();
  });
};
// var agenda =
// `### Day 1
// |  time | brief description | detailed description | speaker | 
// |---|---|
// |  9:00-9:30   | Conference registration start | Lorem ipsum dolor | Jon Bon Jovi 
// |  10:00-11:30 | Conference registration end | sit amet consectetur adipiscing | Tommy Lee Jones
// |  12:00-13:00 | Opening speech |

// ### Day 2
// | time  | description |
// |---|---|
// |  9:00-9:30   | Summit registration start |
// |  10:00-11:30 | Summit registration end | 
// |  12:00-13:00 | Opening talk |`;
// var rows = agenda.split(/\r|\n/);
// console.log('Titles:', findCaptions(rows));
// var tableIndices = findTables(rows);
// console.log('table indices:', tableIndices);
// var tables = tableIndices.map(index => splitTableCols(rows.slice(index.start, index.end)));
// tables.forEach(table => { console.log('Table found: \n',table)});

// bodies = tables.map(table => getBody(table));
// headings = tables.map(table => getHeadings(table));
// parsedAgenda = bodies.map(body => tableToObject(body));


// var agendaParser = {};


exports.parseAgenda = function(markdown) {


	function getBody(tableArr) {
		var arr = tableArr.slice(2); //discard first two rows
		return arr
			// .map(row => row.filter(str => str.length != 0) //remove empty strings from rows
			// )
			.map(row => ( row.map( cell => cell.trim() ))) // trim whitespace in cells
			.filter(row => row.join('').length != 0); //remove empty rows; 
	}
	function getHeadings(tableArr) {
		var row = tableArr[0];
		return row.filter(str => str.length != 0).map(str => str.toCamelCase()) //remove empty strings from rows

	}
	function parseCaptions(rows) {
		var titles = [];
		rows.forEach(row => {
			if (row.startsWith('#')) {
				titles.push(row.replace(/#/g, '').trim());
			}
		});
		return titles;
	}

	function findTables(rows) {
		tables= []; //tables is an array of objects
		for (var i = 0; i < rows.length; ++i) {
			if (rows[i].startsWith('|')) {
				var table = {start: i, end: i};
				while(i < rows.length && rows[i].startsWith('|') ) i++;
				table.end = i;
				tables.push(table);
			}
		}
		return tables;
	}

	function splitTableCols(rows) {
		return rows.map(row => (row.split('|')
			.map(str => str.trim())
			.slice(1,row.length-1)

			));
	}

	function tableToObject(tableArr) {
		return tableArr.map(row => {
			// console.log(row);
			var obj = {};
			obj.time = row[0];
			obj.briefDescription = row[1];
			obj.detailedDescription = row[2];
			obj.speaker = row[3];
			return obj;
		});
	}

	function parse(markdown) {
		parsedAgenda = [];
		if (markdown) {
			var rows = markdown.split(/\r|\n/);
			rows = rows.filter(rowStr => rowStr.length != 0); //weird bug with keystone adding two newlines on each enter press
			var tableIndices = findTables(rows);
			var tables = tableIndices.map(index => splitTableCols(rows.slice(index.start, index.end)));
			var bodies = tables.map(table => getBody(table));
			// var headings = tables.map(table => getHeadings(table));
			var captions = parseCaptions(rows);
			var contents = bodies.map(body => tableToObject(body));
			parsedAgenda = [];
			for (var i = 0; i < contents.length; ++i) {
				parsedAgenda.push({caption: captions[i], content: contents[i]})
			}	
		}
			// console.log(markdown)
			// console.log(rows)
			// console.log(tableIndices)
			// console.log(tables)
			 // console.log(bodies)
			 // console.log(captions)
			 // console.log(contents)
			//  console.log(parsedAgenda)
		return parsedAgenda;

	}
	return parse(markdown);
}

// exports.parseAgenda(agenda);


