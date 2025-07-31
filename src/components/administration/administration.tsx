import Videoadm from "./videoComp/video"
import ContentForm from "./contentComp/content.tsx";
import { Link } from "react-router-dom";
import { LoginOutlined } from '@ant-design/icons';

const Administration = () => {
    return (
        <>
            <div className="flex items-center justify-between ml-9 mr-9 mb-8 mt-9">
                <Link 
                    to="/dashboard" 
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                    <LoginOutlined style={{ transform: 'scaleX(-1)' }} />
                    Página principal
                </Link>
                <h1 className="text-purple-800 text-3xl font-bold">
                    Panel de Administración
                </h1>
                <div className="w-32"></div> {/* Espaciador para centrar el título */}
            </div>
            <Videoadm/>
            <ContentForm/>
        </>
    )
}

export default Administration