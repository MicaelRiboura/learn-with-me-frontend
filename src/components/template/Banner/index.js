import { useEffect, useState } from 'react';
import './styles.css';

import videoBg from '../../assets/bannerVideo.mp4';
import BaseContainer from '../BaseContainer';

export default function Banner() {

    const [play, setPlay] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setPlay(true);
        }, 1000);
    }, []);

    return (
        <div className="banner-container">
            <video
                src={videoBg}
                className="video"
                controls
                autoPlay={true}
                loop={true}
                muted={true}
            />
            <BaseContainer>
            <div class="hero-area">
                <h1 className="hero-title"><span>Compartilhe</span> seus estudos e <span>aprenda</span> com outras pessoas.</h1>
            </div>
            </BaseContainer>
        </div>
    );
}
