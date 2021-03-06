import React from "react";
import { useFormContext } from "react-hook-form";
import { AddressType, BankAccountType } from "../../../Types/User/";
import { UserApi } from "../../../Services/User/User.service";
import AuctionConfirmationUserAddress from './AuctionConfirmationUserAddress/AuctionConfirmationUserAddress'
import AuctionConfirmationDelivery from './AuctionConfirmationDelivery/AuctionConfirmationDelivery'
import AuctionConfirmationPayment from './AuctionConfirmationPayment/AuctionConfirmationPayment'
import {Grid} from '@material-ui/core';


const AuctionDeliveryConfirmation : React.FC = () => {

    const [address , setAddress] = React.useState<AddressType>();
    const [bankAccount, setBankAccount] = React.useState<BankAccountType>();
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