var pdf = require('./pdf')
var pdfBtn = document.getElementById("selfile")
var inputTime = document.getElementById("pagingTime")
var pagingTime = 5000
var file

pdfBtn.addEventListener("change", function(evt){
  pagingTime = document.getElementById("pagingTime").value * 1000

  pdfBtn.style.display = 'none'
  inputTime.style.display = 'none'

  file = evt.target.files
  localPdf = pdf.getPdf(file[0].path)
  setInterval(function(){ pdf.loopPage() }, pagingTime)
},false);


