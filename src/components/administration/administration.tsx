import Videoadm from "./videoComp/video"
import ContentForm from "./contentComp/content.tsx";

const Administration = () => {
    return (
        <>
            <h1 className="text-center text-purple-800 text-3xl font-bold mb-8">
                Panel de Administración
            </h1>
            <Videoadm/>
            <ContentForm/>
        </>
    )
}

export default Administration