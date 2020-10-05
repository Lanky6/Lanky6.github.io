function travelling(){
    var url=new Array();

    url[0]="https://github.com/volfclub/travelling";
    url[1]="https://lanky.top/";
    url[2]="https://dk01689.github.io/";
    url[3]="https://qcloud.com/";



    if (document.referrer) {
      var origin = new URL(document.referrer).origin;
      url.splice(url.indexOf(origin), 1);
    }
    
    
    var ints=Math.floor(Math.random() * url.length);
    window.location=url[ints];
   }