import PptxGenJS from "pptxgenjs";


export default function generatePpt(pptData) {
  const pptx = new PptxGenJS();
  pptx.title = pptData.title || "Presentation";

  pptx.layout = "LAYOUT_16x9";

  (pptData.slides || []).forEach((slide, idx) => {
    const s = pptx.addSlide();

    // Background color
    if (slide.bgColor) s.background = { fill: slide.bgColor };

    if (slide.type === "title") {
      // Title slide
      s.addText(slide.heading || pptData.title || "Title", {
        x: 1, y: 1.5, w: 8, h: 1.2, fontSize: 36, bold: true, align: "center", color: "FFFFFF",
      });
      if (slide.subtitle) {
        s.addText(slide.subtitle, {
          x: 1, y: 2.8, w: 8, h: 0.8, fontSize: 20, align: "center", color: "FFFFFF",
        });
      }
      if (slide.image) {
        s.addImage({ path: slide.image, x: 4, y: 3.9, w: 3.2, h: 2 });
      }
    } else {
      // Content slide
      s.addText(slide.heading || `Slide ${idx + 1}`, {
        x: 0.7, y: 0.5, w: 8.6, h: 0.8, fontSize: 28, bold: true, color: "404040",
      });

      if (slide.content) {
        s.addText(slide.content, {
          x: 0.7, y: 1.4, w: 5.8, h: 3.6, fontSize: 16, color: "333333",
          // If you formatted bullets with \n, let them wrap naturally
        });
      }

      if (slide.image) {
        s.addImage({ path: slide.image, x: 6.8, y: 1.4, w: 3, h: 2.3 });
      }
    }
  });

  pptx.writeFile({ fileName: `${(pptData.title || "Presentation").replace(/[\\/:*?"<>|]/g, "")}.pptx` });
}
