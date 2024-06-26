var channel = "euro",
    renderRoot ="\\z\\Для Режиссеров Монтажа\\Плашки\\!сгенерированные",
    scrPath = $.fileName.substring(0, $.fileName.lastIndexOf("/")),
    rootPath = scrPath.substring(0, scrPath.lastIndexOf("/"));
    q = '\\',
    d = '.';
    renderPath = renderPath();

app.open(new File(scrPath+ q + channel + ".aep"));

var newFile = new File(rootPath + "/plash.txt");

if(newFile != null) {
        var doc = readDocument(newFile).contentAry;
        
        app.beginUndoGroup("Import Text");
           createPlash(doc);
        app.endUndoGroup();
    }

function readDocument(inputDoc) {
        var curDoc = new File(inputDoc);
        if(curDoc.exists){
            var contentAry = new Array();
            curDoc.open("r");
            while(!curDoc.eof) {
                    contentAry[contentAry.length] = curDoc.readln();
             }
            curDoc.close();
        }
    
        contentAry = contentAry;
        return {
            'contentAry': contentAry, 
            }
    }

function createPlash(content) {
  
       try{
           if(content instanceof Array){
                    var dateTimeMsk, compNumByCountry;
                    var curLine, pl;                                                                
                    var aryLength = content.length;
                    for(var i = 0; i<aryLength; i++) {
                           curLine = content[i];
                           pl = parse(curLine);
                           dateTimeMsk = pl.date + "\n" + pl.time + " МСК";
                           compByCountry = selectCompByCountry(pl.country);
                           newPlash = app.project.item(returnCompId(compByCountry)).duplicate();
                           newPlash.name = pl.name;

                            if(pl.name.length >= 42)
                           {
                               movieName = pl.name.replace(new RegExp(" ",'g'), "\n");
                               newPlash.layer("stamp 3").enabled = true;
                               newPlash.layer("название 3").enabled = true;
                               changeTextLayer(newPlash.layer("название 4"), movieName);
                           }
                           else if(pl.name.length >= 28)
                           {
                               movieName = pl.name.replace(new RegExp(" ",'g'), "\n");
                               newPlash.layer("stamp 3").enabled = true;
                               newPlash.layer("название 3").enabled = true;
                               changeTextLayer(newPlash.layer("название 3"), movieName);
                           }
                           else if(pl.name.length >= 14)
                           {
                               movieName = pl.name.replace(new RegExp(" ",'g'), "\n");
                               newPlash.layer("stamp 2").enabled = true;
                               newPlash.layer("название 2").enabled = true;
                               changeTextLayer(newPlash.layer("название 2"), movieName);
                           }
                            else
                           {
                             newPlash.layer("название 1").enabled = true;   
                             changeTextLayer(newPlash.layer("название 1"), pl.name);
                             newPlash.layer("stamp 1").enabled = true;
                           }
                           changeTextLayer(newPlash.layer("время"), dateTimeMsk);
                        }
                }
            } catch(err) {alert(err.line.toString()+ "\r" + err.to.String())};  
    }


function selectCompByCountry(country)
{
    switch(country)  {
        case "Великобритания":
            return "1.uk"; break;
        case "Германия":
            return "2.germany"; break;
        case "Франция":
            return "3.france" ; break;
        case "Испания":
            return "4.spain"; break;    
        case "Италия":
            return "5.italy"; break;
        case "Польша":
            return "6.poland"; break;
        default: return "7.other"; break;
        }
}

function changeTextLayer(textLayer, text)    {
        var textProperty = textLayer.property("Source Text");
        var textDocument = textProperty.value;
        textDocument.text = text;
        textProperty.setValue(textDocument);
    }

function parse(myText) {
        var text = myText.split("\t");
        return {
            'name':  text[0],
            'date':  text[1],
            'time': text[2],
            'country': text[3]          
            }
    }
   
 function returnCompId(compName){
    for (var i = 1; i <= app.project.numItems; i++) {
        if (app.project.item(i) instanceof CompItem) {
            if(app.project.item(i).name == compName) return i;
        }
   }
   }
    