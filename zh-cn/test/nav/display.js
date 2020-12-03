function show(id){
var divs = document.getElementsByName("nav")
for (var i = 0 ; i < divs.length ; i++){
if (divs[i].id == "n"+id ){
divs[i].style.display=""
}else{
divs[i].style.display="none"
}
}
}