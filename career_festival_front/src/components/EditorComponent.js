import React, { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
class EditorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorWidth: "100%", // 기본 너비를 전체 화면 너비로 설정합니다.
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize(); // 컴포넌트가 마운트될 때 너비를 갱신합니다.
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    const newWidth = window.innerWidth * 0.5;
    this.setState({ editorWidth: newWidth });
  };

  modules = {
    toolbar: [
      //[{ 'font': [] }],
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
      ["clean"],
    ],
  };

  formats = [
    //'font',
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background",
  ];

  render() {
    const { value, onChange } = this.props;
    return (
      <div style={{ height: "350px" }}>
        <ReactQuill
          style={{ height: "280px" }}
          theme="snow"
          modules={this.modules}
          formats={this.formats}
          value={value || ""}
          onChange={(content, delta, source, editor) =>
            onChange(editor.getHTML())
          }
        />
      </div>
    );
  }
}
export default EditorComponent;
