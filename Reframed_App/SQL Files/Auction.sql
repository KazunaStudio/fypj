/*Create a table for Auction Listing*/
create table AuctionProducts(
AuctionId int identity(1,1),
AuctionName varchar(500),
UserName varchar(500),
AuctionDes varchar(2000),
AuctionType varchar(500),
AuctionShape varchar(500),
AuctionMaterial varchar(500),
AuctionColour varchar(500),
AuctionStartDatetime datetime,
AuctionEndDatetime datetime,
AuctionStartAmt int,
AuctionEndAmt int,
AuctionImg varchar(500) 
)

/*Create procedure to select all information of Auction Listing*/
create procedure AllAuctionInfo as begin select AuctionId,AuctionName,UserName,AuctionDes,AuctionType,AuctionShape,AuctionMaterial,AuctionColour,AuctionStartDatetime,AuctionEndDatetime,AuctionStartAmt,AuctionEndAmt,AuctionImg from dbo.AuctionProducts end

/*Create procedure to Add a row in the table*/
Create procedure InsertAuctionInfo(
@AuctionName varchar(500),
@UserName varchar(500),
@AuctionDes varchar(2000),
@AuctionType varchar(500),
@AuctionShape varchar(500),
@AuctionMaterial varchar(500),
@AuctionColour varchar(500),
@AuctionEndDatetime datetime,
@AuctionStartAmt int,
@AuctionEndAmt int,
@AuctionImg varchar(500)) as begin insert into dbo.AuctionProducts (AuctionName,UserName,AuctionDes,AuctionType,AuctionShape,AuctionMaterial,AuctionColour,AuctionStartDateTime,
AuctionEndDateTime,AuctionStartAmt,AuctionEndAmt,AuctionImg) values (@AuctionName,@UserName,@AuctionDes,@AuctionType,@AuctionShape,@AuctionMaterial,@AuctionColour, sysdatetime(),
@AuctionEndDateTime,@AuctionStartAmt,@AuctionEndAmt,@AuctionImg) end

/*Create procedure to update a row in the table*/
Create procedure UpdateAuctionInfo(@AuctionId int ,@AuctionName varchar(500),@UserName varchar(500),
@AuctionDes varchar(2000),
@AuctionType varchar(500),
@AuctionShape varchar(500),
@AuctionMaterial varchar(500),
@AuctionColour varchar(500),
@AuctionEndDatetime datetime,
@AuctionStartAmt int,
@AuctionEndAmt int,
@AuctionImg varchar(500)) as begin update dbo.AuctionProducts set AuctionName=@AuctionName,UserName=@UserName,AuctionDes=@AuctionDes,AuctionType=@AuctionType,AuctionShape=@AuctionShape,AuctionMaterial=@AuctionMaterial,AuctionColour=@AuctionColour,AuctionEndDatetime=@AuctionEndDatetime,AuctionStartAmt=@AuctionStartAmt,AuctionEndAmt=@AuctionEndAmt,AuctionImg=@AuctionImg  where AuctionId=@AuctionId end

/*Create procedure to delete a row in the table*/
Create procedure DeleteAuctionInfo(@AuctionId int) as begin delete from dbo.AuctionProducts where AuctionId=@AuctionId end
 