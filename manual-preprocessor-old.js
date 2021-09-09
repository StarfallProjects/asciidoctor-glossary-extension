// manual markup preprocessor
module.exports = function (registry) {
    registry.preprocessor(function() {
        var self = this;
        var glossPattern = RegExp(/(gloss:\[.*?\])/, 'g');
        self.process(function (doc, reader) {
            var lines = reader.lines;
            
            for (let i=0; i < lines.length; i++) {
                if(lines[i].match(/.*(gloss:\[.*?\]).*/)){
                    var glosses = [...lines[i].matchAll(glossPattern)];
                   console.log("glosses: ",glosses);
                    for(let j=0; j<glosses.length;j++){
                        // remove gloss:[
                        let termSlug = glosses[j][0].substring(7);
                        // remove the trailing ]
                        termSlug = termSlug.substring(0, termSlug.length-1);
                        // make lowercase
                        termSlug = termSlug.toLowerCase();
                        // replace whitespace with hyphens
                        termSlug = termSlug.replace(/\s/g, '-');
                       // console.log(termSlug);
                       // console.log(lines[i]);
                       // console.log("j: ", j);
                        // TODO: sort out replacements. Currently this isn't doing anything, and isn't erroring either -.-
                        lines[i] = lines[i].replace(RegExp("^(?:.*?gloss:){" + (j+1) + "}"), function(x){return x.replace(RegExp('gloss:' + "$"), "xref:glossary.adoc#${termSlug}")});
                        console.log("test: ",lines[i]);
                    }                    
                }
            }
            //console.log("reader: ", reader);
            return reader;
        })
    })
}