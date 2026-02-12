import { Thread } from "../../models/Thread.js";

export async function getThreads(currentPage){
    const threads = await Thread.find().sort({createAt: -1}).limit(10)

    return {threads}
}