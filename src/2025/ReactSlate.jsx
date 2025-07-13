import React, { useEffect, useMemo, useState } from 'react';
import { createEditor, Transforms, Editor } from 'slate';
import { withReact } from 'slate-react';
import {
    Editable,
    Slate,
    useSlateStatic,
} from 'slate-react';

// "slate": "^0.94.1",
// "slate-react": "^0.94.1",
// 自定义编辑器增强：设置节点为内联和 void
const withInlines = (editor) => {
    const { isInline, isVoid } = editor;

    editor.isInline = (element) => {
        return element.type === 'customSpan' || isInline(element);
    };

    editor.isVoid = (element) => {
        return element.type === 'customSpan' || isVoid(element);
    };

    return editor;
};

// 自定义 span 节点渲染组件
const CustomSpanElement = ({ element, attributes }) => {
    return (
        <span
            {...attributes}
            style={{
                backgroundColor: 'yellow',
                padding: '2px',
                border: '1px solid #ccc',
                pointerEvents: 'none',
            }}
        >
      {element.content || 'Inserted span'}
    </span>
    );
};

// 渲染不同类型的元素
const renderElement = ({ element, children, attributes }) => {
    switch (element.type) {
        case 'customSpan':
            return <CustomSpanElement element={element} attributes={attributes} />;
        default:
            return <p {...attributes}>{children}</p>;
    }
};

// 插入按钮组件
const InsertSpanButton = () => {
    const editor = useSlateStatic();

    const insertSpan = () => {
        Transforms.insertNodes(editor, {
            type: 'customSpan',
            content: 'Inserted span',
            children: [{ text: '' }],
        });
    };

    return <button onClick={insertSpan}>Insert Span</button>;
};

// 提交按钮组件
const SubmitButton = () => {
    const editor = useSlateStatic();

    const handleSubmit = async () => {
        // 获取当前编辑器内容
        const content = editor.children;

        // 也可以将内容转换为 HTML（可选）
        const html = slateToHtml(content);
        console.log('fuck content:', content);
        console.log('fuck html:', html);

        // 提交到服务端
        try {
            const response = await fetch('https://api.example.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content, html }),
            });

            if (response.ok) {
                alert('提交成功！');
            } else {
                alert('提交失败，请重试。');
            }
        } catch (error) {
            console.error('提交出错:', error);
        }
    };

    return <button onClick={handleSubmit}>Submit</button>;
};

// 将 Slate 内容转换为 HTML（示例）
const slateToHtml = (nodes) => {
    const parser = new DOMParser();
    const serializer = new XMLSerializer();

    const htmlNode = nodes.map((node) => {
        if (node.type === 'customSpan') {
            return `<span style="background-color: yellow; border: 1px solid #ccc; pointer-events: none;">${node.content}</span>`;
        } else if (node.type === 'paragraph') {
            return `<p>${node.children[0].text}</p>`;
        } else {
            return `<p>Unknown node</p>`;
        }
    });

    return htmlNode.join('');
};

const INIT_VALUE = [
    {
        "type": "paragraph",
        "children": [
            {
                "text": "1"
            },
            {
                "type": "customSpan",
                "content": "Inserted span",
                "children": [
                    {
                        "text": ""
                    }
                ]
            },
            {
                "text": ""
            }
        ]
    }
];

// 主组件
const App = () => {
    const editor = useMemo(() => withInlines(withReact(createEditor())), []);
    const initValue = [{ type: 'paragraph', children: [{ text: '' }] }];
    const [editorValue, setEditorValue] = useState(initValue);
    const [hasInitialValue, setHasInitialValue] = useState(false);

    useEffect(() => {
        new Promise(r => {
            setTimeout(() => r(INIT_VALUE), 1000);
        })
            .then(res => {
                console.log('fuck after 1000ms, res:', res);
                setEditorValue(res);
                setHasInitialValue(true);
            });
    }, []);

    return (
        <Slate key={hasInitialValue ? 0 : 1} editor={editor} value={editorValue} onChange={value => setEditorValue(value)}>
            <div style={{ margin: '20px' }}>
                <InsertSpanButton />
                <SubmitButton />
                <div style={{ border: '1px solid #ddd', padding: '10px' }}>
                    <Editable
                        renderElement={renderElement}
                        placeholder="Start typing..."
                    />
                </div>
            </div>
        </Slate>
    );
};

export default App;
