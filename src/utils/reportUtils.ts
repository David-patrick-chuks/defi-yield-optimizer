
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { toast } from '@/components/ui/sonner';

// Function to download the report as PDF
export const downloadReport = async () => {
  try {
    toast.info("Preparing your report for download...");
    
    const reportElement = document.getElementById('report-content');
    if (!reportElement) {
      toast.error("Could not find report content to download");
      return;
    }
    
    const canvas = await html2canvas(reportElement, {
      scale: 2,
      logging: false,
      useCORS: true,
    });
    
    const imgData = canvas.toDataURL('image/png');
    
    // Calculate PDF dimensions based on the canvas
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    // Add more pages if the content exceeds one page
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    // Download the PDF
    pdf.save(`SafeSage_Report_${new Date().toISOString().split('T')[0]}.pdf`);
    toast.success("Report downloaded successfully!");
  } catch (error) {
    console.error("Error downloading report:", error);
    toast.error("Failed to download report. Please try again.");
  }
};

// Function to share the report
export const shareReport = async () => {
  try {
    // Check if Web Share API is supported
    if (navigator.share) {
      await navigator.share({
        title: 'SafeSage Risk Analysis Report',
        text: 'Check out my crypto portfolio risk analysis from SafeSage',
        url: window.location.href,
      });
      toast.success("Report shared successfully!");
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast.success("Report URL copied to clipboard!");
    }
  } catch (error) {
    console.error("Error sharing report:", error);
    toast.error("Failed to share report. Please try again.");
  }
};
