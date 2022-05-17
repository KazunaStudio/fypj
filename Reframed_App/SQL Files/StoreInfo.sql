/*Create a Table for Store Locations & it's informations*/
create table dbo.StoreInfo(
StoreId int identity(1,1),
StoreName varchar(500),
StoreStreet varchar(500),
StorePostalCode int,
StoreOpHrs varchar(500),
StorePh int,
Storelogo varchar(500),
lat Decimal(8,6),
lng Decimal(9,6),
)

/*Creating Procedure to select all information in the table*/
create procedure AllStoreInfo as begin select * from dbo.StoreInfo end

/*Creating Procedure to add row to the table*/
Create procedure AddStoreInfo (@StoreName varchar(500), @StoreStreet varchar(500),
@StorePostalCode int,@StoreOpHrs varchar(500),
@StorePh int,@Storelogo varchar(500),@lat Decimal(8,6),
@lng Decimal(9,6))
as begin insert into dbo.StoreInfo (StoreName,StoreStreet,StorePostalCode,StoreOpHrs,StorePh,Storelogo,lat,lng) values (@StoreName,@StoreStreet,
@StorePostalCode,@StoreOpHrs,@StorePh,@Storelogo,@lat,@lng) end

/*Creating Procedure to update a row in the table*/
Create procedure updateStoreInfo (@StoreId int,@StoreName varchar(500),@StoreStreet varchar(500),
@StorePostalCode int,
@StorePh int,
@Storelogo varchar(500),@StoreOpHrs varchar(500),@lat Decimal(8,6),
@lng Decimal(9,6))
as begin update dbo.StoreInfo set StoreName=@StoreName,StoreStreet=@StoreStreet,
StorePostalCode=@StorePostalCode,StoreOpHrs=@StoreOpHrs,StorePh=@StorePh,Storelogo=@Storelogo, lat=@lat, lng=@lng where StoreId=@StoreId end

/*Creating Procedure to delete a row in the table*/
Create procedure DeleteStoreInfo(@StoreId int) as begin delete from dbo.StoreInfo where StoreId=@StoreId end
