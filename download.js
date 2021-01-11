function download() {
    if (screen.width < 1024) {
        document.getElementById("viewport").setAttribute("content", "width=1200px");
    }
    const data = document.getElementById('contentToConvert');
    let html2canvasOptions = {
        allowTaint: true,
        removeContainer: true,
        backgroundColor: null,
        imageTimeout: 15000,
        logging: true,
        scale: 2,
        useCORS: true
    };
    // Few necessary setting options
    const contentDataURL = canvas.toDataURL('image/png')
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = canvas.height * imgWidth / canvas.width;
    let heightLeft = imgHeight;
    let pdf = new jspdf('p', 'mm', 'a4', true); // A4 size page of PDF
    let position = 0;

    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST')
        heightLeft -= pageHeight;
    }
    pdf.save('resume.pdf'); // Generated PDF

    if (screen.width < 1024) {
        document.getElementById("viewport").setAttribute("content", "width=device-width, initial-scale=1");
    }
}
