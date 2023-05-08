import * as React from 'react';
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import InlineEditor from "@ckeditor/ckeditor5-build-inline";
import BalloonEditor from "@ckeditor/ckeditor5-build-balloon";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
function getEditor(editor: string) {
  switch (editor) {
    case "classic":
      return ClassicEditor;
    case "balloon":
      return BalloonEditor;
    case "inline":
      return InlineEditor;
    case "document":
      return DecoupledEditor;
    default:
      return ClassicEditor;
  }
}
interface IAllCkEditorProps extends React.HTMLAttributes<Element> {
  editor?: any;
  html?: any;
}
class AllCkEditor extends React.Component<IAllCkEditorProps, {}> {
  render() {
    return (
      <CKEditor
        editor={getEditor(this.props.editor)}
        data={this.props.html}
        onInit={(editor: any) => {
          if (this.props.editor === "document") {
            const toolbarContainer = document.querySelector(
              ".document-editor__toolbar"
            );
            toolbarContainer.appendChild(editor.ui.view.toolbar.element);
            //window.editor = editor;
          }
          // console.log( 'Editor is ready to use!', editor );
        }}
        onChange={(event: any, editor: any) => {
          // const data = editor.getData();
          // console.log( { event, editor, data } );
        }}
        onBlur={(editor: any) => {
          // console.log( 'Blur.', editor );
        }}
        onFocus={(editor: any) => {
          // console.log( 'Focus.', editor );
        }}
      />
    );
  }
}
export default AllCkEditor;
