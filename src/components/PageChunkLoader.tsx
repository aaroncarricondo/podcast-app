import { Spin } from "antd";
import { useEffect } from "react";
import { useAppSettings } from "../contexts/AppSettings";

import '../styles/pageChunkLoader.css';

const pageChunkLoadingKey = "pageChunkLoading";

const PageChunkLoader = () => {
    const { addOperation, removeOperation } = useAppSettings();

    useEffect(() => {
        addOperation(pageChunkLoadingKey);
        return () => {
            removeOperation(pageChunkLoadingKey);
        };
    }, []);

    return (
        <Spin className="page-chunk-loader-spin" size="large" />
    );
};

export default PageChunkLoader;