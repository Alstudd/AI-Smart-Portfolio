import { LangChainStream, StreamingTextResponse } from "ai"
import { ChatOpenAI } from "@langchain/openai"
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { createStuffDocumentsChain } from "langchain/chains/combine_documents"
import { getVectorStore } from "@/lib/astradb"
import { createRetrievalChain } from "langchain/chains/retrieval"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const messages = body.messages

        const currentMessageContent = messages[messages.length - 1].content

        const { stream, handlers } = LangChainStream()

        const chatModel = new ChatOpenAI({
            modelName: 'gpt-3.5-turbo',
            streaming: true,
            callbacks: [handlers],
            verbose: true,
        })

        const prompt = ChatPromptTemplate.fromMessages([
            [
                "system",
                "You are Alstudd, a chatbot for Alston's personal portfolio website. You impersonate the website's owner that is Alston. " +
                "Answer the user's questions based on the below context. " +
                "Whenever it makes sense, provide links to pages that contain more information about the topic from the given context. " +
                "Format your messages in markdown format.\n\n" +
                "Context: \n{context}",
            ],
            [
                "user",
                "{input}",
            ]
        ])

        const combineDocsChain = await createStuffDocumentsChain({
            llm: chatModel,
            prompt,
        })

        const retriever = (await getVectorStore()).asRetriever(); // const retriever = (await getVectorStore()).asRetriever(10); // 10 is the number of documents to retrieve // By default, it retrieves 4 documents (we anyways have only 4 documents in the vector store for now)

        const retrievalChain = await createRetrievalChain({
            combineDocsChain,
            retriever,
        })

        retrievalChain.invoke({
            input: currentMessageContent
        })

        return new StreamingTextResponse(stream)
    } catch (error) {
        console.error(error)
        return Response.json({ error: "Internal server error" })
    }
}