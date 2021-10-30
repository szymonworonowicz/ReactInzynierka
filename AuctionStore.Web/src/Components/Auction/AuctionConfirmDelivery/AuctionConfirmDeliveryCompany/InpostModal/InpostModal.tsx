/* tslint:disable */
import React,{useEffect,useRef} from "react";
import { IInpostModalProps } from "./IInpostModalProps";
import { useFormContext } from "react-hook-form";

const InpostModal : React.FC<IInpostModalProps> = ({
    city,
    handleClose
}) => {

    const {setValue, getValues} = useFormContext();
    const mapDiv = useRef(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src="https://geowidget.easypack24.net/js/sdk-for-javascript.js";
        script.async = true;
        document.body.appendChild(script);

        const style = document.createElement('link');
        style.rel="stylesheet";
        style.href="https://geowidget.easypack24.net/css/easypack.css";
        document.body.append(style);

        return () => {
            document.body.removeChild(script);
            document.body.removeChild(style);
            
            // eslint-disable-next-line react-hooks/exhaustive-deps
            if(mapDiv.current) {
                //@ts-ignore
                mapDiv.current.innerHtml='';
            }
        }
    },[])

    //@ts-ignore
    window.easyPackAsyncInit = function () {
        //@ts-ignore
        easyPack.init({
            defaultLocale: 'pl',
            mapType: 'osm',
            searchType: 'osm',
            points: {
                types: ['parcel_locker']
            },
            map: {
                initialTypes: ['parcel_locker']
            }
        });
        //@ts-ignore
        const map = easyPack.mapWidget('map', function(point) {;
          const {name, address} = point;
          setValue('inpost', true);
          setValue('parcelName', name);
          setValue('parcelAddress', address)
          handleClose();
        });
        const selectedParcel = getValues()['parcelName'];

        if(typeof selectedParcel !== 'undefined') {
            map.searchPlace(selectedParcel);
        }
        else if(city !== '') {
            map.searchPlace(city);
        }
    }
    return (
        <div id="map" style={{width:'60vw', height:'50vh'}} ref={mapDiv}>
        </div>
    )
}

export default InpostModal;