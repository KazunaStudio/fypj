create table AuctionFrames(
AuctionId int identity(1,1),
AuctionName varchar(500),
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
drop table dbo.AuctionFrames
Truncate table dbo.AuctionFrames

insert into dbo.AuctionFrames values(
'Auction 1','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet eleifend ipsum.','Half rimmed','Oval','Plastic','Black','11/05/2022 16:37:52','11/10/2022 16:37:52','30','40','Specs_Logo.png')
select * from dbo.AuctionFrames

create procedure AllAuctionInfo as begin select AuctionId, AuctionName,AuctionDes,AuctionType,AuctionShape,AuctionMaterial,AuctionColour, AuctionStartDateTime ,AuctionEndDateTime, AuctionStartAmt, AuctionEndAmt,AuctionImg from dbo.AuctionFrames end

Drop Procedure AllAuctionInfo
 AllAuctionInfo

Create procedure InsertAuctionInfo(
@AuctionName varchar(500),
@AuctionDes varchar(2000),
@AuctionType varchar(500),
@AuctionShape varchar(500),
@AuctionMaterial varchar(500),
@AuctionColour varchar(500),
@AuctionStartDatetime datetime,
@AuctionEndDatetime datetime,
@AuctionStartAmt int,
@AuctionEndAmt int,
@AuctionImg varchar(500)) as begin insert into dbo.AuctionFrames (AuctionName,AuctionDes,AuctionType,AuctionShape,AuctionMaterial,AuctionColour,AuctionStartDateTime,
AuctionEndDateTime,AuctionStartAmt,AuctionEndAmt,AuctionImg) values (@AuctionName,@AuctionDes,@AuctionType,@AuctionShape,@AuctionMaterial,@AuctionColour, @AuctionStartDatetime,
@AuctionEndDateTime,@AuctionStartAmt,@AuctionEndAmt,@AuctionImg) end

Drop Procedure InsertAuctionInfo

Create procedure UpdateAuctionInfo(@AuctionId int ,@AuctionName varchar(500),
@AuctionDes varchar(2000),
@AuctionType varchar(500),
@AuctionShape varchar(500),
@AuctionMaterial varchar(500),
@AuctionColour varchar(500),
@AuctionStartDatetime datetime,
@AuctionEndDatetime datetime,
@AuctionStartAmt int,
@AuctionEndAmt int,
@AuctionImg varchar(500)) as begin update dbo.AuctionFrames set AuctionName=@AuctionName,AuctionDes=@AuctionDes,AuctionType=@AuctionType,AuctionShape=@AuctionShape,AuctionMaterial=@AuctionMaterial,AuctionColour=@AuctionColour,AuctionStartDateTime=@AuctionStartDateTime,AuctionEndDateTime=@AuctionEndDateTime,AuctionStartAmt=@AuctionStartAmt,AuctionEndAmt=@AuctionEndAmt,AuctionImg=@AuctionImg  where AuctionId=@AuctionId end

Drop Procedure UpdateAuctionInfo
UpdateAuctionInfo

Create procedure DeleteAuctionInfo(@AuctionId int) as begin delete from dbo.AuctionFrames where AuctionId=@AuctionId end
Drop Procedure DeleteAuctionInfo
 
Create table AuctionMaterial(
MaterialId int identity(1,1),
MaterialName varchar(500),
)
insert into dbo.AuctionMaterial values('Acetate')
insert into dbo.AuctionMaterial values('Metal')
insert into dbo.AuctionMaterial values('Plastic')
insert into dbo.AuctionMaterial values('Stainless Steel')
insert into dbo.AuctionMaterial values('Titanium')
insert into dbo.AuctionMaterial values('Others')
select * from dbo.AuctionMaterial

create procedure AllAuctionMaterial as begin select MaterialId, MaterialName from dbo.AuctionMaterial end

Drop Procedure AllAuctionMaterial
AllAuctionMaterial

Create procedure InsertAuctionMaterial(
@MaterialName varchar(500)) as begin insert into dbo.AuctionMaterial (MaterialName) values (@MaterialName) end

Drop Procedure InsertAuctionMaterial
InsertAuctionMaterial

Create procedure UpdateAuctionMaterial(@MaterialId int,@MaterialName varchar(500)) as begin update dbo.AuctionMaterial set MaterialName=@MaterialName where MaterialId=@MaterialId end
Drop Procedure UpdateAuctionMaterial
UpdateAuctionMaterial

Create procedure DeleteAuctionMaterial(@MaterialId int) as begin delete from dbo.AuctionMaterial where MaterialId=@MaterialId end
Drop Procedure DeleteAuctionMaterial

create table AuctionFrameType(
TypeId int identity(1,1),
TypeName varchar(500),
)
insert into dbo.AuctionFrameType values('Full rimmed')
insert into dbo.AuctionFrameType values('Half rimmed')
insert into dbo.AuctionFrameType values('Rimless')
insert into dbo.AuctionFrameType values('Others')
select * from dbo.AuctionFrameType

create procedure AllAuctionFrameType as begin select TypeId, TypeName from dbo.AuctionFrameType end

Drop Procedure AllAuctionFrameType
AllAuctionFrameType

Create procedure InsertAuctionFrameType(
@TypeName varchar(500)) as begin insert into dbo.AuctionFrameType (TypeId) values (@TypeName) end

Drop Procedure InsertAuctionFrameType
InsertAuctionFrameType

Create procedure UpdateAuctionFrameType(@TypeId int,@TypeName varchar(500)) as begin update dbo.AuctionFrameType set TypeName=@TypeName where TypeId=@TypeId end
Drop Procedure UpdateAuctionFrameType
UpdateAuctionFrameType

Create procedure DeleteAuctionFrameType (@TypeId int) as begin delete from dbo.AuctionFrameType where TypeId=@TypeId end
Drop Procedure DeleteAuctionFrameType

create table AuctionFrameColour(
ColourId int identity(1,1),
ColourName varchar(500)
)
insert into dbo.AuctionFrameColour values('Black')
insert into dbo.AuctionFrameColour values('White')
insert into dbo.AuctionFrameColour values('Blue')
insert into dbo.AuctionFrameColour values('Brown')
insert into dbo.AuctionFrameColour values('Gold')
insert into dbo.AuctionFrameColour values('Others')
select * from dbo.AuctionFrameColour

create procedure AllAuctionFrameColour as begin select ColourId, ColourName from dbo.AuctionFrameColour end

Drop Procedure AllAuctionFrameColour
AllAuctionFrameColour

Create procedure InsertAuctionFrameColour(
@ColourName varchar(500)) as begin insert into dbo.AuctionFrameColour (ColourName) values (@ColourName) end

Drop Procedure InsertAuctionFrameColour
InsertAuctionFrameColour

Create procedure UpdateAuctionFrameColour(@ColourId int,@ColourName varchar(500)) as begin update dbo.AuctionFrameColour set ColourName=@ColourName where ColourId=@ColourId end
Drop Procedure UpdateAuctionFrameColour
UpdateAuctionFrameColour

Create procedure DeleteAuctionFrameColour (@ColourId int) as begin delete from dbo.AuctionFrameColour where ColourId=@ColourId end
Drop Procedure DeleteAuctionFrameColour

create table AuctionFrameShape(
ShapeId int identity(1,1),
ShapeName varchar(500)
)
insert into dbo.AuctionFrameShape values('Aviator')
insert into dbo.AuctionFrameShape values('Oval')
insert into dbo.AuctionFrameShape values('Rectangle')
insert into dbo.AuctionFrameShape values('Round')
insert into dbo.AuctionFrameShape values('Square')
insert into dbo.AuctionFrameShape values('Others')
select * from dbo.AuctionFrameShape

create procedure AllAuctionFrameShape as begin select ShapeId, ShapeName from dbo.AuctionFrameShape end

Drop Procedure AllAuctionFrameShape
AllAuctionFrameShape

Create procedure InsertAuctionFrameShape(
@ShapeName varchar(500)) as begin insert into dbo.AuctionFrameShape (ShapeName) values (@ShapeName) end

Drop Procedure InsertAuctionFrameShape
InsertAuctionFrameShape

Create procedure UpdateAuctionFrameShape(@ShapeId int,@ShapeName varchar(500)) as begin update dbo.AuctionFrameShape set ShapeName=@ShapeName where ShapeId=@ShapeId end
Drop Procedure UpdateAuctionFrameShape
UpdateAuctionFrameShape

Create procedure DeleteAuctionFrameShape (@ShapeId int) as begin delete from dbo.AuctionFrameShape where ShapeId=@ShapeId end
Drop Procedure DeleteAuctionFrameShape