"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import Placeholder from "@tiptap/extension-placeholder"
import { useEffect } from "react"

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
  placeholder?: string
}

export function RichTextEditor({ content, onChange, placeholder = "Start writing..." }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-foreground underline hover:text-foreground/80",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full rounded-lg",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: "prose prose-invert max-w-none focus:outline-none min-h-[400px] px-4 py-3 text-foreground",
      },
    },
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  if (!editor) {
    return null
  }

  const addImage = () => {
    const url = window.prompt("Enter image URL:")
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const addLink = () => {
    const url = window.prompt("Enter URL:")
    if (url) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
    }
  }

  return (
    <div className="border border-border/50 rounded-lg bg-card/30 backdrop-blur-sm overflow-hidden">
      {/* Toolbar */}
      <div className="border-b border-border/50 p-3 flex flex-wrap gap-2 bg-card/50">
        <div className="flex items-center gap-1 border-r border-border/30 pr-2 mr-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-foreground/10 transition-colors ${
              editor.isActive("bold") ? "bg-foreground/20" : ""
            }`}
            title="Bold"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a1 1 0 000 2h.423a3 3 0 012.976 2.527l.177.885H5a1 1 0 000 2h3.576a3 3 0 01-2.976 2.527l-.177.885H5a1 1 0 100 2h5a1 1 0 001-1V4a1 1 0 00-1-1H5z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-foreground/10 transition-colors ${
              editor.isActive("italic") ? "bg-foreground/20" : ""
            }`}
            title="Italic"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 3v2h1.958l-2.8 8H5v2h6v-2H9.042l2.8-8H13V3H8z" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-1 border-r border-border/30 pr-2 mr-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-2 rounded hover:bg-foreground/10 transition-colors ${
              editor.isActive("heading", { level: 1 }) ? "bg-foreground/20" : ""
            }`}
            title="Heading 1"
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-2 rounded hover:bg-foreground/10 transition-colors ${
              editor.isActive("heading", { level: 2 }) ? "bg-foreground/20" : ""
            }`}
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`p-2 rounded hover:bg-foreground/10 transition-colors ${
              editor.isActive("heading", { level: 3 }) ? "bg-foreground/20" : ""
            }`}
            title="Heading 3"
          >
            H3
          </button>
        </div>

        <div className="flex items-center gap-1 border-r border-border/30 pr-2 mr-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-foreground/10 transition-colors ${
              editor.isActive("bulletList") ? "bg-foreground/20" : ""
            }`}
            title="Bullet List"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 100 2 1 1 0 000-2zM6 5a1 1 0 011-1h10a1 1 0 110 2H7a1 1 0 01-1-1zM3 9a1 1 0 100 2 1 1 0 000-2zM6 10a1 1 0 011-1h10a1 1 0 110 2H7a1 1 0 01-1-1zM3 14a1 1 0 102 0 1 1 0 00-2 0zM6 15a1 1 0 011-1h10a1 1 0 110 2H7a1 1 0 01-1-1z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-foreground/10 transition-colors ${
              editor.isActive("orderedList") ? "bg-foreground/20" : ""
            }`}
            title="Numbered List"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h1a1 1 0 011 1v1a1 1 0 01-1 1H5v2h1a1 1 0 110 2H5a1 1 0 01-1-1V7a1 1 0 00-1-1H2a1 1 0 010-2h1a1 1 0 011 1v1zM9 4a1 1 0 010-2h8a1 1 0 110 2H9zM3 10a1 1 0 011-1h1a1 1 0 011 1v1a1 1 0 01-1 1H5v2h1a1 1 0 110 2H5a1 1 0 01-1-1v-1a1 1 0 00-1-1H2a1 1 0 010-2h1a1 1 0 011-1v-1zM9 10a1 1 0 010-2h8a1 1 0 110 2H9z" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-1 border-r border-border/30 pr-2 mr-2">
          <button
            type="button"
            onClick={addLink}
            className={`p-2 rounded hover:bg-foreground/10 transition-colors ${
              editor.isActive("link") ? "bg-foreground/20" : ""
            }`}
            title="Add Link"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={addImage}
            className="p-2 rounded hover:bg-foreground/10 transition-colors"
            title="Add Image"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="p-2 rounded hover:bg-foreground/10 transition-colors disabled:opacity-50"
          title="Undo"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="p-2 rounded hover:bg-foreground/10 transition-colors disabled:opacity-50"
          title="Redo"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  )
}

