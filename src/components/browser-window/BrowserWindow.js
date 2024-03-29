import React from "react";
import ReactDOM from "react-dom";

function copyStyles(sourceDoc, targetDoc) {
  Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
    const styleElement = styleSheet.ownerNode.cloneNode(true);
    styleElement.href = styleSheet.href;
    targetDoc.head.appendChild(styleElement);
  });
  //   Array.from(sourceDoc.fonts).forEach(font => targetDoc.fonts.add(font));
  //   Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
  //     if (styleSheet.hasOwnProperty("cssRules")) {
  //       // true for inline styles
  //       const newStyleEl = targetDoc.createElement("style");
  //       Array.from(styleSheet.cssRules).forEach(cssRule => {
  //         newStyleEl.appendChild(targetDoc.createTextNode(cssRule.cssText));
  //       });
  //       targetDoc.head.appendChild(newStyleEl);
  //     } else if (styleSheet.href) {
  //       // true for stylesheets loaded from a URL
  //       const newLinkEl = targetDoc.createElement("link");
  //       newLinkEl.rel = "stylesheet";
  //       newLinkEl.href = styleSheet.href;
  //       targetDoc.head.appendChild(newLinkEl);
  //     }
  //   });
}

export class BrowserWindow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.containerEl = null;
    this.externalWindow = null;
  }

  componentDidMount() {
    // Create a new window, a div, and append it to the window
    // The div **MUST** be created by the window it is to be
    // appended to or it will fail in Edge with a "Permission Denied"
    // or similar error.
    // See: https://github.com/rmariuzzo/react-new-window/issues/12#issuecomment-386992550
    this.externalWindow = window.open(
      "",
      "",
      "width=600,height=400,left=200,top=200"
    );
    this.containerEl = this.externalWindow.document.createElement("div");
    this.externalWindow.document.body.appendChild(this.containerEl);

    this.externalWindow.document.title = "Service History";
    copyStyles(document, this.externalWindow.document);

    // update the state in the parent component if the user closes the
    // new window
    this.externalWindow.addEventListener("beforeunload", () => {
      this.props.closeBrowserWindow();
    });
  }

  componentWillUnmount() {
    // This will fire when this.state.showWindowPortal in the parent component becomes false
    // So we tidy up by just closing the window
    this.externalWindow.close();
  }

  render() {
    // The first render occurs before componentDidMount (where we open
    // the new window), so our container may be null, in this case
    // render nothing.
    if (!this.containerEl) {
      return null;
    }

    // Append props.children to the container <div> in the new window
    return ReactDOM.createPortal(this.props.children, this.containerEl);
  }
}
