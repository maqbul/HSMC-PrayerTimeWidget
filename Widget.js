//online code host,  margins, sunset colors, when offline message,progress bar, if isha12hour substring > 9 reduce spacing for time display,

//header - Masjideraza prayertime v1.0 developed by Maqbul Yusuf 3/10/21

//scriptables.net git for upload and generate link

// < **** UserSettings ***** >
const userSettings = {
  color1: "#FF0000",
  color2: "#00FF00",
  otherValue: 99
};
// </ScriptDude_UserSettings>


let widget = new ListWidget()

let url = "https://mis-productions.co.uk/prayertimes/hsmc/data.json";
let r = new Request(url)
let getPrayer = await r.loadJSON()
   
var str=JSON.stringify(getPrayer)


var now = new Date();
var start = new Date(now.getFullYear(), 0, 0);
var diff = now - start;
var oneDay = 1000 * 60 * 60 * 24;
var daynumber = Math.floor(diff / oneDay);
//test daynumber
//var daynumber = 274

console.log('Day number: ' + daynumber);
//console.log(getPrayer[daynumber].beginning.asarb)

//beginnings
var fajarb=getPrayer[daynumber].beginning.fajarb
var sunrise=getPrayer[daynumber].beginning.sunrise
var zoharb=getPrayer[daynumber].beginning.zoharb
var asarb=getPrayer[daynumber].beginning.asarb
var maghribb=getPrayer[daynumber].beginning.maghribb
var ishab=getPrayer[daynumber].beginning.ishab

//jamaat
var fajar=getPrayer[daynumber].jamaat.fajar
var zohar=getPrayer[daynumber].jamaat.zohar
var asar=getPrayer[daynumber].jamaat.asar
var maghrib=getPrayer[daynumber].jamaat.maghribb
var isha=getPrayer[daynumber].jamaat.isha


//12 hour formatting
var fajar12hr = fajar;
var H = +fajar12hr.substr(0, 2);
var h = H % 12 || 12;
var ampm = (H < 12 || H === 24) ? "" : "";
fajar12hr = h + fajar12hr.substr(2, 3) + ampm;


var sunrise12hr = sunrise;
var H = +sunrise12hr.substr(0, 2);
var h = H % 12 || 12;
var ampm = (H < 12 || H === 24) ? "" : "";
sunrise12hr = h + sunrise12hr.substr(2, 3) + ampm;


var zohar12hr = zohar;
var H = +zohar12hr.substr(0, 2);
var h = H % 12 || 12;
var ampm = (H < 12 || H === 24) ? "" : "";
zohar12hr = h + zohar12hr.substr(2, 3) + ampm;
 

var asar12hr = asar;
var H = +asar12hr.substr(0, 2);
var h = H % 12 || 12;
var ampm = (H < 12 || H === 24) ? "" : "";
asar12hr = h + asar12hr.substr(2, 3) + ampm;
 

var maghrib12hr = maghribb;
var H = +maghrib12hr.substr(0, 2);
var h = H % 12 || 12;
var ampm = (H < 12 || H === 24) ? "" : "";
maghrib12hr = h + maghrib12hr.substr(2, 3) + ampm;
//console.log(maghrib12hr)


var isha12hr = isha;
var H = +isha12hr.substr(0, 2);
var h = H % 12 || 12;
var ampm = (H < 12 || H === 24) ? "" : "";
isha12hr = h + isha12hr.substr(2, 3) + ampm;
//console.log(isha12hr)

var nextprayerlabel="   "
var nextprayername=""

let time = new Date()
h=time.getHours()
m=time.getMinutes()

if (h<10){h="0"+h}
if (m<10){m="0"+m}

timenow=h+':'+m

//test clock
//timenow="20:45"

//var nextsalah=sunrise
console.log('time: '+ timenow )
//console.log(fajarb)

//console.log(fajarb)

if (timenow<fajarb){
  nextprayername=fajar12hr
  nextprayerlabel="FAJAR    "//9 CHAR SPACES
  }
  
  if (timenow>fajar){
  nextprayername=sunrise12hr
  nextprayerlabel="SUNRISE"//9 CHAR SPACES
  }

if (timenow>sunrise){
  nextprayername=zohar12hr
  nextprayerlabel="ZOHAR   "//8 CHAR SPACES
  }
  
  if (timenow>zohar&&timenow<asar){
 nextprayerlabel="ASAR       "//8 SPACE CHARS MAX
nextprayername=asar12hr
  }
  
  if (timenow>asar&&timenow<maghribb){
 nextprayerlabel="MAGRIB  "//8 SPACE CHARS MAX
nextprayername=maghrib12hr
  }
  
  if (timenow>maghribb&&timenow<isha){
 nextprayerlabel="ISHA        "//8 SPACE CHARS MAX
nextprayername=isha12hr
}

//TODO if isha12hour substring > 9 reduce spacing for time display


//set tomorrows sunrise after isha
var sunriseTomorrow=getPrayer[daynumber+1].beginning.sunrise.substring(1,5)

if (timenow>isha){
  nextprayername=sunriseTomorrow
  nextprayerlabel="SUNRISE"//8 CHAR SPACES
  }
/*
var newText = widget.addText("texttext") 
newText.font = Font.blackRoundedSystemFont(5) ;
newText.textColor = Color.purple()
*/


let nextprayer=widget.addText(
nextprayerlabel + '                         '+ nextprayername)
nextprayer.textColor =Color.white()
nextprayer.font = Font.boldMonospacedSystemFont(23)
  
//nextprayer.tintColor = Color.blue()
 //widget.backgroundColor = new Color("#000");

let gradient = new LinearGradient()
  gradient.locations = [0, 1]
  gradient.colors = [
    new Color("18A8D8"),
    new Color("6048C0")
  ]

widget.backgroundGradient = gradient
widget.addSpacer(25)
 

//let showsunrise = widget.addText("Sunrise" + "     "+ sunrise);

//widget.font = Font.regularSystemFont(29);

let main = widget.addStack()

let left = main.addStack()
let right = main.addStack()
let middle = main.addStack()

let spacing = middle.addStack()

let icon = left.addStack()
let jamaat = middle.addStack()
let label = middle.addStack()


let rightTitle = right.addStack()
let rightContent = right.addStack()


spacing.addSpacer(23)

main.addStack()
main.addSpacer(10)

let fajarIcon = SFSymbol.named("sun.dust.fill")
    let docsElement1 = icon.addImage(fajarIcon.image)
    docsElement1.imageSize = new Size(40, 23)
    docsElement1.tintColor = Color.white()
    docsElement1.imageOpacity = 0.7
    
      
    let zoharIcon = SFSymbol.named("sun.max.fill")
    let docsElement2 = icon.addImage(zoharIcon.image)
    docsElement2.imageSize = new Size(80, 22)
    docsElement2.tintColor = Color.white()
    docsElement2.imageOpacity = 0.7
    widget.addSpacer(20)

let asarIcon = SFSymbol.named("sun.haze.fill")
    let docsElement3 = icon.addImage(asarIcon.image)
    docsElement3.imageSize = new Size(30, 22)
    docsElement3.tintColor = Color.white()
    docsElement3.imageOpacity = 0.7
 
 
let maghribIcon = SFSymbol.named("sunset.fill")
    let docsElement4 = icon.addImage(maghribIcon.image)
    docsElement4.imageSize = new Size(89, 22)
    docsElement4.tintColor = Color.white()
    docsElement4.imageOpacity = 0.7
    
 
left.addSpacer(10)

let ishaIcon = SFSymbol.named("moon.fill")
    let docsElement5 = icon.addImage(ishaIcon.image)
    docsElement5.imageSize = new Size(40, 22)
    docsElement5.tintColor = Color.white()
    docsElement5.imageOpacity = 0.5
 

      
//bottom spacing
widget.addSpacer(20)
 
//push previous spacer val to move target salah to right
label.addSpacer(3)

let fajrlabel = label.addText("fajar");
fajrlabel.textColor =Color.white()
   fajrlabel.font = Font.lightSystemFont(18); 
   fajrlabel.textOpacity=0.9
   fajrlabel.tintColor= Color.red()
   label.addSpacer(26)


let zuhrlabel = label.addText("zuhr");
  zuhrlabel.textColor =Color.white()
  //heading.centerAlignText();
  zuhrlabel.font = Font.lightSystemFont(18); 
  zuhrlabel.textOpacity=0.9
  label.addSpacer(20)


let asarlabel = label.addText("asar");
 asarlabel.textColor =Color.white()
    asarlabel.font = Font.lightSystemFont(18); 
   asarlabel.textOpacity=0.9
 label.addSpacer(24)


let maghriblabel = label.addText("magr");
  maghriblabel.textColor =Color.white() 
  maghriblabel.font = Font.lightSystemFont(18); 
   maghriblabel.textOpacity=0.9
 label.addSpacer(22)

let ishalabel = label.addText("isha");
ishalabel.textColor =Color.white()
   ishalabel.font = Font.lightSystemFont(18); 
   ishalabel.textOpacity=0.9
  label.addSpacer(1)
  
  //widget.addSpacer(5);

//label.font = new Color('black')

 //label.font = Font.lightSystemFont(5);
 
  
 

var fajarjamaat = jamaat.addText(fajar12hr) 
fajarjamaat.font = Font.boldMonospacedSystemFont(17) ;
fajarjamaat.textColor = Color.white()
fajarjamaat.textOpacity=0.9
jamaat.addSpacer(23) 

var zoharjamaat = jamaat.addText(zohar12hr) 
zoharjamaat.font = Font.boldMonospacedSystemFont(17) ;
zoharjamaat.textColor = Color.white()
zoharjamaat.textOpacity=0.9
jamaat.addSpacer(17) 

var asarjamaat = jamaat.addText(asar12hr) 
asarjamaat.font = Font.boldMonospacedSystemFont(17) ;
asarjamaat.textColor = Color.white()
asarjamaat.textOpacity=0.9
jamaat.addSpacer(21) 


var maghribjamaat = jamaat.addText(maghrib12hr) 
maghribjamaat.font = Font.boldMonospacedSystemFont(17) ;
maghribjamaat.textColor = Color.white()
maghribjamaat.textOpacity=0.9
jamaat.addSpacer(21) 


var ishajamaat = jamaat.addText(isha12hr) 
ishajamaat.font = Font.boldMonospacedSystemFont(17) ;
ishajamaat.textColor = Color.white()
ishajamaat.textOpacity=0.9
jamaat.addSpacer(2) 

//fajrlabel.textColor =Color.purple()

main.layoutVertically()
middle.layoutVertically()
left.layoutVertically()
right.layoutVertically()




//update.font = Font.regularSystemFont(10);
//update.textColor = themeColor;
//update.rightAlignText();
//console.log(update)


//minimumScaleFactor(0)
  
widget.setPadding(50, 20, 0, 20)
 



if(!config.runsInWidget){
widget.presentMedium()

}

 


Script.setWidget(widget)
Script.complete()





 //quotes = quoteObj[0].text;
//characterName = quoteObj[0].author;


 




//Anime Quote





//widget.setPadding(10, 10, 10, 10);
//return ListWidget()


//Script.setWidget(widget)
