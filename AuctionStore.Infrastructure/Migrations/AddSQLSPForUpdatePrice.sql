CREATE OR ALTER PROCEDURE [AddOffer]
	@AuctionId uniqueidentifier,
	@UserId uniqueidentifier,
	@NewPrice decimal(18,2),
	@TimeStamp bigint
	AS
	BEGIN
		SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
		BEGIN TRANSACTION
			INSERT INTO [dbo].[AuctionOffer] VALUES(NEWID(), @NewPrice,@TimeStamp,@UserId,@AuctionId)

			if(@@ERROR<>0) 
				BEGIN
					ROLLBACK TRANSACTION;
				END;
			
			COMMIT TRANSACTION;
	END;