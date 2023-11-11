function main() {
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  var text = body.getText();
  var paragraphs = body.getParagraphs();

  for (var i = 0; i < paragraphs.length; i++) {
    var paragraph = paragraphs[i];
    var paragraphText = paragraph.getText();

    // Check for Heading 1
    if (paragraphText.startsWith('# ')) {
      paragraph.setHeading(DocumentApp.ParagraphHeading.HEADING1);
      paragraph.replaceText('# ', '');
    }
    // Check for Heading 2
    else if (paragraphText.startsWith('## ')) {
      paragraph.setHeading(DocumentApp.ParagraphHeading.HEADING2);
      paragraph.replaceText('## ', '');
    }
    // Check for Heading 3
    else if (paragraphText.startsWith('### ')) {
      paragraph.setHeading(DocumentApp.ParagraphHeading.HEADING3);
      paragraph.replaceText('### ', '');
    }
    // Check for Heading 4
    else if (paragraphText.startsWith('#### ')) {
      paragraph.setHeading(DocumentApp.ParagraphHeading.HEADING4);
      paragraph.replaceText('#### ', '');
    }
    // Check for Bullet List
    else if (paragraphText.startsWith('* ') || paragraphText.startsWith('- ') || paragraphText.startsWith('+ ')) {
      paragraph.removeFromParent();
      body.insertListItem(i, paragraphText.substring(2)).setGlyphType(DocumentApp.GlyphType.BULLET);
    }

    var textObj = paragraph.editAsText(); // Get Text object for more detailed editing

    // Other formatting like headings and lists...

    // Bold Formatting
    var boldPattern = /\*\*(.*?)\*\*/g;
    applyMarkdownFormatting(textObj, boldPattern, DocumentApp.Attribute.BOLD);

    // Italic Formatting
    var italicPattern = /(\*|_)(.*?)\1/g;
    applyMarkdownFormatting(textObj, italicPattern, DocumentApp.Attribute.ITALIC);
  

  }
}

function applyMarkdownFormatting(textObj, regexPattern, attribute) {
  var match;
  while ((match = regexPattern.exec(textObj.getText())) !== null) {
    var startIndex = match.index;
    var endIndex = startIndex + match[0].length;
    textObj.deleteText(startIndex, endIndex - 1);
    textObj.insertText(startIndex, match[1]);
    textObj.setAttributes(startIndex, startIndex + match[1].length - 1, { [attribute]: true });
    regexPattern.lastIndex = startIndex + match[1].length; // Reset regex index to reflect text changes
  }
}

function onOpen() {
  var ui = DocumentApp.getUi(); // Or DocumentApp or FormApp.
  ui.createMenu('Markdown Menu')
      .addItem('Convert Markdown', 'menuItem1')
      .addToUi();
  
}

function menuItem1() {
  var run = main();
}
