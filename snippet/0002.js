console.log('//CSS//////////////////////////////');

// “Shake” CSS Keyframe Animation
/*

.face:hover {
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}

 */


// Flex & Grid
/*

https://css-tricks.com/snippets/css/a-guide-to-flexbox/
https://css-tricks.com/snippets/css/complete-guide-grid/

 */


// Accessibility/SEO Friendly CSS Hiding
/*

#content {
    position: absolute;
    top: -9999px;
    left: -9999px;
}

position:absolute;
clip:rect(0 0 0 0);

 */


// Better Helvetica
/*

body {
   font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
   font-weight: 300;
}

 */


// CSS3 Zebra Striping a Table
/*

tbody tr:nth-child(odd) {
   background-color: #ccc;
}

 */


// Common Unicode Icons
/*

a[href^="mailto:"]:before { content: "\2709"; }
.phone:before             { content: "\2706"; }
.important:before         { content: "\27BD"; }
blockquote:before         { content: "\275D"; }
blockquote:after          { content: "\275E"; }
.alert:before             { content: "\26A0"; }

<p>
  <a href="mailto:chriscoyier@gmail.com">
    chriscoyier@gmail.com
  </a>
</p>

<p class="phone">
    555-555-5555
</p>

<p class="important">
  REMEMBER: drink slushies too fast.
</p>

<blockquote>
   Designers tend to whisper, ad agencies tend to shout.
</blockquote>

<p class="alert">
   Stranger Danger!
<p>

 */


// Fixed Footer
/*

#footer {
   position:fixed;
   left:0px;
   bottom:0px;
   height:30px;
   width:100%;
   background:#999;
}

// IE6
* html #footer {
   position:absolute;
   top:expression((0-(footer.offsetHeight)+(document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight)+(ignoreMe = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop))+'px');
}

 */


// PNG Hack/Fix for IE 6
/*

For CSS background-images
.yourselector {
       width:200px;
       height:100px;
       background: url(/folder/yourimage.png) no-repeat;
       _background:none;
       _filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='/folder/yourimage.png',sizingMethod='crop');
}

For inline HTML images
img, .png {
       position: relative;
       behavior: expression((this.runtimeStyle.behavior="none")&&(this.pngSet?this.pngSet=true:(this.nodeName == "IMG" && this.src.toLowerCase().indexOf('.png')>-1?(this.runtimeStyle.backgroundImage = "none",
       this.runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + this.src + "', sizingMethod='image')",
       this.src = "images/transparent.gif"):(this.origBg = this.origBg? this.origBg :this.currentStyle.backgroundImage.toString().replace('url("','').replace('")',''),
       this.runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + this.origBg + "', sizingMethod='crop')",
       this.runtimeStyle.backgroundImage = "none")),this.pngSet=true));
}

 */


// Remove Margins for First/Last Elements
/*

.first { margin-top: 0 !important; margin-left: 0 !important; }
.last { margin-bottom: 0 !important; margin-right: 0 !important; }

* > :first-child { margin-top: 0 !important; margin-left: 0 !important; }
* > :last-child { margin-bottom: 0 !important; margin-right: 0 !important; }

* > :nth-child(3n+3) { margin-right: 0; }

 */


// Comments
/*



 */


// Comments
/*



 */


// Comments
/*



 */


// Comments
/*



 */


// Comments
/*



 */


// Comments
/*



 */


console.log('////////////////////////////////////');


