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
                    for(let j=0; j<glosses.length;j++){
                        // remove gloss:[
                        let termSlug = glosses[j][0].substring(7);
                        // remove the trailing ]
                        termSlug = termSlug.substring(0, termSlug.length-1);
                        // make lowercase
                        termSlug = termSlug.toLowerCase();
                        // replace whitespace with hyphens
                        termSlug = termSlug.replace(/\s/g, '-');
                        console.log(termSlug);
                        console.log(lines[i]);
                        // TODO: sort out replacements. Currently this isn't doing anything, and isn't erroring either -.-
                        lines[i].replace(RegExp("^(?:.*?gloss:){" + j + "}"), function(x){return x.replace(RegExp('gloss:' + "$"), "yo")});
                        //`xref:glossary.adoc#${termSlug}`
                    }                    
                }
            }
            return reader;
        })
    })
}