import React, {useState} from 'react';
import './App.css';
import PropTypes from 'prop-types';
import {isWeiXin} from "../../utils/navigatorUtils";
import PresetModalViewer from "../../containers/preset/PresetModalViewer";

const WxMessage = () => {
    if (isWeiXin()) {
        return (
            <div className="note-font" id="wx-message-inner">
                当前客户端不支持下载 SVG，<br />
                请下载 JPG 并长按二维码保存。
            </div>
        )
    }
    return null
}

const ImgBox = ({ imgData }) => {
    if (imgData.length > 0) {
        return (
            <div id="dl-image">
                <div id="dl-image-inner">
                    <img id="dl-image-inner-jpg" src={imgData} alt="长按保存二维码" />
                </div>
            </div>
        )
    }
    return null
}

const PartDownload = ({ value, downloadCount, onSvgDownload, onImgDownload, savePreset }) => {
    const [imgData, setImgData] = useState('');
    const [visible, setVisible] = useState(false);

    return (
        <div className="Qr-titled">
        <div className="Qr-Centered title-margin">
            <div className="Qr-s-title">Downloads</div>
            <p className="Qr-s-subtitle">
                下载二维码 — {value}
                <sup className="Gray"> {downloadCount}</sup>
            </p>
        </div>
        <div className="Qr-Centered">
            <PresetModalViewer visible={visible} onClose={() => setVisible(false)} />
            <div className="btn-row">
                <div className="div-btn img-dl-btn">
                    <button className="dl-btn" onClick={() => {onImgDownload("jpg").then(res => setImgData(res));}}>JPG</button>
                    <button className="dl-btn" onClick={() => {onImgDownload("png").then(res => setImgData(res));}}>PNG</button>
                    <button className="dl-btn" onClick={onSvgDownload}>SVG</button>

                    <button className="dl-btn" onClick={() => setVisible(true)}>管理预设</button>
                    <button className="dl-btn" onClick={savePreset}>保存预设</button>
                </div>
            </div>
            <div id="wx-message">
                <WxMessage/>
            </div>
            <div>
                <ImgBox imgData={imgData} />
            </div>
        </div>
    </div>
    );
}

PartDownload.propTypes = {
    value: PropTypes.string.isRequired,
    downloadCount: PropTypes.number,
    onSvgDownload: PropTypes.func.isRequired,
    onImgDownload: PropTypes.func.isRequired,
}

export default PartDownload;
