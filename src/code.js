//variables
var ss = SpreadsheetApp.getActiveSpreadsheet();
var TEST_TAB = ss.getSheetByName("autoTest");
var STATS_TAB = ss.getSheetByName("stats");

//functions
function shuffle(array) {//function to shuffle the items within an array 
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)); //random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]]; //swap elements
    }
}
  
function removeEmptyItems(array){//function to remove empty items from an array
    for (var e=array.length-1;e>=0;e--){
      if(array[e][0]===""){array.splice(e, 1)}
    }
    return array;
}

function generateWords() {  
  var totalTestWords=10; //amount of words to be generated per test
  var correctWords = TEST_TAB.getRange(2, 11,totalTestWords).getValues();
  var wrongWords = TEST_TAB.getRange(2, 12,totalTestWords).getValues();
  var archive = TEST_TAB.getRange(2,13,TEST_TAB.getLastRow()-1).getValues();
  var inItems = TEST_TAB.getRange(1,1,TEST_TAB.getLastRow()).getValues();
  var newItemsForStats = TEST_TAB.getRange(1,1,TEST_TAB.getLastRow(),2).getValues();//to capture new words added and send them to the stats
  var stats = STATS_TAB.getRange(2, 1,STATS_TAB.getLastRow()-1,5).getValues();
      
  removeEmptyItems(correctWords);
  removeEmptyItems(wrongWords);
  removeEmptyItems(archive);
  removeEmptyItems(inItems);
  removeEmptyItems(newItemsForStats);
  removeEmptyItems(stats);
    
  //checks for new words to add them to the stats
  for (var a=newItemsForStats.length-1;a>=0;a--){
    //loop to find the word in the stats list
    for (var b=0;b<stats.length;b++){
      if(newItemsForStats[a][0]==stats[b][1]){
        newItemsForStats.splice(a, 1);
        break;
      }
      //if is the last element to check and the word is not found adds to stats list as a new word
      else if (b==stats.length-1 && newItemsForStats[a][0]!==stats[b][1]){
        stats.push([0,newItemsForStats[a][0],newItemsForStats[a][1],0,0]);
      }
    }
  }
     
  //if wrong entries, increases the number of failed in the stats abd appends them at the end of the archive  
  if(wrongWords.length>0 && wrongWords.length<totalTestWords){
    for (var s=0; s<wrongWords.length;s++){
      for (var f=0; f<stats.length;f++){
       if(stats[f][1]==wrongWords[s][0]){
         stats[f][3]++;
         break;
       }
      }
      archive.push(wrongWords[s]);
    }
  }
  
  //if correct answers, increases the number of succeeded in the stats, iterates which each in the archive and in case finds it, it removes (splice) it 
  var removed = 0; //counter to display in message
    
  if(correctWords.length>0){
    for(var y=0; y<correctWords.length;y++){    
      //loop to find the word in the stats list and increase number of succeeded
      for (var g=0; g<stats.length;g++){
       if(stats[g][1]==correctWords[y][0]){
         stats[g][4]++;
         break;
       }
      }    
      //loop to remove the word from the archive and to sign amount of removed
      for (var k=archive.length-1;k>=0;k--){
        if(correctWords[y][0]==archive[k][0]){
          archive.splice(k, 1);
          removed++;
          break;
        }
      }
    }
  }
  
  //overwrites archive
  TEST_TAB.getRange("M2:M").clearContent();  
  if(archive.length>0){
    TEST_TAB.getRange(2,13,archive.length).setValues(archive)
  }
  
  //overwrites stats
  for (var l=0;l<stats.length;l++){
    stats[l][0]=stats[l][3]+stats[l][4]
  }  
  stats.sort(function(a, b){return b[0]-a[0]}); // Sort method sorts items as ARRAY OF CHARACTERS. To sort NUMERICALLY this function is required, where[0] determines the column to be considered.  
  STATS_TAB.getRange(2, 1,STATS_TAB.getLastRow()-1,5).clearContent();
  STATS_TAB.getRange(2, 1,stats.length,stats[0].length).setValues(stats);
  
  //--------------GENERATING NEW WORDS RANDOMLY----------------------------------------------------------------------  
  var outItems=[];//creates an empty container for the generated items
  
  //1. pushes the 3 less frequent items from stats into outItems
  for (var w=1; w<=3; w++){
    outItems.push([stats[stats.length-w][1]]);
  }  
  var shiftIndex = 0;
    
  //2. If any archive items and not already included in outItems, pushes first item to the 4.position of outItems
  //2.1 First, removes from archive list the 3 elements in outItems to avoid redundancy
  if(archive.length>0){    
    for(var h=0;h<outItems.length;h++){
      for(var j=archive.length-1;j>=0;j--){
        if(outItems[h][0]==archive[j][0]){
          archive.splice(j, 1);
        } 
      }
    }
  }
  //2.2 if there are still items left in archive...
  if(archive.length>0){    
    shuffle(archive);//...shuffles to change the first position
    outItems.push([archive[0][0]]); //adds the first element from the shuffled archive list       
    shiftIndex++;
  }
  
  //3. fills the rest of outItems with items not selected yet in the previous steps
  //3.1 first, removes from inItems the elements already in outItems 
  for(var m=0;m<outItems.length;m++){
    for(var o=inItems.length-1;o>=0;o--){
      if(outItems[m][0]==inItems[o][0]){
        inItems.splice(o, 1);
        break;
      } 
    }
  }
  
  //3.2 creates an empty array and generates a sequence of numbers from 1 to n (=10-3(less frequents)-1(failed)) 
  var arrayNumbers = [];
  
  for (var n=0; n<inItems.length; n++){
    arrayNumbers.push(n)
  }  
  shuffle(arrayNumbers);    
  for (var x=3+shiftIndex; x<totalTestWords;x++){ //if shitfIndex 0 -> adds 7 elements (to complete 10)
                                                //   else if is 1 -> adds 6 elements       
    outItems.push([inItems[arrayNumbers[x]][0]])  
  } 
  shuffle(outItems);
  //--------------(CLOSE) GENERATING NEW WORDS RANDOMLY----------------------------------------------------------
  
  //overwrites list of generated words  
  TEST_TAB.getRange(2,6,totalTestWords,2).clearContent();
  TEST_TAB.getRange(2,6,totalTestWords).setValues(outItems);
    
  //displays how many elements have been removed from the failed words archived
  if(removed>0){
    var message ="Removed items: " + removed; 
    SpreadsheetApp.getUi().alert(message);
  }
}
