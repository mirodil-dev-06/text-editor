import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { saveAs } from 'file-saver';
import { htmlToText } from 'html-to-text';
import './Main.css';
import { FaCopy, FaSave } from 'react-icons/fa'; 

const Main = () => {
    const [value, setValue] = useState('');
    const [copied, setCopied] = useState(false);

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
            ['link', 'image', 'video', 'formula'],
            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean']                                         // remove formatting button
        ]
    };

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 5000);
    };

    const handleSave = () => {
        const text = htmlToText(value, {
            wordwrap: 130
        });
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, 'untitled.txt');
    };

    return (
        <div className="">
                <h1>React Text Editor</h1>
                <ReactQuill value={value} onChange={setValue} modules={modules} />
                <CopyToClipboard text={htmlToText(value)} onCopy={handleCopy}>
                    <button><FaCopy/></button>
                </CopyToClipboard>
                {copied ? <span style={{ color: 'green' }}>Copied!</span> : null}
                <button onClick={handleSave}><FaSave/></button>
        </div>
    );
}

export default Main;
