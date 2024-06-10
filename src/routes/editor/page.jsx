import React, { useRef, useState, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import { ChartBlock } from "../../components/editor-page/Chart";
import { fetchGetStockData } from "../../lib/apis/stock";

export default function EditorPage() {
  // const [stockData, setStockData] = useState(null);

  const ejInstance = useRef();

  const fetchData = async () => {
    try {
      // const data = await fetchGetStockData();

      if (data) {
        // setStockData(data);
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      onChange: async () => {
        let content = await editor.saver.save();

        console.log(content);
      },
      tools: {
        header: Header,
        // image: ImageBlock,
        char: ChartBlock,
      },
      // data: DEFAULT_INITIAL_DATA,
    });
  };

  useEffect(() => {
    // fetchData();

    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  return (
    <div style={{ width: "700px", paddingLeft: "50px" }} id="editorjs">
      Test
    </div>
  );
}
