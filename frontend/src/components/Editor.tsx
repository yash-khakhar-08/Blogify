import ReactQuill from "react-quill-new"
import "quill/dist/quill.snow.css"
import {Quill} from "react-quill-new"
import ImageResize from 'quill-image-resize-module-react'
import { uploadImage } from "../features/blog/services/blog.service"
import toast from "react-hot-toast"
import { useRef } from "react"

interface EditorInput {
    content: string
    setContent: (val: string) => void
    token: string | null
    readonly: boolean
}

const Editor = (props: EditorInput) => {

    function imageHandler(this: { quill: any }) {

        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', 'image/*')
        input.click()

        input.onchange = async () => {
            if(input.files && input.files[0]){
                
                const file = input.files[0]
                const formData = new FormData()
                formData.append('image', file)

                try {

                    const res = await uploadImage(formData, props.token)
                    const url = res.url
                    
                    const quill = this.quill
                    const range = quill.getSelection()
                    quill.insertEmbed(range.index, 'image', url)
                    
                } catch (err) {
                    toast.error("Upload failed! Please try again.")
                    console.error('Upload failed ', err)
                }

            }
        }
    }

    Quill.register("modules/imageResize", ImageResize) 

    const modules = {
        toolbar: {
            container: [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                ['image', 'code-block'],
            ],
            handlers: {
                image: imageHandler
            }
        },
        clipboard: {matchVisual: false},
        imageResize: {},
    }

    const quillRef = useRef<ReactQuill>(null)

    return(<>

        <ReactQuill 
        ref={quillRef}
        value={props.content} 
        onChange={props.setContent} 
        theme="snow" 
        modules={modules} 
        placeholder="Start writing blog..."
        readOnly={props.readonly}
        />
        
    </>)
}

export default Editor