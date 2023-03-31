import './ImageHoverZoom.css'

const ImageHoverZoom = ({ imagePath }) => {
    return (
        <div className="img-wrapper">
            <img
                src={imagePath}
                alt=""
                className="hover-zoom"
            />
        </div>
    );
};
export default ImageHoverZoom;
