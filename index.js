const asciidoctor = require('asciidoctor')();
const registryManual = asciidoctor.Extensions.create();
require('./manual-preprocessor.js')(registryManual);


const buildGloss = asciidoctor.convertFile('glossary.adoc');
const buildArticle = asciidoctor.loadFile('article.adoc', {'extension_registry': registryManual});
console.log(buildArticle.convert());

const doc = asciidoctor.loadFile('glossary.adoc', {"catalog_assets": true, 'safe': 'safe'});


// this gets terms and defs. Could put them into JSON for further use, or into arrays etc.
//var glossTerm = doc.findBy({'context':'dlist'});
// for(i=0;i<glossTerm.length;i++){
//     for(j=0;j<glossTerm[i].getItems().length;j++){
//         let term = glossTerm[i].getItems()[j][0][0].getText();
//         let def = glossTerm[i].getItems()[j][1].getText();
//         //listContents.push(glossTerm[i].getContent()[j]);
//     } 
// }

// This approach would be better if wanting to make use of links
// iterate over glossary and get each section/term
var glossTerm = doc.findBy({'context': 'section'}, function (section) {
    return section.getLevel() === 1;
});
function getSection (glossTerm) {
    for(i=0;i<glossTerm.length;i++) {
        // Get the section name (title), which in this case is the glossary term
        console.log("Term: " + glossTerm[i].getName()); 
        // then get the child blocks' contents
        // Note: if you want just the first paragraph (perhaps as the on hover short def?), glossTerm[i].getBlocks()[0].lines[0] 
        // But consider creating macros for this, e.g. gloss title, gloss summary, gloss long
        for(let j=0; j<glossTerm[i].getBlocks().length; j++) {
            console.log(glossTerm[i].getBlocks()[j].lines[0]); 
        }        
    }
};
getSection(glossTerm);
// TODO: 
//https://stackoverflow.com/questions/42895449/how-to-convert-array-of-arrays-to-array-of-objects-where-keys-are-taken-from-the
// Then once in JSON, need to handle searching docs and marking up terms as part of pre-processing. Including accepting user config for first vs all vs none
// And then handle manual user markup



