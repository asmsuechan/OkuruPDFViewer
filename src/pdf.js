(function() {
  "use strict";

  require('pdfjs-dist');
  PDFJS.workerSrc = "node_modules/pdfjs-dist/build/pdf.worker.js";

  var currentPage = 1;
  var pdfDoc;

  var getPdf = function (url){
    PDFJS.getDocument(url).then(function(pdf){
      pdfDoc = pdf;
      renderPage(pdfDoc);
    });
  }

  var renderPage = function (pdf){
    pdf.getPage(currentPage).then(function(page){
      var scale = 1.0;
      var viewport = page.getViewport(scale);
      var canvas = document.getElementById('pdf-canvas');
      var ctx = canvas.getContext('2d');
      var renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      document.getElementById('pdf-canvas');
      page.render(renderContext);
    });
  }

  var nextPage = function (){
    currentPage++;
    renderPage(pdfDoc);
  }

  var loopPage = function(){
    currentPage++
    if (currentPage > pdfDoc.numPages){
      currentPage -= pdfDoc.numPages
    }
    renderPage(pdfDoc)
  }

  exports.getPdf = getPdf
  exports.renderPage = renderPage
  exports.nextPage = nextPage
  exports.loopPage = loopPage

})();
