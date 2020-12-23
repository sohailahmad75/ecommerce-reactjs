import React from "react";
import { API } from "../config";
import '../styles/Styles.scss';
const RelatedImage = ({ item, url, singleImage }) => (
    <div className={'related-image'}>
        <img
            src={`${API}/${url}/photo/${item._id}`}
            alt={item.name}
            style={{ maxHeight: "100%", maxWidth: "100%",     borderRadius: "3px" }}
        />
    </div>
);

export default RelatedImage;
