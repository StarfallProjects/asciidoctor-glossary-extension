// manual markup preprocessor
module.exports = function (registry) {
    registry.preprocessor(function() {
        var self = this;
        var glossPattern = RegExp(/(gloss:\[.*?\])/, 'g');
        self.process(function (doc, reader) {
            var lines = reader.lines;
            for (let i=0; i < lines.length; i++) {
                if(lines[i].match(/.*(gloss:\[.*?\]).*/)){
                    // split lines
                    let splitty = lines[i].split(glossPattern);
                    splitty.forEach(function(part, index) {
                        if(part.match(glossPattern)) {
                            // remove gloss:[
                            let termSlug = part.substring(7);
                            // remove the trailing ]
                            termSlug = termSlug.substring(0, termSlug.length-1);
                            // make lowercase
                            termSlug = termSlug.toLowerCase();
                            // replace whitespace with hyphens
                            termSlug = termSlug.replace(/\s/g, '-');
                            splitty[index] = part.replace(/^(?:.*?gloss:)/,`xref:glossary.adoc#${termSlug}`);                            
                        }
                    });
                    let newSplitty = splitty.join("");
                    reader.lines[i] = newSplitty;
                }
            }
            return reader;
        })
    })
}