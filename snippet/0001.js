console.log('//HTML//////////////////////////////');

// Add Body Class Just For IE
/*

<!--[if IE ]>
   <body class="ie">
<![endif]-->
<!--[if !IE]>-->
   <body>
<!--<![endif]-->


<!DOCTYPE html>
<!--[if IEMobile 7 ]> <html dir="ltr" lang="en-US"class="no-js iem7"> <![endif]-->
<!--[if lt IE 7 ]> <html dir="ltr" lang="en-US" class="no-js ie6 oldie"> <![endif]-->
<!--[if IE 7 ]>    <html dir="ltr" lang="en-US" class="no-js ie7 oldie"> <![endif]-->
<!--[if IE 8 ]>    <html dir="ltr" lang="en-US" class="no-js ie8 oldie"> <![endif]-->
<!--[if (gte IE 9)|(gt IEMobile 7)|!(IEMobile)|!(IE)]><!--><html dir="ltr" lang="en-US" class="no-js"><!--<![endif]-->

 */


// Base64 Encode of 1x1px Transparent GIF
/*

<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">
a black one:
<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=">
 */


// Basic Microformatted hCard
/*

<div id="hcard-Christopher-John-Coyier" class="vcard">
 <a class="url fn n" href="http://chriscoyier.net">
  <span class="given-name">Christopher</span>
  <span class="additional-name">John</span>
  <span class="family-name">Coyier</span>
</a>
 <div class="org">CSS-Tricks</div>
 <a class="email" href="mailto:chriscoyier@gmail.com">chriscoyier@gmail.com</a>
 <div class="adr">
  <div class="street-address">123 Appleseed Street</div>
  <span class="locality">Chicago</span>, <span class="region">IL </span> <span class="postal-code">60647</span>
  <span class="country-name">United States</span>
 </div>
 <div class="tel">555-555-5555</div>
</div>

 */


// Comments in HTML
/*

<div id="header">
   <p>Stuff</p>
</div> <!-- END div-header -->

 */


// Get Directions Form (Google Maps)
/*

<form action="http://maps.google.com/maps" method="get" target="_blank">
   <label for="saddr">Enter your location</label>
   <input type="text" name="saddr" />
   <input type="hidden" name="daddr" value="350 5th Ave New York, NY 10018 (Empire State Building)" />
   <input type="submit" value="Get directions" />
</form>

saddr = blank input field for entering START address
daddr = hard-coded END address

Enter an address and press button and a popup window opens with directions. Enter no address, and just a map of the END address opens.

 */


// Get Rid of White Flash when iframe Loads
/*

<iframe style="visibility:hidden;" onload="this.style.visibility = 'visible';" src="../examples/inlineframes1.html" > </iframe>

 */


// iPhone Calling and Texting Links
/*

<a href="tel:1-408-555-5555">1-408-555-5555</a>
<a href="sms:1-408-555-1212">New SMS Message</a>

 */


// Meta Refresh
/*

The redirects to the provided URL in 5 seconds. Set to 0 for an immediate redirect.
<meta http-equiv="refresh" content="5;url=http://example.com/" />

 */


// Meta Tag For Forcing IE 8 to Behave Like IE 7
/*

<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />

 */


// Responsive Meta Tag
/*

<meta name="viewport" content="width=device-width">
<meta name="viewport" content="width=device-width, initial-scale=1">

@-ms-viewport{
  width: device-width;
}

 */


// Serving Up Universal IE 6 Stylesheet
/*

<!--[if !IE 6]><!-->
  <link rel="stylesheet" type="text/css" media="screen, projection" href="REGULAR-STYLESHEET.css" />
<!--<![endif]-->

<!--[if gte IE 7]>
  <link rel="stylesheet" type="text/css" media="screen, projection" href="REGULAR-STYLESHEET.css" />
<![endif]-->

<!--[if lte IE 6]>
  <link rel="stylesheet" type="text/css" media="screen, projection" href="http://universal-ie6-css.googlecode.com/files/ie6.0.3.css" />
<![endif]-->

 */


// Tooltips for Acronyms
/*

I love <acronym title="Cascading Style Sheets">CSS</acronym>.

 */


// Stop IE Page Load Flicker
/*

<!--[if IE]>
<meta http-equiv="Page-Enter" content="blendTrans(duration=0)" />
<meta http-equiv="Page-Exit" content="blendTrans(duration=0)" />
<![endif]-->

 */


// Turn Off Autocomplete for Input
/*

<input name="q" type="text" autocomplete="off"/>

 */


// Video For Everybody (HTML5 Video with Flash Fallback)
/*

<!-- first try HTML5 playback: if serving as XML, expand `controls` to `controls="controls"` and autoplay likewise -->
<!-- warning: playback does not work on iOS3 if you include the poster attribute! fixed in iOS4.0 -->
<video width="640" height="360" controls>
  <!-- MP4 must be first for iPad! -->
  <source src="__VIDEO__.MP4" type="video/mp4" /><!-- Safari / iOS video    -->
  <source src="__VIDEO__.OGV" type="video/ogg" /><!-- Firefox / Opera / Chrome10 -->
  <!-- fallback to Flash: -->
  <object width="640" height="360" type="application/x-shockwave-flash" data="__FLASH__.SWF">
    <!-- Firefox uses the `data` attribute above, IE/Safari uses the param below -->
    <param name="movie" value="__FLASH__.SWF" />
    <param name="flashvars" value="controlbar=over&amp;image=__POSTER__.JPG&amp;file=__VIDEO__.MP4" />
    <!-- fallback image. note the title field below, put the title of the video there -->
    <img src="__VIDEO__.JPG" width="640" height="360" alt="__TITLE__"
         title="No video playback capabilities, please download the video below" />
  </object>
</video>
<!-- you *must* offer a download link as they may be able to play the file locally. customise this bit all you want -->
<p> <strong>Download Video:</strong>
  Closed Format:  <a href="__VIDEO__.MP4">"MP4"</a>
  Open Format:  <a href="__VIDEO__.OGV">"Ogg"</a>
</p>

 */


console.log('////////////////////////////////////');
