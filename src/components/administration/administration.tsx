import ContentForm from "./contentComp/content"
import TextForm from "./textComp/text"
import Videoadm from "./videoComp/video"

const Administration = () => {
    return (
        <>
            <TextForm />
            <Videoadm/>
            <ContentForm />
        </>
    )
}

export default Administration