import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter";
import { srcery } from "react-syntax-highlighter/dist/esm/styles/hljs";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";

const SyntaxHighlighterComp = (props) => {
  const [text, setText] = useState("Copy to Clipboard");
  return (
    <Box sx={{ borderRadius: 1, overflow: "hidden" }}>
      <Box
        sx={{
          background: "#30333e",
          color: "#ffffff69",
          px: 2,
          py: 1,
          mb: -1.6,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography>{props.fileName}</Typography>
        <Typography
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => {
            navigator.clipboard.writeText(props.code.trim());
            setText("Copied");
            setTimeout(() => {
              setText("Copy to Clipboard");
            }, 3000);
          }}
        >
          {text === "Copied" ? (
            <DoneIcon sx={{ mr: 1 }} fontSize="small" />
          ) : (
            <ContentCopyIcon sx={{ mr: 1 }} fontSize="small" />
          )}
          {text}
        </Typography>
      </Box>
      <SyntaxHighlighter
        language="jsx"
        style={srcery}
        showLineNumbers={true}
        wrapLines={true}
      >
        {props.code.trim()}
      </SyntaxHighlighter>
    </Box>
  );
};

export default SyntaxHighlighterComp;
