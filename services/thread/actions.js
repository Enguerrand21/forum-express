import {Thread} from "../../models/Thread.js"
import {Post} from "../../models/Post.js"
import slugify from "slugify"
import {JSDOM} from "jsdom"
import createDOMPurify from "dompurify"

const window = new JSDOM("").window

const DOMPurify = createDOMPurify(window)

export async function createThread(threadTitle, firstPostContent){
    
        const baseSlug = slugify(threadTitle, {lower: true, strict: true})
        let slug = baseSlug
        let counter = 1
        
        while(await Thread.findOne({slug})) {
            slug = `${baseSlug}-${counter++}`
        }
    
        const newThread = new Thread({
            title : threadTitle,
            slug

        })

        await newThread.save()

        const HTMLPost = DOMPurify.sanitize(firstPostContent)

        const firstPost = new Post({
            thread: newThread._id,
            HTMLPost,
            postNumber: 1 
        })

        await firstPost.save()

        return {thread: newThread}
}