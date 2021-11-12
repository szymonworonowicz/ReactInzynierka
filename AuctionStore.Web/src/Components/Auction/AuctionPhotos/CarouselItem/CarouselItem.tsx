import React,{useState} from "react";
import {ICarouselItemProps} from '../../../../Interfaces/Auction/AuctionPhoto/'
import Popper from '../../../../shared/Popper/Popper';
import LargePhoto from './LargePhoto/LargePhoto';



const CarouselItem: React.FC<ICarouselItemProps> = ({photo}) => {
    const [openLarge, setOpenLarge] = useState<boolean>(false);

    const handleCloseModal = () : void => {
        setOpenLarge(false);
    }

    const handlePhotoClick = () : void => {
        setOpenLarge(true);
    }

    return (
        <>
            <Popper 
                open={openLarge}
                showCancel={false}
                showSave={false}
                onCancel={handleCloseModal}
                maxWidth='lg'
                title=''
                body={<LargePhoto photo={photo} />}
            />
            <img  alt='' src={photo} onClick={handlePhotoClick}/>
        </>
    )
}

export default CarouselItem;