import Image from "@tiptap/extension-image"
import { mergeAttributes } from "@tiptap/core"

export const ImageResize = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        renderHTML: (attributes) => {
          if (!attributes.width) {
            return {}
          }
          return {
            width: attributes.width,
          }
        },
        parseHTML: (element) => {
          const width = element.getAttribute("width")
          return width ? parseInt(width) : null
        },
      },
      height: {
        default: null,
        renderHTML: (attributes) => {
          if (!attributes.height) {
            return {}
          }
          return {
            height: attributes.height,
          }
        },
        parseHTML: (element) => {
          const height = element.getAttribute("height")
          return height ? parseInt(height) : null
        },
      },
    }
  },

  addNodeView() {
    return ({ node, HTMLAttributes, getPos, editor }) => {
      const img = document.createElement("img")
      const { src, alt, width, height } = node.attrs

      img.src = src
      img.alt = alt || ""
      img.style.maxWidth = "100%"
      img.style.height = "auto"
      img.style.cursor = "pointer"
      img.style.display = "block"
      img.style.margin = "1rem auto"

      if (width) {
        img.width = parseInt(String(width))
      }
      if (height) {
        img.height = parseInt(String(height))
      }

      Object.entries(mergeAttributes(HTMLAttributes)).forEach(([key, value]) => {
        if (value) {
          img.setAttribute(key, String(value))
        }
      })

      const container = document.createElement("div")
      container.style.position = "relative"
      container.style.display = "inline-block"
      container.style.maxWidth = "100%"
      container.style.margin = "1rem 0"
      container.appendChild(img)

      const resizeHandle = document.createElement("div")
      resizeHandle.style.position = "absolute"
      resizeHandle.style.right = "0"
      resizeHandle.style.bottom = "0"
      resizeHandle.style.width = "16px"
      resizeHandle.style.height = "16px"
      resizeHandle.style.background = "rgb(59, 130, 246)"
      resizeHandle.style.border = "2px solid white"
      resizeHandle.style.borderRadius = "4px"
      resizeHandle.style.cursor = "nwse-resize"
      resizeHandle.style.display = "none"
      resizeHandle.style.zIndex = "10"
      container.appendChild(resizeHandle)

      let isResizing = false
      let startX = 0
      let startY = 0
      let startWidth = 0
      let startHeight = 0

      const handleMouseDown = (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        isResizing = true
        startX = e.clientX
        startY = e.clientY
        startWidth = img.offsetWidth
        startHeight = img.offsetHeight
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
      }

      const handleMouseMove = (e: MouseEvent) => {
        if (!isResizing) return
        e.preventDefault()
        const diffX = e.clientX - startX
        const aspectRatio = startHeight / startWidth
        const newWidth = Math.max(100, Math.min(startWidth + diffX, 1200))
        const newHeight = newWidth * aspectRatio

        img.style.width = `${newWidth}px`
        img.style.height = `${newHeight}px`
        img.removeAttribute("width")
        img.removeAttribute("height")
      }

      const handleMouseUp = () => {
        if (!isResizing) return
        isResizing = false
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)

        const pos = getPos()
        if (typeof pos === "number") {
          const newWidth = parseInt(img.style.width) || img.offsetWidth
          const newHeight = parseInt(img.style.height) || img.offsetHeight

          editor.commands.updateAttributes("image", {
            width: newWidth,
            height: newHeight,
          })
        }

        if (resizeHandle) {
          resizeHandle.style.display = "none"
        }
      }

      img.addEventListener("mouseenter", () => {
        if (!isResizing) {
          resizeHandle.style.display = "block"
        }
      })

      container.addEventListener("mouseleave", () => {
        if (!isResizing) {
          resizeHandle.style.display = "none"
        }
      })

      resizeHandle.addEventListener("mousedown", handleMouseDown)

      return {
        dom: container,
        update: (updatedNode) => {
          if (updatedNode.type.name !== "image") {
            return false
          }

          const { src: newSrc, alt: newAlt, width: newWidth, height: newHeight } = updatedNode.attrs

          if (img.src !== newSrc) {
            img.src = newSrc
          }
          if (img.alt !== (newAlt || "")) {
            img.alt = newAlt || ""
          }

          if (newWidth && parseInt(String(newWidth)) !== img.offsetWidth) {
            img.style.width = `${newWidth}px`
            img.removeAttribute("width")
          }
          if (newHeight && parseInt(String(newHeight)) !== img.offsetHeight) {
            img.style.height = `${newHeight}px`
            img.removeAttribute("height")
          }

          return true
        },
      }
    }
  },
})

