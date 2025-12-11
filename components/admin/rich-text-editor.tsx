"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import Placeholder from "@tiptap/extension-placeholder"
import TextAlign from "@tiptap/extension-text-align"
import { Color } from "@tiptap/extension-color"
import { TextStyle } from "@tiptap/extension-text-style"
import Highlight from "@tiptap/extension-highlight"
import { Table } from "@tiptap/extension-table"
import { TableRow } from "@tiptap/extension-table-row"
import { TableCell } from "@tiptap/extension-table-cell"
import { TableHeader } from "@tiptap/extension-table-header"
import Blockquote from "@tiptap/extension-blockquote"
import CodeBlock from "@tiptap/extension-code-block"
import HorizontalRule from "@tiptap/extension-horizontal-rule"
import Underline from "@tiptap/extension-underline"
import Strike from "@tiptap/extension-strike"
import { ImageResize } from "@/lib/tiptap/image-resize"
import { useEffect, useRef, useState } from "react"
import { createClient } from "@/lib/supabase/client"

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
  placeholder?: string
}

export function RichTextEditor({ content, onChange, placeholder = "Start writing..." }: RichTextEditorProps) {
  const supabase = createClient()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        codeBlock: false,
        blockquote: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-foreground underline hover:text-foreground/80",
        },
      }),
      ImageResize.configure({
        HTMLAttributes: {
          class: "max-w-full rounded-lg",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Color,
      TextStyle,
      Highlight.configure({
        multicolor: true,
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "border-collapse border border-border/50",
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: "border border-border/50",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: "border border-border/50 p-2",
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: "border border-border/50 p-2 bg-card/50 font-bold",
        },
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: "border-l-4 border-border pl-4 italic my-4",
        },
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: "bg-card/50 p-4 rounded-lg font-mono text-sm my-4",
        },
      }),
      HorizontalRule.configure({
        HTMLAttributes: {
          class: "my-8 border-t border-border",
        },
      }),
      Underline,
      Strike,
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
      editor.commands.setContent(content, false)
    }
  }, [content, editor])

  const handleImageUpload = async (file: File) => {
    if (!file) return

    setUploading(true)
    try {
      const fileExt = file.name.split(".").pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `article-images/${fileName}`

      const { error: uploadError, data } = await supabase.storage.from("article_images").upload(filePath, file)

      if (uploadError) throw uploadError

      const {
        data: { publicUrl },
      } = supabase.storage.from("article_images").getPublicUrl(data.path)

      editor?.chain().focus().setImage({ src: publicUrl }).run()
    } catch (error: any) {
      alert("Error uploading image: " + error.message)
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const addImageFromUrl = () => {
    const url = window.prompt("Enter image URL:")
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run()
    }
  }

  const addLink = () => {
    const previousUrl = editor?.getAttributes("link").href
    const url = window.prompt("Enter URL:", previousUrl)

    if (url === null) return

    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run()
      return
    }

    editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }

  const insertTable = () => {
    editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  }

  const addRowBefore = () => {
    editor?.chain().focus().addRowBefore().run()
  }

  const addRowAfter = () => {
    editor?.chain().focus().addRowAfter().run()
  }

  const deleteRow = () => {
    editor?.chain().focus().deleteRow().run()
  }

  const addColumnBefore = () => {
    editor?.chain().focus().addColumnBefore().run()
  }

  const addColumnAfter = () => {
    editor?.chain().focus().addColumnAfter().run()
  }

  const deleteColumn = () => {
    editor?.chain().focus().deleteColumn().run()
  }

  const deleteTable = () => {
    editor?.chain().focus().deleteTable().run()
  }

  const setTextColor = (color: string) => {
    editor?.chain().focus().setColor(color).run()
  }

  const setHighlightColor = (color: string) => {
    editor?.chain().focus().toggleHighlight({ color }).run()
  }

  if (!editor) {
    return null
  }

  const isTableSelected = editor.isActive("table")

  return (
    <div className="border border-border/50 rounded-lg bg-card/30 backdrop-blur-sm overflow-hidden">
      {/* Toolbar */}
      <div className="border-b border-border/50 p-3 bg-card/50">
        {/* First Row - Text Formatting */}
        <div className="flex flex-wrap gap-2 mb-2">
          {/* Text Style Group */}
          <div className="flex items-center gap-1 border-r border-border/30 pr-2 mr-2">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              className={`p-2 rounded hover:bg-foreground/10 transition-colors ${
                editor.isActive("bold") ? "bg-foreground/20" : ""
              }`}
              title="Bold (Cmd+B)"
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
              title="Italic (Cmd+I)"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 3v2h1.958l-2.8 8H5v2h6v-2H9.042l2.8-8H13V3H8z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`p-2 rounded hover:bg-foreground/10 transition-colors ${
                editor.isActive("underline") ? "bg-foreground/20" : ""
              }`}
              title="Underline (Cmd+U)"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 4a1 1 0 011 1v5a3 3 0 006 0V5a1 1 0 112 0v5a5 5 0 11-10 0V5a1 1 0 011-1zm-1 12a1 1 0 100 2h12a1 1 0 100-2H4z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`p-2 rounded hover:bg-foreground/10 transition-colors ${
                editor.isActive("strike") ? "bg-foreground/20" : ""
              }`}
              title="Strikethrough"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm2 5a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Heading Group */}
          <div className="flex items-center gap-1 border-r border-border/30 pr-2 mr-2">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={`p-2 rounded hover:bg-foreground/10 transition-colors text-xs font-bold ${
                editor.isActive("heading", { level: 1 }) ? "bg-foreground/20" : ""
              }`}
              title="Heading 1"
            >
              H1
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`p-2 rounded hover:bg-foreground/10 transition-colors text-xs font-bold ${
                editor.isActive("heading", { level: 2 }) ? "bg-foreground/20" : ""
              }`}
              title="Heading 2"
            >
              H2
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={`p-2 rounded hover:bg-foreground/10 transition-colors text-xs font-bold ${
                editor.isActive("heading", { level: 3 }) ? "bg-foreground/20" : ""
              }`}
              title="Heading 3"
            >
              H3
            </button>
          </div>

          {/* Lists Group */}
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

          {/* Text Alignment Group */}
          <div className="flex items-center gap-1 border-r border-border/30 pr-2 mr-2">
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              className={`p-2 rounded hover:bg-foreground/10 transition-colors ${
                editor.isActive({ textAlign: "left" }) ? "bg-foreground/20" : ""
              }`}
              title="Align Left"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h8a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign("center").run()}
              className={`p-2 rounded hover:bg-foreground/10 transition-colors ${
                editor.isActive({ textAlign: "center" }) ? "bg-foreground/20" : ""
              }`}
              title="Align Center"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm2 4a1 1 0 000 2h10a1 1 0 100-2H5zm-2 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm2 4a1 1 0 000 2h8a1 1 0 100-2H5z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              className={`p-2 rounded hover:bg-foreground/10 transition-colors ${
                editor.isActive({ textAlign: "right" }) ? "bg-foreground/20" : ""
              }`}
              title="Align Right"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm4 4a1 1 0 011-1h8a1 1 0 110 2H8a1 1 0 01-1-1zm-4 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm4 4a1 1 0 011-1h8a1 1 0 110 2H8a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Color Picker Group */}
          <div className="flex items-center gap-1 border-r border-border/30 pr-2 mr-2">
            <div className="relative group">
              <button
                type="button"
                className="p-2 rounded hover:bg-foreground/10 transition-colors"
                title="Text Color"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div className="absolute left-0 top-full mt-1 p-2 bg-card border border-border rounded-lg shadow-lg z-50 hidden group-hover:block grid grid-cols-8 gap-1">
                {["#000000", "#ffffff", "#ef4444", "#f59e0b", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6"].map(
                  (color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setTextColor(color)}
                      className="w-6 h-6 rounded border border-border/50 hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ),
                )}
              </div>
            </div>
            <div className="relative group">
              <button
                type="button"
                className={`p-2 rounded hover:bg-foreground/10 transition-colors ${
                  editor.isActive("highlight") ? "bg-foreground/20" : ""
                }`}
                title="Highlight Color"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <div className="absolute left-0 top-full mt-1 p-2 bg-card border border-border rounded-lg shadow-lg z-50 hidden group-hover:block grid grid-cols-8 gap-1">
                {["#fef08a", "#fed7aa", "#fecaca", "#ddd6fe", "#c7d2fe", "#bfdbfe", "#bae6fd", "#a5f3fc"].map(
                  (color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setHighlightColor(color)}
                      className="w-6 h-6 rounded border border-border/50 hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Insert Group */}
          <div className="flex items-center gap-1 border-r border-border/30 pr-2 mr-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleImageUpload(file)
              }}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="p-2 rounded hover:bg-foreground/10 transition-colors disabled:opacity-50"
              title="Upload Image"
            >
              {uploading ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
            <button
              type="button"
              onClick={addImageFromUrl}
              className="p-2 rounded hover:bg-foreground/10 transition-colors"
              title="Insert Image from URL"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
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
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`p-2 rounded hover:bg-foreground/10 transition-colors ${
                editor.isActive("blockquote") ? "bg-foreground/20" : ""
              }`}
              title="Blockquote"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V7a1 1 0 112 0v3.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              className="p-2 rounded hover:bg-foreground/10 transition-colors"
              title="Horizontal Rule"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={`p-2 rounded hover:bg-foreground/10 transition-colors ${
                editor.isActive("codeBlock") ? "bg-foreground/20" : ""
              }`}
              title="Code Block"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={insertTable}
              className="p-2 rounded hover:bg-foreground/10 transition-colors"
              title="Insert Table"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </button>
          </div>

          {/* Undo/Redo */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().chain().focus().undo().run()}
              className="p-2 rounded hover:bg-foreground/10 transition-colors disabled:opacity-50"
              title="Undo (Cmd+Z)"
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
              title="Redo (Cmd+Shift+Z)"
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
        </div>

        {/* Second Row - Table Controls (shown when table is selected) */}
        {isTableSelected && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-border/30">
            <span className="text-xs text-muted-foreground self-center mr-2">Table:</span>
            <button
              type="button"
              onClick={addRowBefore}
              className="px-2 py-1 text-xs rounded hover:bg-foreground/10 transition-colors"
            >
              Add Row Above
            </button>
            <button
              type="button"
              onClick={addRowAfter}
              className="px-2 py-1 text-xs rounded hover:bg-foreground/10 transition-colors"
            >
              Add Row Below
            </button>
            <button
              type="button"
              onClick={deleteRow}
              className="px-2 py-1 text-xs rounded hover:bg-foreground/10 transition-colors"
            >
              Delete Row
            </button>
            <button
              type="button"
              onClick={addColumnBefore}
              className="px-2 py-1 text-xs rounded hover:bg-foreground/10 transition-colors"
            >
              Add Column Left
            </button>
            <button
              type="button"
              onClick={addColumnAfter}
              className="px-2 py-1 text-xs rounded hover:bg-foreground/10 transition-colors"
            >
              Add Column Right
            </button>
            <button
              type="button"
              onClick={deleteColumn}
              className="px-2 py-1 text-xs rounded hover:bg-foreground/10 transition-colors"
            >
              Delete Column
            </button>
            <button
              type="button"
              onClick={deleteTable}
              className="px-2 py-1 text-xs rounded hover:bg-destructive/20 text-destructive transition-colors"
            >
              Delete Table
            </button>
          </div>
        )}
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  )
}
