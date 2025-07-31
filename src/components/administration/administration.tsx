import Videoadm from "./videoComp/video"
import ContentForm from "./contentComp/content.tsx";
import { Link } from "react-router-dom";
import { LoginOutlined } from '@ant-design/icons';

const Administration = () => {
    return (
        <>
            <div className="flex items-center justify-between mx-4 sm:mx-9 mb-8 mt-6 sm:mt-9 gap-2">
                <Link 
                    to="/dashboard" 
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1.5 px-2 sm:py-2 sm:px-4 rounded-lg transition-colors duration-200 flex items-center gap-1 sm:gap-2 text-xs sm:text-base flex-shrink-0"
                >
                    <LoginOutlined style={{ transform: 'scaleX(-1)', fontSize: '14px' }} className="sm:text-base" />
                    <span className="hidden sm:inline">Página principal</span>
                    <span className="sm:hidden">  Página 
                        <br/>
                        principal</span>
                </Link>
                
                <h1 className="text-purple-800 text-lg sm:text-2xl lg:text-3xl font-bold text-center flex-1 px-2">
                    Panel de Administración
                </h1>
                
                <div className="w-8 sm:w-16 lg:w-32 flex-shrink-0"></div>
            </div>
            
            <Videoadm/>
            <ContentForm/>
        </>
    )
}

export default Administration