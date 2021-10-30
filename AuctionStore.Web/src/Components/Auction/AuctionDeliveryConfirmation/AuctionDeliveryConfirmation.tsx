import React from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IAddress, IBankAccount } from "../../../Interfaces/user";
import { UserApi } from "../../../Services/User/UserApi";
import AuctionConfirmationUserAddress from './AuctionConfirmationUserAddress/AuctionConfirmationUserAddress'
import AuctionConfirmationDelivery from './AuctionConfirmationDelivery/AuctionConfirmationDelivery'
import AuctionConfirmationPayment from './AuctionConfirmationPayment/AuctionConfirmationPayment'
import {Grid} from '@material-ui/core';


const AuctionDeliveryConfirmation : React.FC = () => {

    const [address , setAddress] = React.useState<IAddress>();
    const [bankAccount, setBankAccount] = React.useState<IBankAccount>();
    const {getValues} = useFormContext();

    React.useEffect(() => {

        Promise.all([UserApi.getAddress(getValues()['selectedAddressId']), UserApi.getBankAccountForAuction(getValues()['auctionId'])])
       .then(response => {
            setAddress(response[0]);
            setBankAccount(response[1])
        })
    },[getValues])

    console.log(getValues());
    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={4}>
                    <AuctionConfirmationUserAddress data ={address}/>
                </Grid>
                <Grid item xs={4}>
                    <AuctionConfirmationDelivery/>
                </Grid>
                <Grid item xs={4}>
                    <AuctionConfirmationPayment data={bankAccount}/>
                </Grid>
            </Grid>
        </>
    )
}

export default AuctionDeliveryConfirmation;